import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check, CreditCard, Truck, ShieldCheck, MapPin, User, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API Processing
        setTimeout(() => {
            setStep(3);
            clearCart();
            setLoading(false);
        }, 2000);
    };

    const totalAmount = (cartTotal * 1.08).toFixed(2);

    // 🟢 STEP 3: SUCCESS VIEW
    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-8">
                        Thank you, <strong>{formData.name}</strong>. We have received your order and sent a confirmation email to <strong>{formData.email}</strong>.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8 text-left">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500 text-sm">Order Number</span>
                            <span className="font-mono font-bold text-gray-900">#TM-{Math.floor(Math.random() * 100000)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Est. Delivery</span>
                            <span className="font-bold text-gray-900">{new Date(Date.now() + 259200000).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <Link to="/" className="block w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition shadow-lg">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // 🔵 MAIN CHECKOUT VIEW
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Secure Checkout</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT COLUMN: STEPS */}
                    <div className="flex-grow">
                        
                        {/* Progress Bar */}
                        <div className="flex items-center mb-8 px-4">
                            <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200'}`}>1</div>
                                <span className="text-xs font-bold uppercase tracking-wider">Shipping</span>
                            </div>
                            <div className={`flex-grow h-1 mx-4 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200'}`}>2</div>
                                <span className="text-xs font-bold uppercase tracking-wider">Payment</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            
                            {/* STEP 1: SHIPPING FORM */}
                            {step === 1 && (
                                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Truck size={24} className="text-blue-600" /> Shipping Information
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="John Doe" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="john@example.com" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input required name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="123 Tech St, Apt 4B" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                            <input required name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 transition" placeholder="New York" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Zip Code</label>
                                            <input required name="zip" value={formData.zip} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 transition" placeholder="10001" />
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group">
                                        Continue to Payment <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            )}

                            {/* STEP 2: PAYMENT FORM */}
                            {step === 2 && (
                                <form onSubmit={handlePlaceOrder} className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <CreditCard size={24} className="text-blue-600" /> Payment Details
                                    </h2>

                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex items-start gap-3">
                                        <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <h4 className="font-bold text-blue-900 text-sm">Secure SSL Encryption</h4>
                                            <p className="text-blue-700 text-xs">Your transaction is secured with 256-bit encryption.</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input required placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 transition font-mono" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                                            <input required placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 transition font-mono text-center" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">CVC / CVV</label>
                                            <input required placeholder="123" maxLength="4" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 transition font-mono text-center" />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full bg-green-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Processing...' : `Pay $${totalAmount}`}
                                    </button>
                                    
                                    <button onClick={() => setStep(1)} type="button" className="w-full text-gray-500 mt-6 text-sm font-medium hover:text-gray-800 transition">
                                        Back to Shipping Info
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Order Summary</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (8%)</span>
                                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mb-6">
                                <span className="text-gray-900 font-bold text-lg">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-extrabold text-gray-900">${totalAmount}</span>
                                    <p className="text-xs text-gray-400">USD</p>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center gap-2 bg-gray-50 py-2 rounded-lg border border-gray-100">
                                <ShieldCheck size={14} className="text-green-600" />
                                <span className="text-xs font-bold text-gray-600">100% Secure Checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;