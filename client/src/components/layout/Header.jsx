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
            {/* 1. Top Bar */}
            <div className="bg-gray-900 text-xs text-gray-300 border-b border-gray-800 hidden md:block">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center hover:text-white transition cursor-pointer">
                            <MapPin size={14} className="mr-1 text-blue-400" /> 123 Tech Avenue, Colombo 07, Sri Lanka
                        </span>
                        <span className="flex items-center hover:text-white transition cursor-pointer">
                            <Phone size={14} className="mr-1 text-blue-400" /> +94 77 123 4567
                        </span>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center space-x-4 mr-6 border-r border-gray-700 pr-6">
                            <a href="#" className="hover:text-blue-500 transition"><Facebook size={14} /></a>
                            <a href="#" className="hover:text-blue-400 transition"><Twitter size={14} /></a>
                            <a href="#" className="hover:text-pink-500 transition"><Instagram size={14} /></a>
                            <a href="#" className="hover:text-red-500 transition"><Youtube size={14} /></a>
                        </div>

                        {/* Top Bar User Menu */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="font-medium text-white hover:text-blue-400 flex items-center gap-2">
                                    <User size={14} /> Hi, {user.name}
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 font-bold">Admin Panel</Link>
                                )}
                                <button onClick={logout} className="hover:text-red-400 transition">Logout</button>
                            </div>
                        ) : (
                            <Link to="/auth/login" className="hover:text-white transition font-medium">Login / Register</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Wrapper */}
            <div className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>

                {/* 2. Main Header */}
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">

                        {/* Logo & Mobile Toggles */}
                        <div className="flex items-center justify-between">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="p-1 rounded-full border border-gray-100 shadow-sm overflow-hidden">
                                    <img src="/logo.svg" alt="Tensor Technology" className="h-12 w-12 rounded-full object-cover border border-gray-100" />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-gray-900">
                                    Tensor <span className="text-blue-600">Technology</span>
                                </span>
                            </Link>

                            <div className="flex items-center space-x-4 md:hidden">
                                <Link to="/cart" className="relative text-gray-700">
                                    <ShoppingCart size={24} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-gray-700 hover:text-blue-600 transition"
                                >
                                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-grow max-w-2xl relative z-50" ref={searchRef}>
                            <form onSubmit={handleSearchSubmit} className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={20} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                    onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-12 pr-14 py-3.5 transition-all shadow-sm group-hover:shadow-md"
                                />
                                <button type="submit" className="absolute right-2 top-1.5 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm">
                                    <Search size={18} />
                                </button>
                            </form>

                            {/* Suggestions */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-2xl mt-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <ul>
                                        {suggestions.map(product => (
                                            <li key={product._id}>
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    onClick={() => setShowSuggestions(false)}
                                                    className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors group border-b border-gray-50 last:border-0"
                                                >
                                                    <div className="w-10 h-10 rounded-md bg-white border border-gray-200 p-1 flex items-center justify-center mr-4 group-hover:border-blue-200 transition-colors">
                                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">{product.title}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{product.category}</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Desktop Icons */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/wishlist" className="flex flex-col items-center group relative text-gray-600 hover:text-blue-600 transition">
                                <div className="relative p-1">
                                    <Heart size={24} className="group-hover:fill-blue-50 transition-transform group-hover:scale-110" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs font-medium mt-1">Wishlist</span>
                            </Link>

                            <Link to="/cart" className="flex flex-col items-center group relative text-gray-600 hover:text-blue-600 transition">
                                <div className="relative p-1">
                                    <ShoppingCart size={24} className="group-hover:fill-blue-50 transition-transform group-hover:scale-110" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs font-medium mt-1">Cart</span>
                            </Link>

                            {/* MAIN USER ICON LOGIC */}
                            {user ? (
                                <Link to="/profile" className="flex flex-col items-center group text-gray-600 hover:text-blue-600 transition">
                                    <div className="p-1 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors border border-blue-100">
                                        <User size={20} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-medium mt-1 text-blue-700">Account</span>
                                </Link>
                            ) : (
                                <Link to="/auth/login" className="flex flex-col items-center group text-gray-600 hover:text-blue-600 transition">
                                    <div className="p-1 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                                        <User size={20} />
                                    </div>
                                    <span className="text-xs font-medium mt-1">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Category Navigation (Desktop) */}
                <div className="hidden md:block border-t border-gray-100 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between">

                            {/* Mega Menu Trigger */}
                            <div className="relative group py-3">
                                <Link to="/shop" className="flex items-center font-bold text-gray-800 hover:text-blue-600 gap-2 px-4 py-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                    <Menu size={18} />
                                    <span>Browse Categories</span>
                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                </Link>

                                {/* MEGA MENU DROPDOWN */}
                                <div className="absolute left-0 top-full pt-2 w-[800px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-left">
                                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-12">

                                        {/* Categories Column */}
                                        <div className="col-span-4 bg-gray-50 p-6 border-r border-gray-100">
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
                                                        className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-white hover:shadow-sm transition-all"
                                                    >
                                                        <item.icon size={18} className="text-gray-400" />
                                                        <span className="font-medium">{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Brands Column */}
                                        <div className="col-span-5 p-6 border-r border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Top Brands</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {brandLogos.map((brand) => (
                                                    <Link
                                                        key={brand.name}
                                                        to={`/shop?brand=${brand.name}`}
                                                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group/brand"
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
                                        <div className="col-span-3 p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex flex-col justify-end relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                                            <div className="relative z-10">
                                                <h4 className="font-bold text-2xl mb-2">Summer Sale</h4>
                                                <p className="text-blue-100 text-sm mb-4">Up to 50% off on selected Audio devices.</p>
                                                <Link to="/discount" className="inline-block bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                                                    Shop Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Brand Links */}
                            <div className="flex items-center space-x-8">
                                <Link to="/shop?brand=Apple" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wider">Apple</Link>
                                <Link to="/shop?brand=Samsung" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wider">Samsung</Link>
                                <Link to="/shop?brand=Google" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wider">Google</Link>
                                <Link to="/shop?brand=Sony" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wider">Sony</Link>
                                <Link to="/shop?brand=Xiaomi" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wider">Xiaomi</Link>
                            </div>

                            <Link to="/discount" className="flex items-center text-red-600 font-bold text-sm px-4 py-1.5 bg-red-50 rounded-full hover:bg-red-100 transition-colors animate-pulse">
                                Deals of the Day %
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (Hidden) */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[60] md:hidden">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                        <div className="absolute top-0 left-0 w-[80%] max-w-[300px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                            {/* Mobile Menu Content */}
                            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <span className="font-bold text-xl text-blue-700">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                {user ? (
                                    <Link to="/profile" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-700 font-bold">
                                        <User size={20} /> My Account
                                    </Link>
                                ) : (
                                    <Link to="/auth/login" className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg text-gray-700 font-bold">
                                        <User size={20} /> Login / Register
                                    </Link>
                                )}
                                <Link to="/shop" className="block p-2 font-bold text-gray-700">Shop All</Link>
                                <div className="space-y-2 pl-2">
                                    <p className="text-xs text-gray-400 font-bold uppercase">Brands</p>
                                    <Link to="/shop?brand=Apple" className="block text-gray-600">Apple</Link>
                                    <Link to="/shop?brand=Samsung" className="block text-gray-600">Samsung</Link>
                                    <Link to="/shop?brand=Google" className="block text-gray-600">Google</Link>
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