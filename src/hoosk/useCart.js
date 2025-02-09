import { useContext } from 'react';
import { CartContext } from './context/cartContext.jsx';

export function useShoppingCart() {
    const cart = useContext(CartContext);

    if (!cart) {
        throw new Error('El contexto de carrito no está disponible. Asegúrate de envolver la aplicación con el CartProvider.');
    }

    return cart;
}
