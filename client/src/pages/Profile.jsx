import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    User, Package, LogOut, Mail, Phone, MapPin, 
    CreditCard, Settings, Heart, Truck, ChevronRight, 
    ShoppingBag 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();

    // Mock Order History (Enhanced)
    const orders = [
        { 
            id: '#TM-7782', 
            date: 'Oct 24, 2025', 
            status: 'Delivered', 
            total: 1299.00, 
            items: ['Samsung S24 Ultra', 'Case'], 
            image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-ultra-sm-s928-sm-s928bztpeub-539655227?$684_547_PNG$' 
        },
        { 
            id: '#TM-7781', 
            date: 'Sep 12, 2025', 
            status: 'Processing', 
            total: 89.99, 
            items: ['Anker Power Bank'], 
            image: 'https://m.media-amazon.com/images/I/61+4-X2+5-L._AC_SL1500_.jpg' 
        }
    ];

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Your Account</h2>
                    <p className="text-gray-500 mb-6">Log in to view your orders, manage addresses, and update your profile.</p>
                    <Link to="/auth/login" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                        Login Now
                    </Link>
                    <Link to="/auth/register" className="block w-full mt-3 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition">
                        Create Account
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">My Account</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {user.name}!</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/cart" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition">
                            <ShoppingBag size={18} /> Cart
                        </Link>
                        <button onClick={logout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition">
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Dashboard Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Package size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Orders</p>
                            <p className="text-xl font-bold text-gray-900">12</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><Truck size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                            <p className="text-xl font-bold text-gray-900">1</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-pink-50 text-pink-600 rounded-lg"><Heart size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Wishlist</p>
                            <p className="text-xl font-bold text-gray-900">4 Items</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CreditCard size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Spent</p>
                            <p className="text-xl font-bold text-gray-900">$2,450</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Sidebar: Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center mb-6">
                                <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-200">
                                    {user.name.charAt(0)}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                {user.isAdmin && (
                                    <span className="mt-2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Administrator</span>
                                )}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-700">
                                    <Mail size={18} className="text-gray-400" />
                                    <span className="text-sm font-medium truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition cursor-pointer">
                                    <Phone size={18} className="text-gray-400" />
                                    <span className="text-sm font-medium">+94 77 123 4567</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition cursor-pointer">
                                    <MapPin size={18} className="text-gray-400" />
                                    <span className="text-sm font-medium">Colombo, Sri Lanka</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Menu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition border-b border-gray-50 text-left">
                                <div className="flex items-center gap-3 font-medium text-gray-700">
                                    <MapPin size={20} className="text-blue-600" /> Addresses
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition border-b border-gray-50 text-left">
                                <div className="flex items-center gap-3 font-medium text-gray-700">
                                    <CreditCard size={20} className="text-blue-600" /> Payment Methods
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left">
                                <div className="flex items-center gap-3 font-medium text-gray-700">
                                    <Settings size={20} className="text-blue-600" /> Account Settings
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Right Content: Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Package className="text-blue-600" /> Recent Orders
                                </h3>
                                <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            
                                            {/* Order Info */}
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center p-2 shrink-0">
                                                    <img src={order.image} alt="Product" className="h-full w-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-gray-900">{order.id}</span>
                                                        <span className="text-gray-300">•</span>
                                                        <span className="text-sm text-gray-500">{order.date}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{order.items.join(', ')}</p>
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                        order.status === 'Delivered' 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                                            order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'
                                                        }`}></span>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <span className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</span>
                                                <div className="flex gap-2">
                                                    <button className="text-xs font-bold bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
                                                        View Invoice
                                                    </button>
                                                    <button className="text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-100">
                                                        Track Order
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Empty State Placeholder (Optional) */}
                            {orders.length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="text-gray-300" size={32} />
                                    </div>
                                    <h3 className="text-gray-900 font-bold mb-1">No orders yet</h3>
                                    <p className="text-gray-500 text-sm mb-4">When you place an order, it will appear here.</p>
                                    <Link to="/shop" className="text-blue-600 font-bold text-sm hover:underline">Start Shopping</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;