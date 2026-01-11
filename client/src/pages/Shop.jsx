import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
// 👇 FIXED: Added ArrowRight to imports
import { Filter, ChevronDown, Check, X, SlidersHorizontal, ArrowRight } from 'lucide-react';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    // URL Params
    const categoryParam = queryParams.get('category');
    const searchParam = queryParams.get('search');
    const brandParam = queryParams.get('brand');

    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
    const [selectedBrands, setSelectedBrands] = useState(brandParam ? [brandParam] : []);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2500 });
    const [sortBy, setSortBy] = useState('relevance');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Toggle States for Sidebar Sections
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        brands: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Initial Data Fetch
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                console.error("Error fetching shop products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Sync URL -> State
    useEffect(() => {
        if (categoryParam) setSelectedCategory(categoryParam);
        else if (!searchParam) setSelectedCategory('all');

        if (brandParam) setSelectedBrands([brandParam]);
    }, [categoryParam, brandParam, searchParam]);

    // Filtering Logic
    useEffect(() => {
        let result = [...allProducts];

        // 1. Search Query
        if (searchParam) {
            const lowerSearch = searchParam.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(lowerSearch) ||
                p.category.toLowerCase().includes(lowerSearch) ||
                p.brand?.toLowerCase().includes(lowerSearch)
            );
        }

        // 2. Category
        if (selectedCategory && selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 3. Brands
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        // 4. Price Range
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // 5. Sorting
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            result.reverse();
        }

        setDisplayedProducts(result);
    }, [allProducts, searchParam, selectedCategory, selectedBrands, priceRange, sortBy]);

    // Handlers
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'all') navigate('/shop');
        else navigate(`/shop?category=${cat}`);
        setShowMobileFilters(false);
    };

    const handleBrandToggle = (brand) => {
        const newBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(newBrands);
    };

    const clearAllFilters = () => {
        setSelectedCategory('all');
        setSelectedBrands([]);
        setPriceRange({ min: 0, max: 2500 });
        navigate('/shop');
    };

    const uniqueBrands = useMemo(() => {
        const source = selectedCategory === 'all' ? allProducts : allProducts.filter(p => p.category === selectedCategory);
        return [...new Set(source.map(p => p.brand).filter(Boolean))].sort();
    }, [allProducts, selectedCategory]);

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Header / Breadcrumb Area */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 capitalize">
                            {searchParam ? `Results for "${searchParam}"` : (selectedCategory === 'all' ? 'All Products' : selectedCategory)}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{displayedProducts.length} items found</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mobile Filter Trigger */}
                        <button
                            className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <SlidersHorizontal size={16} /> Filters
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* SIDEBAR FILTERS (Desktop) */}
                <aside className={`fixed inset-0 z-40 bg-white lg:static lg:bg-transparent lg:block transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}`}>

                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100">
                        <span className="font-bold text-lg">Filters</span>
                        <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-4 lg:p-0 space-y-6 h-full overflow-y-auto lg:h-auto custom-scrollbar">

                        {/* Categories */}
                        <div className="bg-white lg:p-6 lg:rounded-xl lg:shadow-sm lg:border border-gray-100">
                            <button
                                onClick={() => toggleSection('category')}
                                className="flex items-center justify-between w-full font-bold text-gray-900 mb-4"
                            >
                                <span className="uppercase text-xs tracking-wider">Categories</span>
                                <ChevronDown size={16} className={`transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedSections.category && (
                                <div className="space-y-2">
                                    {['all', 'smartphones', 'audio', 'wearables', 'tablets', 'accessories'].map(cat => (
                                        <label key={cat} className="flex items-center cursor-pointer group py-1">
                                            <input
                                                type="radio"
                                                name="category"
                                                className="hidden"
                                                checked={selectedCategory === cat}
                                                onChange={() => handleCategoryChange(cat)}
                                            />
                                            <span className={`text-sm capitalize transition-colors ${selectedCategory === cat ? 'text-blue-600 font-bold' : 'text-gray-600 group-hover:text-blue-600'}`}>
                                                {cat}
                                            </span>
                                            {selectedCategory === cat && <Check size={14} className="ml-auto text-blue-600" />}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Range */}
                        <div className="bg-white lg:p-6 lg:rounded-xl lg:shadow-sm lg:border border-gray-100">
                            <button
                                onClick={() => toggleSection('price')}
                                className="flex items-center justify-between w-full font-bold text-gray-900 mb-4"
                            >
                                <span className="uppercase text-xs tracking-wider">Price Range</span>
                                <ChevronDown size={16} className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedSections.price && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative w-full">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                            <input
                                                type="number"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-2 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <span className="text-gray-400">-</span>
                                        <div className="relative w-full">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                            <input
                                                type="number"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-2 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000"
                                        step="50"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Brands */}
                        <div className="bg-white lg:p-6 lg:rounded-xl lg:shadow-sm lg:border border-gray-100">
                            <button
                                onClick={() => toggleSection('brands')}
                                className="flex items-center justify-between w-full font-bold text-gray-900 mb-4"
                            >
                                <span className="uppercase text-xs tracking-wider">Brands</span>
                                <ChevronDown size={16} className={`transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedSections.brands && (
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                    {uniqueBrands.map(brand => (
                                        <label key={brand} className="flex items-center cursor-pointer group py-1">
                                            <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                                                {selectedBrands.includes(brand) && <Check size={10} className="text-white" />}
                                            </div>
                                            <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-blue-600'}`}>
                                                {brand}
                                            </span>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandToggle(brand)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={clearAllFilters}
                            className="w-full py-3 text-sm text-red-600 font-medium border border-red-200 rounded-lg hover:bg-red-50 transition-colors lg:hidden"
                        >
                            Reset All Filters
                        </button>
                    </div>

                    {/* Mobile Footer */}
                    <div className="lg:hidden absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
                        >
                            Show {displayedProducts.length} Results
                        </button>
                    </div>
                </aside>

                {/* Mobile Backdrop */}
                {showMobileFilters && (
                    <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setShowMobileFilters(false)} />
                )}

                {/* MAIN CONTENT AREA */}
                <main className="lg:col-span-3">

                    {/* Active Filters (Chips) */}
                    {(selectedCategory !== 'all' || selectedBrands.length > 0) && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            {selectedCategory !== 'all' && (
                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">
                                    Category: {selectedCategory}
                                    <button onClick={() => handleCategoryChange('all')} className="hover:text-blue-900"><X size={12} /></button>
                                </span>
                            )}
                            {selectedBrands.map(brand => (
                                <span key={brand} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200">
                                    {brand}
                                    <button onClick={() => handleBrandToggle(brand)} className="hover:text-black"><X size={12} /></button>
                                </span>
                            ))}
                            <button onClick={clearAllFilters} className="text-xs text-red-600 font-medium hover:underline ml-2">Clear All</button>
                        </div>
                    )}

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-xl"></div>
                            ))}
                        </div>
                    ) : displayedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                            {displayedProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 text-center">
                            <div className="bg-gray-50 p-6 rounded-full mb-4">
                                <Filter size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6 max-w-sm">We couldn't find any items matching your current filters. Try adjusting your search or categories.</p>
                            <button
                                onClick={clearAllFilters}
                                className="text-blue-600 font-bold hover:underline flex items-center gap-2"
                            >
                                Clear all filters <ArrowRight size={16} className="rotate-180" />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;