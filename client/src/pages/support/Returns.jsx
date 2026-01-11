import React from 'react';

const Returns = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Returns & Warranty Policy</h1>

                    <div className="space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">30-Day Money-Back Guarantee</h2>
                            <p>
                                We want you to be completely satisfied with your purchase. If you are not happy with your product,
                                you may return it within 30 days of delivery for a full refund or exchange.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Warranty Coverage</h2>
                            <p>
                                All products sold by Tensor Technology come with a minimum 1-year manufacturer warranty.
                                This covers defects in materials and workmanship under normal use.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Return Process</h2>
                            <ol className="list-decimal list-inside space-y-2 ml-2">
                                <li>Contact our support team at support@tensortechnology.lk to initiate a return.</li>
                                <li>Pack the item securely in its original packaging.</li>
                                <li>Ship the item to the address provided by our support team.</li>
                                <li>Once received and inspected, we will process your refund within 5-7 business days.</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Exceptions</h2>
                            <p>
                                The following items cannot be returned:
                            </p>
                            <ul className="list-disc list-inside ml-2 mt-2">
                                <li>Opened software or digital downloads.</li>
                                <li>Items with missing accessories or damaged packaging (unless defective).</li>
                                <li>Personalized or custom-ordered items.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
