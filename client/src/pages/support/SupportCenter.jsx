import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, ChevronDown } from 'lucide-react';

const SupportCenter = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Support Center</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Need help with your order or have a question about a product? 
                    We are here to help you 24/7.
                </p>
            </div>

            {/* 1. Contact Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Phone size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">Call Us</h3>
                    <p className="text-gray-500 text-sm mb-6">Available 9am - 6pm EST</p>
                    <a href="tel:+18001234567" className="text-blue-600 font-bold hover:underline text-lg">+1 (800) 123-4567</a>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircle size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">Live Chat</h3>
                    <p className="text-gray-500 text-sm mb-6">Instant answers from our team</p>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition">Start Chat</button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">Email Us</h3>
                    <p className="text-gray-500 text-sm mb-6">Response within 24 hours</p>
                    <a href="mailto:support@techmobile.com" className="text-blue-600 font-bold hover:underline text-lg">support@techmobile.com</a>
                </div>
            </div>

            {/* 2. Map & Location Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16 flex flex-col md:flex-row">
                {/* Text Info */}
                <div className="p-8 md:w-1/3 flex flex-col justify-center bg-gray-50">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our HQ</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <MapPin className="text-blue-600 mt-1 mr-4 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-gray-900">Main Office</h4>
                                <p className="text-gray-600 text-sm mt-1">
                                    123 Tech Avenue, Suite 400<br />
                                    New York, NY 10001
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Clock className="text-blue-600 mt-1 mr-4 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-gray-900">Opening Hours</h4>
                                <p className="text-gray-600 text-sm mt-1">
                                    Mon - Fri: 9:00 AM - 8:00 PM<br />
                                    Sat - Sun: 10:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button className="mt-8 w-full border border-blue-600 text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition">
                        Get Directions
                    </button>
                </div>

                {/* Map Embed */}
                <div className="md:w-2/3 h-80 md:h-auto relative">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622549495465!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                        className="absolute inset-0"
                        title="TechMobile Location"
                    ></iframe>
                </div>
            </div>

            {/* 3. FAQ Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <details className="group bg-white cursor-pointer">
                            <summary className="flex items-center justify-between p-5 font-semibold text-gray-800 list-none">
                                <span>How do I track my order?</span>
                                <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                You can track your order using the "Track Order" link in the top navigation bar. Simply enter your Order ID and email address to see real-time updates.
                            </div>
                        </details>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <details className="group bg-white cursor-pointer">
                            <summary className="flex items-center justify-between p-5 font-semibold text-gray-800 list-none">
                                <span>What is your return policy?</span>
                                <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                We offer a hassle-free 30-day return policy for all unused items in their original packaging. Contact support to initiate a return label.
                            </div>
                        </details>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <details className="group bg-white cursor-pointer">
                            <summary className="flex items-center justify-between p-5 font-semibold text-gray-800 list-none">
                                <span>Do you ship internationally?</span>
                                <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                Yes, we ship to over 50 countries worldwide via DHL and FedEx. Shipping rates and delivery times vary by location.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportCenter;