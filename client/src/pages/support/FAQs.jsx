import React from 'react';

const FAQs = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h1>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">How do I track my order?</h3>
                            <p className="text-gray-600">
                                You can track your order by visiting the "Track Order" page and entering your order ID sent to your email.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer installment plans?</h3>
                            <p className="text-gray-600">
                                Yes, we offer 0% interest installment plans for credit card holders of major banks including Commercial Bank, HNB, and Sampath Bank.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Are your products authentic?</h3>
                            <p className="text-gray-600">
                                Absolutely. We are authorized resellers for Apple, Samsung, and other major brands. All products are 100% original and come with official warranties.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Can I modify my order after placing it?</h3>
                            <p className="text-gray-600">
                                If your order hasn't been shipped yet, you can contact us at +94 77 123 4567 to make changes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
