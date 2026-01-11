import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Layers, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const res = await login(email, password);
        
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            
            {/* 1. Left Side: Brand Hero (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative justify-center items-center overflow-hidden">
                {/* Background Image */}
                <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070" 
                    alt="Technology Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                
                {/* Decorative Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                {/* Brand Content */}
                <div className="relative z-10 px-12 text-center">
                    <div className="bg-blue-600/20 backdrop-blur-md p-4 rounded-2xl inline-block mb-8 border border-blue-500/30">
                        <Layers size={64} className="text-blue-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                        Welcome to Tech<span className="text-blue-500">Mobile</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                        Access your premium dashboard, track orders, and experience the future of electronic shopping.
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 text-gray-300 text-sm">
                            <Check size={14} className="text-green-400" /> Secure Login
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 text-gray-300 text-sm">
                            <Check size={14} className="text-green-400" /> 24/7 Support
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Right Side: Login Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Layers size={40} className="text-blue-600 mx-auto" />
                        <h2 className="mt-2 text-2xl font-bold text-gray-900">TechMobile</h2>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or{' '}
                            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                create a new account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        {/* Social Logins */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                                <span className="ml-2 text-sm font-medium text-gray-600">Google</span>
                            </button>
                            <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5" alt="Facebook" />
                                <span className="ml-2 text-sm font-medium text-gray-600">Facebook</span>
                            </button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? 'Signing in...' : 'Sign in'}
                                    {!isLoading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;