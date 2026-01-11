const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 }, // 5MB Limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// GET /api/products
// Query: category (optional)
router.get('/products', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// POST /api/products
// Create a new product (Protected, Admin only)
router.post('/products', protect, admin, upload.single('image'), async (req, res) => {
    try {
        // If file is uploaded, use the local path
        // Otherwise, fallback to the text URL provided (if any, though in the new form we'll likely prioritize file)
        let imagePath = req.body.image;

        if (req.file) {
            // Store the path accessible via the static route
            imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const productData = {
            ...req.body,
            image: imagePath
        };

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
});

module.exports = router;
