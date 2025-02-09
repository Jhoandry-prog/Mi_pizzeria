import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider ({ children }) {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);  

    const getData = async (url) => {
        try {
          const response = await fetch("http://localhost:5000/api/pizzas");
          const data = await response.json();
          setMenu(data);
        } catch(e) {
          console.error(e);
        }
    }

    const agregarAlCarro = (pizza) => {
        const pizzaCartIndex = cart.findIndex(item => item.id === pizza.id)
        let nuevoCarro

        if(pizzaCartIndex >= 0) {
            nuevoCarro = structuredClone(cart)
            nuevoCarro[pizzaCartIndex].quantity += 1
        } else {
            nuevoCarro = [
                ...cart,
                {
                    ...pizza,
                    quantity: 1
                }
            ]
        }

        setCart(nuevoCarro)
        
        let nuevoTotal = 0;
        nuevoCarro.forEach(item => nuevoTotal += item.price * item.quantity);

        setTotal(nuevoTotal)
    }

    const removerDelCarro = (pizza) => {
        const nuevoCarro = cart.filter(item => item.id !== pizza.id)
        setCart(nuevoCarro)

        let nuevoTotal = 0
        nuevoCarro.forEach(item => nuevoTotal += item.price * item.quantity)
        setTotal(nuevoTotal)
    }

    const aumentarCantidad = (pizza) => {
        const nuevaCantidad = [...cart];
        const index = nuevaCantidad.findIndex(ele => ele.id === pizza.id);
        let total = 0
        nuevaCantidad[index].quantity++;
        nuevaCantidad.forEach(ele => {
            total += ele.price * ele.quantity });
        setCart(nuevaCantidad);
        setTotal(total)
    }


    const disminuirCantidad = (pizza) => {
        const nuevaCantidad = [...cart];
        const index = nuevaCantidad.findIndex(ele => ele.name === pizza.name);
        nuevaCantidad[index].quantity--;
        let total = 0
        nuevaCantidad.forEach(ele => {
            total += ele.price * ele.quantity });
        if(nuevaCantidad[index].quantity <= 0) {
            nuevaCantidad.splice(index, 1);
        }
        setCart(nuevaCantidad);
        setTotal(total);
    }

    return (
        <CartContext.Provider value={{
            getData,
            menu,
            setMenu,
            cart,
            setCart,
            total,
            setTotal,
            agregarAlCarro,
            removerDelCarro,
            aumentarCantidad,
            disminuirCantidad,
        }}
        
        >
            {children}
        </CartContext.Provider>
    )
} 
