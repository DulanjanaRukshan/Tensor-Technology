import React, { useState } from 'react';
import { ShoppingCart, Check, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [added, setAdded] = useState(false);

    // 🔴 SAFETY CHECK: Prevents "Cannot read properties of undefined" error
    if (!product) return null;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault(); // Prevent navigating to product details
        e.stopPropagation();

        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    const isWishlisted = isInWishlist(product._id);

    // calculate discount for display (Visual only)
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col relative">

            {/* 1. BADGES (Design Upgrade) */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                {/* Auto-calculate discount badge */}
                {discount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                        -{discount}%
                    </span>
                )}
                {/* Custom badges from data */}
                {product.badges && product.badges.map((badge, index) => (
                    <span key={index} className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">
                        {badge}
                    </span>
                ))}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={handleWishlistToggle}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 group-hover:opacity-100"
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
                <Heart
                    size={18}
                    className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
                />
            </button>

            {/* 2. IMAGE AREA (Design Upgrade) */}
            <Link to={`/product/${product._id}`} className="relative bg-gray-50 h-56 p-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors cursor-pointer">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            {/* 3. CONTENT AREA */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Brand & Title */}
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">
                    {product.brand || "TechMobile"}
                </div>
                <Link to={`/product/${product._id}`} className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-2" title={product.title}>
                    {product.title}
                </Link>

                {/* Fake Rating (Visual enhancement) */}
                <div className="flex items-center gap-1 mb-3">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-500 font-medium">4.8 (120 reviews)</span>
                </div>

                {/* Price & Action */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through decoration-red-400">${product.originalPrice}</span>
                            )}
                        </div>
                        <div className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> In Stock
                        </div>
                    </div>

                    {/* Button with Loading State Logic */}
                    <button
                        onClick={handleAddToCart}
                        disabled={added}
                        className={`
                            h-10 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-sm
                            ${added
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                            }
                        `}
                    >
                        {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                        <span className="hidden sm:inline">{added ? 'Added' : 'Add'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;