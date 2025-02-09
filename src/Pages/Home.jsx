import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { CartContext } from '../context/CartContext';

const MainPage = () => {
  const [pizzaList, setPizzaList] = useState([]); 
  const { addItemToCart } = useShoppingCart();
  const apiUrl = "http://localhost:5000/api/pizzas"; 

  useEffect(() => {
    fetchPizzaData();
  }, []);

  const fetchPizzaData = async () => {
    try {
      const response = await fetch(apiUrl);
      const pizzaData = await response.json();
      console.log(pizzaData); 
      setPizzaList(pizzaData);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };


  
  return ( 
    <div className="main-page">
      <ul>
        {pizzaList.map((pizzaItem) => (
          <li key={pizzaItem.id}>
            <PizzaCard {...pizzaItem} addItemToCart={() => addItemToCart(pizzaItem)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
