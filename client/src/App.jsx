import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Discount from './pages/Discount';
import Admin from './pages/Admin';

import SupportCenter from './pages/support/SupportCenter';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Profile from './pages/Profile';

import Returns from './pages/support/Returns';
import Shipping from './pages/support/Shipping';
import FAQs from './pages/support/FAQs';

// Admin Route Component
const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user && user.isAdmin ? children : <Navigate to="/auth/login" />;
};

import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <Router>
                        <ScrollToTop />
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/shop" element={<Shop />} />
                                    <Route path="/product/:id" element={<ProductDetails />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/profile" element={<Profile />} />

                                    {/* Support Routes */}

                                    <Route path="/support/center" element={<SupportCenter />} />
                                    <Route path="/support/returns" element={<Returns />} />
                                    <Route path="/support/shipping" element={<Shipping />} />
                                    <Route path="/support/faqs" element={<FAQs />} />

                                    {/* Auth Routes */}
                                    <Route path="/auth/login" element={<Login />} />
                                    <Route path="/auth/register" element={<Register />} />

                                    <Route path="/discount" element={<Discount />} />
                                    <Route path="/admin" element={
                                        <AdminRoute>
                                            <Admin />
                                        </AdminRoute>
                                    } />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}
export default App;
