import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/home/ProductCard';
import { Tag, Zap, Clock, Filter, ArrowDownWideNarrow } from 'lucide-react';

const Discount = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('discount'); // default sort

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);

                // Filter for discounted items
                const discounted = res.data.filter(p =>
                    (p.originalPrice && p.originalPrice > p.price) ||
                    (p.badges && p.badges.some(b => b === 'Sale' || b.includes('%')))
                );

                // Add a temporary 'discountPercent' property for sorting
                const mappedProducts = discounted.map(p => {
                    const discount = p.originalPrice
                        ? ((p.originalPrice - p.price) / p.originalPrice) * 100
                        : 0;
                    return { ...p, discountPercent: discount };
                });

                setProducts(mappedProducts);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Sorting Logic
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return 0;
    });

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* 1. Flash Sale Hero Banner */}
            <div className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-12 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-orange-200 font-bold uppercase tracking-widest text-sm">
                                <Zap size={18} className="fill-orange-200" /> Limited Time Offers
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Super Flash Sale</h1>
                            <p className="text-rose-100 text-lg max-w-xl">
                                Grab the hottest tech at unbeatable prices. Discounts up to 50% off on selected smartphones, audio, and accessories.
                            </p>
                        </div>

                        {/* Countdown Timer (Visual Only) */}
                        <div className="flex gap-4">
                            <div className="text-center">
                                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/30">
                                    <span className="block text-2xl font-bold">05</span>
                                    <span className="text-xs uppercase opacity-80">Hrs</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/30">
                                    <span className="block text-2xl font-bold">42</span>
                                    <span className="text-xs uppercase opacity-80">Mins</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/30">
                                    <span className="block text-2xl font-bold">18</span>
                                    <span className="text-xs uppercase opacity-80">Secs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12">

                {/* 2. Toolbar & Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-20 z-30">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                        <Tag className="text-rose-500" size={20} />
                        <span>{sortedProducts.length} Deals Found</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-500 hidden sm:block">Sort by:</label>
                        <div className="relative">
                            <ArrowDownWideNarrow size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <option value="discount">Biggest Discount</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. Products Grid */}
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {sortedProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white p-8 rounded-full shadow-sm inline-block mb-4">
                            <Clock size={48} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No active deals right now</h3>
                        <p className="text-gray-500 mt-2">Check back later for new flash sales!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discount;