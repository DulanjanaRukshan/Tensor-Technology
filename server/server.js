require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('server/uploads'));



// Database Connection
const startServer = async () => {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error("MongoDB URI is missing!");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected');

        // Seed initial admin user if none exists
        const User = require('./models/User');
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            console.log("No users found. Creating default admin...");
            // Create admin user
            try {
                await User.create({
                    name: "Admin User",
                    email: "admin@techmobile.com",
                    password: "password123",
                    isAdmin: true
                });
                console.log("Default Admin Created: admin@techmobile.com / password123");
            } catch (err) {
                console.error("Failed to create default admin:", err.message);
            }
        }

    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

startServer();

// Routes
// Routes
app.use('/api', productRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

// Subscriber Route
const Subscriber = require('./models/Subscriber');
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const existing = await Subscriber.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already subscribed" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: "Successfully subscribed to newsletter!" });
    } catch (error) {
        console.error("Subscription Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
