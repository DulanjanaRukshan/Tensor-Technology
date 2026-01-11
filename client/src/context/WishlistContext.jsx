import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        // This prevents the app from crashing if used outside the provider
        console.warn("useWishlist used outside of WishlistProvider");
        return { wishlist: [], wishlistItems: [], addToWishlist: () => {}, removeFromWishlist: () => {}, isInWishlist: () => false, wishlistCount: 0 };
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const localData = localStorage.getItem('wishlist');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing wishlist from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (!prev.find(item => item._id === product._id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item._id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    const clearWishlist = () => setWishlist([]);

    return (
        <WishlistContext.Provider value={{
            wishlist,               // New Name (for new components)
            wishlistItems: wishlist, // 👈 OLD NAME (Kept for compatibility so code doesn't break)
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
            wishlistCount: wishlist.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
};