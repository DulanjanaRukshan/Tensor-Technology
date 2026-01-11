import React from 'react';

const Shipping = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Shipping Information</h1>

                    <div className="space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Delivery Options</h2>
                            <p>We verify orders and ship them within 24 hours. We offer the following delivery methods:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong>Standard Delivery (Island-wide):</strong> 2-4 business days.</li>
                                <li><strong>Express Delivery (Colombo & Suburbs):</strong> Same day or next day delivery.</li>
                                <li><strong>Store Pickup:</strong> Available at our Colombo 07 showroom.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Shipping Rates</h2>
                            <p>
                                Shipping is calculated based on weight and location.
                                <strong> Free shipping</strong> is available for all orders over LKR 50,000.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Order Tracking</h2>
                            <p>
                                Once your order is shipped, you will receive a tracking number via email and SMS.
                                You can track your order status on our "Track Order" page.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
