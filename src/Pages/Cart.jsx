import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import { CarritoContext } from './context/CartContext';



const Cart = () => {
    const carritoIcon = <FontAwesomeIcon icon={faCartShopping}/>
    const cruz = <FontAwesomeIcon icon={faXmark} />
    const {carrito, setCarrito} = useContext(CarritoContext)


    const agregar = (pizza) => {
        const unaPizzamas = [...carrito]
        const index = unaPizzamas.findIndex(el => el.id === pizza.id)
        unaPizzamas[index].count += 1
        setCarrito(unaPizzamas)
    }

    const quitar = (pizza) => {
        const unaPizzamenos = [...carrito]
        const index = unaPizzamenos.findIndex(el => el.id === pizza.id)
        unaPizzamenos[index].count =   unaPizzamenos[index].count > 1 ? unaPizzamenos[index].count - 1 : unaPizzamenos.splice(index, 1)
        setCarrito(unaPizzamenos)
    }

    const eliminar = (pizza) => {
        const pizzaEliminada = [...carrito]
        const index = pizzaEliminada.findIndex(el => el.id === pizza.id)
        pizzaEliminada.splice(index, 1)
        setCarrito(pizzaEliminada)
    }

    const total = carrito.reduce((acumulador, items) => acumulador + (items.count * items.price), 0)



    return (

        <div className="modal">
           
        <aside className='cart'>
        <p className='botonCerrarModal' > <Link to='/'> {cruz} </Link> </p>
            <p className='tituloCart'> Tu pedido</p>
            
            {total > 1 ? carrito.map(pizza =>
                <div key={pizza.id} className='pedido'>
                    <img src={`public/imgs/${pizza.name}.jpeg`} alt={pizza.name} className='imagenPedido' />
                    <div className='detalle'>
                        <p className='nombrePedido'>{pizza.name}</p>
                        <p className='precioPedido'> $ {pizza.price.toLocaleString('de-DE')} c/u</p>
                        <div className="botones">
                            <button className='sumaResta'onClick={() => quitar(pizza)}> - </button>
                            <p> {pizza.count}</p>
                            <button className='sumaResta' onClick={() => agregar(pizza)}> + </button>
                        </div>
                    </div>
                    <p className='cerrarPedido' onClick={() => eliminar(pizza)}>{cruz}</p>
                </div>

            ) : 
            <div className='carritoVacio'> 
                <p className='iconoVacio'> {carritoIcon} </p>
            <p> Tu carrito está vacío</p></div>
            
            }
           {total > 0 &&  <div className='pagoCart'>

                <div className='totalCart'> <p> Total</p> <p className='totalmonto'> $ {total.toLocaleString('de-DE')} </p></div>


                <button className='anadir'> Continuar al pago</button>
            </div>}
           


        </aside>
        </div>
       
    )
}

export default Cart