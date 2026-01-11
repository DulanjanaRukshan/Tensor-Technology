import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Layers, ShieldCheck, Truck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        const res = await register(name, email, password);
        
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
            <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative justify-center items-center overflow-hidden">
                {/* Background Image */}
                <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070" 
                    alt="Tech Workspace" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-900/80 to-purple-900/50"></div>

                {/* Content */}
                <div className="relative z-10 px-16 text-center text-white">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl inline-block mb-8 border border-white/20">
                        <Layers size={64} className="text-blue-300" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 tracking-tight">
                        Join the <span className="text-blue-300">Revolution</span>
                    </h2>
                    <p className="text-blue-100 text-lg max-w-lg mx-auto leading-relaxed mb-10">
                        Create an account today to unlock exclusive deals, track your orders in real-time, and get personalized tech recommendations.
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium backdrop-blur-sm">
                            <ShieldCheck size={16} className="text-green-400" /> Official Warranty
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium backdrop-blur-sm">
                            <Truck size={16} className="text-yellow-400" /> Express Delivery
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Right Side: Register Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Layers size={40} className="text-blue-600 mx-auto" />
                        <h2 className="mt-2 text-2xl font-bold text-gray-900">TechMobile</h2>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        {/* Social Signups */}
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
                                <span className="px-2 bg-white text-gray-500">Or register with email</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleRegister}>
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                    {!isLoading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                By clicking create account, you agree to our{' '}
                                <a href="#" className="underline hover:text-gray-900">Terms of Service</a> and{' '}
                                <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;