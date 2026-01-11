import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Truck, ShieldCheck, Heart, Share2, Check, Smartphone, Camera, Battery, Cpu, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductSpecs from '../components/product/ProductSpecs';
import ProductCard from '../components/home/ProductCard';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                const products = res.data;
                const found = products.find(p => p._id === id);

                if (found) {
                    setProduct(found);
                    // Find related products
                    const related = products
                        .filter(p => p.category === found.category && p._id !== found._id)
                        .slice(0, 4);
                    setRelatedProducts(related);
                } else {
                    setProduct(null);
                }
            } catch (err) {
                console.error("Error fetching details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            window.scrollTo(0, 0);
            fetchProductData();
        }
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleToggleWishlist = () => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Back to Shop
            </Link>
        </div>
    );

    const isWishlisted = isInWishlist(product._id);
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white pb-20">

            {/* Breadcrumbs */}
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="container mx-auto px-4 py-4">
                    <Breadcrumbs
                        paths={[
                            { name: 'Home', link: '/' },
                            { name: 'Shop', link: '/shop' },
                            { name: product.category, link: `/shop?category=${product.category}` },
                            { name: product.title, link: '#' }
                        ]}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT: Image Gallery (Sticky) */}
                    <div className="lg:col-span-6">
                        <div className="sticky top-24">
                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center relative group overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Image Badges */}
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    {discount > 0 && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            -{discount}% OFF
                                        </span>
                                    )}
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        NEW ARRIVAL
                                    </span>
                                </div>

                                {/* Action Icons */}
                                <div className="absolute top-6 right-6 flex flex-col gap-3">
                                    <button
                                        onClick={handleToggleWishlist}
                                        className={`p-3 rounded-full shadow-lg transition-all ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                                    >
                                        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                    </button>
                                    <button className="p-3 rounded-full bg-white text-gray-400 shadow-lg hover:text-blue-600 transition-all">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="lg:col-span-6">

                        {/* Title & Ratings */}
                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">{product.brand}</h2>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{product.title}</h1>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center text-yellow-400">
                                    <Star fill="currentColor" size={18} />
                                    <Star fill="currentColor" size={18} />
                                    <Star fill="currentColor" size={18} />
                                    <Star fill="currentColor" size={18} />
                                    <Star fill="currentColor" size={18} className="text-gray-300" />
                                    <span className="ml-2 text-gray-900 font-bold text-sm">4.8</span>
                                </div>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-sm text-gray-500 font-medium hover:text-blue-600 cursor-pointer">128 Reviews</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-sm text-green-600 font-bold flex items-center">
                                    <Check size={14} className="mr-1" /> In Stock
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-extrabold text-gray-900">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Includes all taxes & duties</p>
                            </div>
                            <div className="hidden sm:block">
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                                    Free Shipping
                                </span>
                            </div>
                        </div>

                        {/* Key Features Grid */}
                        <div className="grid grid-cols-4 gap-3 mb-8">
                            {[
                                { icon: Smartphone, label: "Display", val: "6.8\"" },
                                { icon: Camera, label: "Camera", val: "200MP" },
                                { icon: Cpu, label: "Chip", val: "Gen 3" },
                                { icon: Battery, label: "Battery", val: "5000mAh" },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 text-center hover:border-blue-200 transition-colors">
                                    <item.icon size={20} className="mx-auto text-blue-600 mb-2" />
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">{item.label}</p>
                                    <p className="text-xs font-bold text-gray-900">{item.val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description Text */}
                        <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                            {product.description || "Experience the next level of innovation with this device. Featuring a stunning display, powerful processor, and all-day battery life, it's designed to keep up with your lifestyle."}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${addedToCart
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-900 text-white hover:bg-blue-600 shadow-blue-900/20'
                                    }`}
                            >
                                {addedToCart ? <Check /> : <ShoppingBag />}
                                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                            <Link
                                to="/checkout"
                                className="flex-1 bg-white border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                            >
                                <CreditCard /> Buy Now
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 border-t border-gray-100 pt-6">
                            <div className="flex items-center gap-3">
                                <Truck className="text-blue-600" size={20} />
                                <span>Free Delivery over $50</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-blue-600" size={20} />
                                <span>1 Year Official Warranty</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Specs & Details Section */}
                <div className="mt-16">
                    <ProductSpecs product={product} />
                </div>

                {/* Related Products */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Related Products</h3>
                        <Link to={`/shop?category=${product.category}`} className="text-blue-600 font-bold text-sm hover:underline flex items-center">
                            View All <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                    {relatedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">No related products found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;