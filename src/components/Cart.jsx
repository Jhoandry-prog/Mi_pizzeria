import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pizzaCart } from '../pizzas'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



const Cart = () => {

    const cruz = <FontAwesomeIcon icon={faXmark} />
    const [cantidad, setCantidad] = useState([...pizzaCart])

    const agregar = (pizza) => {
        const unaPizzamas = [...cantidad]
        const index = unaPizzamas.findIndex(el => el.id === pizza.id)
        unaPizzamas[index].count += 1
        setCantidad(unaPizzamas)
    }

    const quitar = (pizza) => {
        const unaPizzamenos = [...cantidad]
        const index = unaPizzamenos.findIndex(el => el.id === pizza.id)
        unaPizzamenos[index].count =   unaPizzamenos[index].count > 1 ? unaPizzamenos[index].count - 1 : unaPizzamenos.splice(index, 1)
        setCantidad(unaPizzamenos)
    }

    const total = cantidad.reduce((acumulador, items) => acumulador + (items.count * items.price), 0)

    return (

        <aside className='cart'>
            <p className='tituloCart'> Tu pedido</p>
            {cantidad.map(pizza =>
                <div key={pizza.id} className='pedido'>
                    <img src={pizza.img} alt={pizza.name} className='imagenPedido' />
                    <div className='detalle'>
                        <p className='nombrePedido'>{pizza.name}</p>
                        <p className='precioPedido'> $ {(pizza.price).toFixed(2)} </p>
                        <div className="botones">
                            <button className='sumaResta'onClick={() => quitar(pizza)}> - </button>
                            <p> {pizza.count}</p>
                            <button className='sumaResta' onClick={() => agregar(pizza)}> + </button>
                        </div>
                    </div>
                    <p className='cerrarPedido'>{cruz}</p>
                </div>

            )}
            <div className='pagoCart'>

                <div className='totalCart'> <p> Total</p> <p className='totalmonto'> $ {total.toLocaleString('de-DE')} </p></div>


                <button className='anadir'> Continuar al pago</button>
            </div>

        </aside>

    )
}

export default Cart