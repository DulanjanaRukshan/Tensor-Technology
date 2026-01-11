import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, CreditCard, ShieldCheck } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    // Calculations
    const shipping = 0; // Free shipping logic
    const taxRate = 0.08;
    const taxAmount = cartTotal * taxRate;
    const finalTotal = cartTotal + taxAmount + shipping;

    // Empty Cart State
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-full shadow-lg mb-6">
                    <ShoppingBag size={64} className="text-blue-200" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                    Looks like you haven't added any tech goodies yet. Explore our latest collection to find something you love.
                </p>
                <Link to="/shop" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2">
                    Start Shopping <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-blue-600" /> Shopping Cart <span className="text-gray-400 text-lg font-normal">({cartItems.length} items)</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Column: Cart Items */}
                    <div className="flex-grow w-full space-y-4">
                        {cartItems.map((item) => {
                            if (!item.product) return null;
                            const price = Number(item.product.price);
                            const total = price * item.quantity;

                            return (
                                <div key={item.product._id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md">
                                    
                                    {/* Image */}
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                                        <img 
                                            src={item.product.image} 
                                            alt={item.product.title} 
                                            className="w-full h-full object-contain mix-blend-multiply" 
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow text-center sm:text-left w-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Link to={`/product/${item.product._id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
                                                    {item.product.title}
                                                </Link>
                                                <p className="text-sm text-gray-500 capitalize">{item.product.category} • {item.product.brand}</p>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <p className="font-bold text-lg text-gray-900">${total.toFixed(2)}</p>
                                                {item.quantity > 1 && <p className="text-xs text-gray-400">${price} each</p>}
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center justify-between mt-4">
                                            {/* Quantity Stepper */}
                                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                                <button 
                                                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-blue-600 disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-blue-600"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Mobile Price Display */}
                                            <div className="sm:hidden font-bold text-lg text-gray-900">
                                                ${total.toFixed(2)}
                                            </div>

                                            {/* Remove Button */}
                                            <button 
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                                                title="Remove item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-between items-center mt-6">
                            <Link to="/shop" className="text-gray-500 font-medium hover:text-blue-600 flex items-center gap-2">
                                <ArrowRight className="rotate-180" size={16} /> Continue Shopping
                            </Link>
                            <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-semibold hover:underline">
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="w-full lg:w-[400px] lg:sticky lg:top-24 h-fit space-y-6">
                        
                        {/* Summary Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="text-xl font-extrabold text-gray-900 mb-6">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (Estimate)</span>
                                    <span className="font-medium text-gray-900">${taxAmount.toFixed(2)}</span>
                                </div>
                                
                                {/* Promo Code Input */}
                                <div className="pt-2">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Promo Code" 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-900 font-bold text-lg">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-extrabold text-blue-600">${finalTotal.toFixed(2)}</span>
                                        <p className="text-xs text-gray-400">Includes all taxes</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout" className="block w-full bg-blue-600 text-white text-center font-bold text-lg py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 hover:-translate-y-1 transition-all">
                                Checkout Now
                            </Link>

                            {/* Trust Signals */}
                            <div className="mt-6 flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                                    <ShieldCheck size={14} /> Secure Checkout
                                </div>
                                <div className="flex gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;