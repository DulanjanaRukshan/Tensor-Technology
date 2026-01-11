import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, MapPin, ChevronDown, Menu, Phone, Tablet, Headphones, Watch, Layers, Facebook, Twitter, Instagram, Youtube, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Header = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [products, setProducts] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const brandLogos = [
        { name: 'Apple', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1920px-Apple_logo_black.svg.png' },
        { name: 'Samsung', img: 'https://images.seeklogo.com/logo-png/12/1/samsung-logo-png_seeklogo-122023.png' },
        { name: 'Sony', img: 'https://cdn.freebiesupply.com/logos/large/2x/sony-logo-svg-vector.svg' },
        { name: 'Google', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png' },
        { name: 'Xiaomi', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
        { name: 'JBL', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/JBL-Logo.svg/1200px-JBL-Logo.svg.png' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Using the environment variable as requested
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products for search", err);
            }
        };
        fetchProducts();

        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 1) {
            const filtered = products.filter(p =>
                p.title.toLowerCase().includes(value.toLowerCase()) ||
                p.category.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
        }
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* 1. Top Bar - Dark & Sleek */}
            <div className="bg-gray-950 text-xs text-gray-400 border-b border-gray-800 hidden md:block">
                <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center hover:text-white transition-colors cursor-pointer duration-300">
                            <MapPin size={14} className="mr-1.5 text-blue-500" /> 123 Tech Avenue, Colombo 07
                        </span>
                        <span className="flex items-center hover:text-white transition-colors cursor-pointer duration-300">
                            <Phone size={14} className="mr-1.5 text-blue-500" /> +94 77 123 4567
                        </span>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center space-x-4 mr-6 border-r border-gray-800 pr-6">
                            <a href="#" className="hover:text-blue-500 transition-colors transform hover:scale-110"><Facebook size={14} /></a>
                            <a href="#" className="hover:text-sky-400 transition-colors transform hover:scale-110"><Twitter size={14} /></a>
                            <a href="#" className="hover:text-pink-500 transition-colors transform hover:scale-110"><Instagram size={14} /></a>
                            <a href="#" className="hover:text-red-500 transition-colors transform hover:scale-110"><Youtube size={14} /></a>
                        </div>

                        {/* Top Bar User Menu */}
                        {user ? (
                            <div className="flex items-center space-x-5">
                                <Link to="/profile" className="font-medium text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    Hi, {user.name}
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-yellow-500 hover:text-yellow-400 font-bold tracking-wide">Admin</Link>
                                )}
                                <button onClick={logout} className="hover:text-red-400 transition-colors">Logout</button>
                            </div>
                        ) : (
                            <Link to="/auth/login" className="hover:text-white transition-colors font-medium flex items-center gap-2">
                                <User size={14} /> Login / Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Wrapper with Glass Effect */}
            <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>

                {/* 2. Main Header */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8">

                        {/* Logo & Mobile Toggles */}
                        <div className="flex items-center justify-between">
                            <Link to="/" className="block">
                                <img src="/logo.svg" alt="Tensor" className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 hover:brightness-110" />
                            </Link>

                            <div className="flex items-center space-x-4 md:hidden">
                                <Link to="/cart" className="relative text-gray-700 p-2">
                                    <ShoppingCart size={24} />
                                    {cartCount > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-gray-700 hover:text-blue-600 transition p-2"
                                >
                                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>
                        </div>

                        {/* Search Bar - Enhanced */}
                        <div className="flex-grow max-w-2xl relative z-50" ref={searchRef}>
                            <form onSubmit={handleSearchSubmit} className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={20} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for products, brands..."
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                    onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white block pl-12 pr-14 py-2.5 md:py-3 transition-all shadow-sm hover:shadow-md hover:border-blue-300"
                                />
                                <button type="submit" className="absolute right-1.5 top-1.5 bg-blue-600 text-white p-1.5 md:p-2 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-md shadow-blue-200">
                                    <Search size={16} />
                                </button>
                            </form>

                            {/* Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl mt-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                                    <ul>
                                        {suggestions.map(product => (
                                            <li key={product._id}>
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    onClick={() => setShowSuggestions(false)}
                                                    className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors group border-b border-gray-50 last:border-0"
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center mr-4 group-hover:border-blue-200 transition-colors shrink-0">
                                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-800 group-hover:text-blue-700 line-clamp-1">{product.title}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{product.category}</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Desktop Icons - Enhanced Hover */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/wishlist" className="flex flex-col items-center group relative p-2 rounded-xl hover:bg-gray-50 transition-all">
                                <div className="relative">
                                    <Heart size={24} className="text-gray-600 group-hover:text-blue-600 group-hover:fill-blue-50 transition-all duration-300" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wide mt-1 text-gray-500 group-hover:text-blue-600">Wishlist</span>
                            </Link>

                            <Link to="/cart" className="flex flex-col items-center group relative p-2 rounded-xl hover:bg-gray-50 transition-all">
                                <div className="relative">
                                    <ShoppingCart size={24} className="text-gray-600 group-hover:text-blue-600 group-hover:fill-blue-50 transition-all duration-300" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-sm border border-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wide mt-1 text-gray-500 group-hover:text-blue-600">Cart</span>
                            </Link>

                            {user ? (
                                <Link to="/profile" className="flex flex-col items-center group p-2 rounded-xl hover:bg-blue-50 transition-all">
                                    <div className="p-0.5 bg-blue-100 rounded-full group-hover:ring-2 ring-blue-200 transition-all">
                                        <User size={20} className="text-blue-600" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wide mt-1 text-blue-700">Account</span>
                                </Link>
                            ) : (
                                <Link to="/auth/login" className="flex flex-col items-center group p-2 rounded-xl hover:bg-gray-50 transition-all">
                                    <div className="p-0.5 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-all">
                                        <User size={20} className="text-gray-600" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wide mt-1 text-gray-500 group-hover:text-gray-800">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Category Navigation (Desktop) */}
                <div className={`hidden md:block border-t border-blue-100 transition-colors ${isScrolled ? 'bg-blue-50/90' : 'bg-blue-50'}`}>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between">

                            {/* Mega Menu Trigger */}
                            <div className="relative group py-1">
                                <Link to="/shop" className="flex items-center font-bold text-gray-800 hover:text-blue-600 gap-2 px-4 py-1.5 bg-white hover:bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-full transition-all duration-300">
                                    <Menu size={18} />
                                    <span>Browse Categories</span>
                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-gray-400" />
                                </Link>

                                {/* MEGA MENU DROPDOWN */}
                                <div className="absolute left-0 top-full pt-4 w-[800px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 transform origin-top-left group-hover:translate-y-0 translate-y-2">
                                    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 overflow-hidden grid grid-cols-12">
                                        {/* Categories Column */}
                                        <div className="col-span-4 bg-gray-50/80 p-6 border-r border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                                                <Layers size={14} /> Departments
                                            </h4>
                                            <div className="space-y-1">
                                                {[
                                                    { name: 'Smartphones', icon: Phone, link: 'smartphones' },
                                                    { name: 'Tablets & iPads', icon: Tablet, link: 'tablets' },
                                                    { name: 'Headphones', icon: Headphones, link: 'audio' },
                                                    { name: 'Smart Watches', icon: Watch, link: 'wearables' },
                                                    { name: 'Accessories', icon: Layers, link: 'accessories' },
                                                ].map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={`/shop?category=${item.link}`}
                                                        className="flex items-center gap-3 p-2.5 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-white hover:shadow-sm transition-all duration-200"
                                                    >
                                                        <item.icon size={18} className="text-gray-400 group-hover:text-blue-500" />
                                                        <span className="font-medium text-sm">{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Brands Column */}
                                        <div className="col-span-5 p-6 border-r border-gray-100 bg-white">
                                            <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Top Brands</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {brandLogos.map((brand) => (
                                                    <Link
                                                        key={brand.name}
                                                        to={`/shop?brand=${brand.name}`}
                                                        className="flex items-center p-2 rounded-xl hover:bg-gray-50 transition-colors group/brand"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1 mr-3 shadow-sm group-hover/brand:border-blue-200 transition-colors">
                                                            <img
                                                                src={brand.img}
                                                                alt={brand.name}
                                                                className="w-full h-full object-contain filter grayscale group-hover/brand:grayscale-0 transition-all duration-300"
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">{brand.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Featured Offer Column */}
                                        <div className="col-span-3 p-6 bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex flex-col justify-end relative overflow-hidden group/offer">
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl group-hover/offer:scale-110 transition-transform duration-500"></div>
                                            <div className="relative z-10">
                                                <h4 className="font-bold text-2xl mb-2">Summer Sale</h4>
                                                <p className="text-blue-100 text-sm mb-4 leading-relaxed">Get up to 50% off on premium audio devices.</p>
                                                <Link to="/discount" className="inline-block bg-white text-blue-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                                    Shop Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Brand Links */}
                            <div className="flex items-center space-x-6">
                                {['Apple', 'Samsung', 'Google', 'Sony', 'Xiaomi', 'JBL'].map(brand => (
                                    <Link key={brand} to={`/shop?brand=${brand}`} className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                                        {brand}
                                    </Link>
                                ))}
                            </div>

                            <Link to="/discount" className="flex items-center gap-2 text-red-600 font-extrabold text-sm px-4 py-1 bg-red-50 rounded-full hover:bg-red-100 transition-colors">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Deals of the Day
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (Hidden) */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[60] md:hidden">
                        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
                        <div className="absolute top-0 left-0 w-[85%] max-w-[300px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                            {/* Mobile Menu Content */}
                            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <span className="font-extrabold text-xl text-gray-900">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto">
                                {user ? (
                                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl text-blue-700 font-bold border border-blue-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-sm">{user.name.charAt(0)}</div>
                                        <div>
                                            <div className="text-xs text-blue-500 uppercase font-semibold">Signed in as</div>
                                            {user.name}
                                        </div>
                                    </Link>
                                ) : (
                                    <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl text-white font-bold shadow-lg shadow-gray-200">
                                        <User size={20} /> Login / Register
                                    </Link>
                                )}

                                <div className="pt-2">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">Navigation</p>
                                    <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                                        Shop All Products <ChevronDown size={16} className="-rotate-90 text-gray-400" />
                                    </Link>
                                    <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                                        My Cart <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
                                    </Link>
                                    <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                                        My Wishlist <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">{wishlistCount}</span>
                                    </Link>
                                </div>

                                <div className="pt-2 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">Popular Brands</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Apple', 'Samsung', 'Google', 'Sony'].map(brand => (
                                            <Link key={brand} to={`/shop?brand=${brand}`} onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-sm text-gray-600 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                                                {brand}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;