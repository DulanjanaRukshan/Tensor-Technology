import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Headphones, Smartphone } from 'lucide-react';

const PromoGrid = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Anker/Power (Dark Blue Gradient) */}
                <Link to="/shop?brand=Anker" className="relative h-64 rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Background Image */}
                    <img 
                        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80" 
                        alt="Anker Chargers"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start text-white">
                        <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 flex items-center gap-1">
                            <Zap size={12} fill="black" /> FLASH SALE
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Anker Power</h3>
                        <p className="text-blue-100 mb-6 max-w-[150px]">Up to 30% off world's #1 charging brand.</p>
                        <span className="flex items-center gap-2 font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white group-hover:text-blue-900 transition-colors">
                            Shop Deals <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>

                {/* Card 2: Audio (Purple/Black Gradient) */}
                <Link to="/shop?category=audio" className="relative h-64 rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img 
                        src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Anker-Zolo-Power-Bank-25K-165W-Dual-Built-in-USB-C-Cables-header.png?auto=format&fit=crop&w=600&q=80" 
                        alt="Premium Audio"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-gray-900/60 to-transparent" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start text-white">
                        <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 flex items-center gap-1">
                            <Headphones size={12} /> NEW ARRIVALS
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Immersive Audio</h3>
                        <p className="text-gray-200 mb-6 max-w-[180px]">Experience sound like never before with Sony & Bose.</p>
                        <span className="flex items-center gap-2 font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white group-hover:text-purple-900 transition-colors">
                            Listen Now <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>

                {/* Card 3: Gadgets (Cyan/Teal Gradient) */}
                <Link to="/shop?sort=new" className="relative h-64 rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img 
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" 
                        alt="Smart Gadgets"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/60 to-transparent" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start text-white">
                        <div className="bg-teal-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 flex items-center gap-1">
                            <Smartphone size={12} /> TRENDING
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Smart Living</h3>
                        <p className="text-teal-50 mb-6 max-w-[160px]">Upgrade your lifestyle with the latest tech.</p>
                        <span className="flex items-center gap-2 font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white group-hover:text-teal-900 transition-colors">
                            Discover <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default PromoGrid;