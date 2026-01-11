import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, CheckCircle, AlertCircle, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [message, setMessage] = useState(''); // Text message to display

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus(null);
        setMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Subscribed Successfully!');
                setEmail('');
            } else {
                setStatus('error');
                // Use the message from backend ("Email already subscribed") or a default
                setMessage(data.message || 'Subscription failed');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-4">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand & Contact */}
                    <div>
                        <h3 className="font-bold text-white text-2xl mb-6 tracking-tight">
                            Tensor <span className="text-blue-500">Technology</span>
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Your premium destination for the latest technology. We provide authentic products with official warranties and exceptional customer support.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start text-gray-400 text-sm group">
                                <MapPin size={18} className="mr-3 text-blue-500 mt-0.5 group-hover:text-white transition-colors" />
                                <span>123 Tech Avenue, Colombo 07,<br />Western Province, Sri Lanka</span>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm group">
                                <Phone size={18} className="mr-3 text-blue-500 group-hover:text-white transition-colors" />
                                <span>+94 77 123 4567</span>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm group">
                                <Mail size={18} className="mr-3 text-blue-500 group-hover:text-white transition-colors" />
                                <span>support@tensortechnology.lk</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Shop Categories</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/shop?category=smartphones" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Smartphones</Link></li>
                            <li><Link to="/shop?category=tablets" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Tablets & iPads</Link></li>
                            <li><Link to="/shop?category=audio" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Audio & Sound</Link></li>
                            <li><Link to="/shop?category=wearables" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Smart Watches</Link></li>
                            <li><Link to="/shop?category=accessories" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Accessories</Link></li>
                            <li><Link to="/discount" className="text-yellow-500 font-bold hover:text-yellow-400 hover:translate-x-1 transition-all inline-block">Hot Deals</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Care */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Customer Care</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/support/center" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
                            <li><Link to="/profile" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">My Account</Link></li>
                            <li><Link to="/support/track-order" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Track Your Order</Link></li>
                            <li><Link to="/support/shipping" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Shipping Policy</Link></li>
                            <li><Link to="/support/returns" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Returns & Warranty</Link></li>
                            <li><Link to="/support/faqs" className="hover:text-blue-400 hover:translate-x-1 transition-all inline-block">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Stay Updated</h4>
                        <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and first access to new product launches.</p>

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={`w-full bg-gray-800 border text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-1 transition-all placeholder-gray-500 text-sm ${status === 'error' ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500'}`}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group">
                                Subscribe <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Inline Status Message */}
                        {status && (
                            <div className={`mt-3 flex items-center text-sm p-3 rounded-lg border ${status === 'success' ? 'bg-green-900/20 border-green-800 text-green-400' : 'bg-red-900/20 border-red-800 text-red-400'}`}>
                                {status === 'success' ? <CheckCircle size={16} className="mr-2 shrink-0" /> : <AlertCircle size={16} className="mr-2 shrink-0" />}
                                <span>{message}</span>
                            </div>
                        )}

                        <div className="mt-8">
                            <h5 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Follow Us</h5>
                            <div className="flex space-x-4">
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"><Facebook size={16} /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all"><Twitter size={16} /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all"><Instagram size={16} /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><Youtube size={16} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Payments */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-500 text-sm text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} Tensor Technology Inc. All rights reserved.</p>
                        <div className="mt-1 space-x-4 text-xs">
                            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-300">Terms of Service</a>
                        </div>
                    </div>

                    {/* Payment Icons */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 uppercase font-bold mr-2">We Accept:</span>
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center opacity-80 hover:opacity-100 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-3" /></div>
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center opacity-80 hover:opacity-100 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" /></div>
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center opacity-80 hover:opacity-100 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" /></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;