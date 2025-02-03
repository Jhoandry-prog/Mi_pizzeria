import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { CartContext } from '../context/cartContext';

const Home = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/pizzas");
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.error("Error al obtener las pizzas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <Header />

      <main>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          menu.map(pizza => (
            <CardPizza
              key={pizza.id}
              name={pizza.name}
              price={pizza.price.toLocaleString('de-DE')}
              ingredients={pizza.ingredients}
              img={`/public/imgs/${pizza.name}.jpeg`}
              onAddToCart={() => addToCart(pizza)} // Pasar función de "Añadir"
            />
          ))
        )}
      </main>
    </>
  );
};

export default Home;
