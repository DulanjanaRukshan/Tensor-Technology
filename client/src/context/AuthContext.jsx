import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configuration
    const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

    // 1. Initialize User from LocalStorage on Load
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    // 2. ✨ PRO FEATURE: Automatic Token Interceptor
    // Whenever 'user' changes, we update Axios headers automatically.
    // This means you don't need to manually send the token in other components!
    useEffect(() => {
        if (user && user.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [user]);

    // Login Function
    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/login`, { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            };
        }
    };

    // Register Function
    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/register`, { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            };
        }
    };

    // Logout Function
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        // Axios interceptor (above) will automatically remove the token header
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};