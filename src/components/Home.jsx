import React, { useEffect, useState } from 'react'
import Header from './Header';
import CardPizza from './CardPizza';
import  { pizzas } from './pizzas';

const Home = () => {
  /* guardar la Apis pizzas */
  const [pizzas,setPizzas] = useState([])

  /* para consultar a la Apis pizzas */
  const getPizzas = async () => {
      // URL del endpoint a consultar
      const url = "http://localhost:5000/api/pizzas"
      const response = await fetch(url)
      const dataPizzas = await response.json()
      setPizzas(dataPizzas)
  }
  useEffect(() => {
      getPizzas()
  }, [])

  return (
    <div>
      <h1>Lista de Pizzas</h1>
      <div>
        {pizzas.map((pizza) => (
          <div key={pizza.id}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>Price: ${pizza.price}</p>
            <img src={pizza.image} alt={pizza.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
