import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('lumi_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('lumi_cart', JSON.stringify(cart));
    }, [cart]);

    // Add product to cart (allows duplicates as per original design)
    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
        // Optionally trigger a toast here
    };

    // Remove product by index
    const removeFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const count = cart.length;

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            isCartOpen,
            toggleCart,
            total,
            count
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
