import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/pizzas");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        let updatedCart;

        if (existingItemIndex !== -1) {
            updatedCart = cartItems.map((item, index) =>
                index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }

        updateCartState(updatedCart);
    };

    const removeFromCart = (product) => {
        const updatedCart = cartItems.filter(item => item.id !== product.id);
        updateCartState(updatedCart);
    };

    const increaseQuantity = (product) => {
        const updatedCart = cartItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCartState(updatedCart);
    };

    const decreaseQuantity = (product) => {
        const updatedCart = cartItems.reduce((acc, item) => {
            if (item.id === product.id) {
                if (item.quantity > 1) {
                    acc.push({ ...item, quantity: item.quantity - 1 });
                }
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        updateCartState(updatedCart);
    };

    const updateCartState = (updatedCart) => {
        setCartItems(updatedCart);
        const newTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCartTotal(newTotal);
    };

    return (
        <CartContext.Provider value={{
            fetchProducts,
            products,
            cartItems,
            cartTotal,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}
