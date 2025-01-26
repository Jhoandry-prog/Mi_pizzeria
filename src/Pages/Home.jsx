import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';

const Home = () => {
  const [menu,setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getMenu = async () => {
    const response = await fetch("http://localhost:5000/api/pizzas");
    const data = await response.json();
    setMenu(data);
    setIsLoading(false);
  };

  useEffect(() => {
      getPizzas()
  }, [])


  return (
    <>
      
      <Header/>

      <main>
        {isLoading ? (<p>Cargando...</p>) : (menu.map(pizza => <CardPizza
          name={pizza.name}
          price={pizza.price.toLocaleString('de-DE')}
          ingredients={pizza.ingredients}
          img={`public/imgs/${pizza.name}.jpeg`}
          key={pizza.id}
        />))}

      </main>
    </>
  )
}

export default Home;
