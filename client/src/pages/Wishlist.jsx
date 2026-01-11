import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart, ArrowRight, AlertCircle } from 'lucide-react';

const Wishlist = () => {
    // Access wishlist data. 
    // Note: older context versions used 'wishlistItems', new one uses 'wishlist'. 
    // We destruct both to ensure compatibility.
    const { wishlist, wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    // Compatibility check
    const items = wishlist || wishlistItems || [];

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product._id);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-6 rounded-full shadow-md mb-6 animate-in zoom-in duration-300">
                    <Heart size={48} className="text-gray-300 fill-gray-100" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Wishlist is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                    Keep track of products you love. Tap the heart icon on any product to save it here.
                </p>
                <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                            <Heart className="text-red-500 fill-red-500" /> My Wishlist
                        </h1>
                        <p className="text-gray-500 mt-2">{items.length} items saved for later</p>
                    </div>
                    <Link to="/shop" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                        Continue Shopping <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map(product => (
                        <div key={product._id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative">
                            
                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromWishlist(product._id)}
                                className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>

                            {/* Image Area */}
                            <Link to={`/product/${product._id}`} className="block relative h-64 bg-gray-50 overflow-hidden group-hover:bg-gray-100 transition-colors">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                                />
                                {!product.inStock && (
                                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                                        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                            </Link>

                            {/* Content Area */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
                                    <Link to={`/product/${product._id}`} className="block text-lg font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                                        {product.title}
                                    </Link>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl font-extrabold text-blue-600">${product.price}</span>
                                        {product.inStock ? (
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                                        ) : (
                                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">Sold Out</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleMoveToCart(product)}
                                        disabled={!product.inStock}
                                        className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-200"
                                    >
                                        <ShoppingBag size={18} /> Move to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;