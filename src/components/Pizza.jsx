import React, { useEffect, useState } from 'react'

const Pizza = () => {
    const [pizza, setPizza] = useState({});

    const getData = async () => {
        try {
        const response = await fetch("http://localhost:5000/api/pizzas/p001");
        const data = await response.json();
        setPizza(data);
        } catch(e) {
        console.error(e);
        }
        }


    useEffect(() => {
        getData()
    }, [])

    return (
        <section className='h-lvh flex items-center justify-center bg-[#e0e0e0]'>
            <article
                className=" max-w-lg pb-4 bg-[#e0e0e0] rounded-lg"
                style={{ boxShadow: '15px 15px 25px #bebebe, -15px -15px 25px #ffffff' }}
            >
                <a className='h-10' href="#">
                    <img
                        className="rounded-t-lg h-full"
                        src={pizza.img}
                        alt={`Imagen de una pizza ${pizza.name}`}
                    />
                </a>
                <div className="px-5 pb-5 flex flex-col items-center gap-2">
                    <a href="#">
                        <h5 className="text-4xl font-semibold text-gray-900 pt-4">
                            Pizza {pizza.name}
                        </h5>
                    </a>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h4 className="text-gray-600 text-2xl font-light pt-4">Ingredientes:</h4>
                        <ul className="text-2xl text-center h-10 flex">
                            {pizza.ingredients?.map((ingredient, index) => (
                                <li key={ingredient}>
                                    {ingredient}
                                    {index < pizza.ingredients.length - 1 && ", "}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <span className='text-justify text-base'>{pizza.desc}</span>
                    <span className="text-4xl text-center pt-2 pb-6 border-b-2 border-black/15 w-full max-w-xl">
                        Precio: ${pizza.price?.toLocaleString()}
                    </span>
                    <div className="flex items-center justify-between gap-24 pt-6">
                        <button
                            type="button"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 mb-2"
                        >
                            🛒 Añadir
                        </button>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Pizza