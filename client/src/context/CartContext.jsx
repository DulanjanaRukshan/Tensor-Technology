import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize from LocalStorage (Safe Parsing)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage", error);
            return [];
        }
    });

    // Sync to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 1. Add to Cart (Supports adding custom quantity)
    const addToCart = (product, qty = 1) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.product._id === product._id);

            if (existingItem) {
                // If item exists, increase quantity
                return prev.map(item =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            // If new item, add to cart
            return [...prev, { product, quantity: qty }];
        });
    };

    // 2. Remove Item completely
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.product._id !== productId));
    };

    // 3. Update Quantity (Increase/Decrease)
    const updateQuantity = (productId, amount) => {
        setCartItems(prev => prev.map(item => {
            if (item.product._id === productId) {
                const newQuantity = item.quantity + amount;
                // Prevent quantity from going below 1
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    // 4. Clear Cart (e.g., after payment)
    const clearCart = () => setCartItems([]);

    // 5. Calculations
    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};