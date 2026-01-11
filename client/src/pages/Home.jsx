import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/home/HeroSlider';
import PromoGrid from '../components/home/PromoGrid';
import ProductCard from '../components/home/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';
import { Smartphone, Headphones, Watch, Tablet, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, icon: Icon, link }) => (
    <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Icon size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
        <Link to={link} className="flex items-center text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors group">
            View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
    </div>
);

const Home = () => {
    const [smartphones, setSmartphones] = useState([]);
    const [audio, setAudio] = useState([]);
    const [wearables, setWearables] = useState([]);
    const [tablets, setTablets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch independent categories in parallel
                const [phonesRes, audioRes, wearablesRes, tabletsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/products?category=smartphones`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/products?category=audio`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/products?category=wearables`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/products?category=tablets`)
                ]);

                setSmartphones(await phonesRes.json());
                setAudio(await audioRes.json());
                setWearables(await wearablesRes.json());
                setTablets(await tabletsRes.json());
            } catch (error) {
                console.error("Failed to fetch products.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderGridContent = (products, count = 4) => {
        if (loading) {
            return Array(count).fill(0).map((_, i) => <ProductSkeleton key={i} />);
        }
        return products.slice(0, count).map(product => (
            <ProductCard key={product._id} product={product} />
        ));
    };

    return (
        <div className="bg-white pb-20">
            {/* 1. Hero & Promos */}
            <HeroSlider />
            <PromoGrid />

            <div className="container mx-auto px-4 space-y-16 mt-8">

                {/* 2. Latest Smartphones */}
                <section>
                    <SectionHeader title="Latest Smartphones" icon={Smartphone} link="/shop?category=smartphones" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {renderGridContent(smartphones, 4)}
                    </div>
                </section>

                {/* 3. Featured Banner (Pixel Launch) */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1610945431131-c04f1bdd8327?auto=format&fit=crop&q=80&w=2070"
                        alt="Pixel Banner"
                        className="w-full h-48 md:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center px-8 md:px-12">
                        <div className="text-white max-w-lg">
                            <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold uppercase text-xs tracking-widest">
                                <Zap size={14} /> Official Launch
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Google Pixel 9 Pro</h3>
                            <p className="text-gray-300 mb-6 hidden md:block">Experience the power of Gemini AI right in your pocket. Pre-order now and get free Buds.</p>
                            <Link to="/shop?brand=Google" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">
                                Pre-order Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4. Premium Audio */}
                <section>
                    <SectionHeader title="Premium Audio" icon={Headphones} link="/shop?category=audio" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {renderGridContent(audio, 4)}
                    </div>
                </section>

                {/* 5. Wearables */}
                <section>
                    <SectionHeader title="Smart Wearables" icon={Watch} link="/shop?category=wearables" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {renderGridContent(wearables, 4)}
                    </div>
                </section>

                {/* 6. Tablets */}
                <section>
                    <SectionHeader title="Tablets & iPads" icon={Tablet} link="/shop?category=tablets" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {renderGridContent(tablets, 4)}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;