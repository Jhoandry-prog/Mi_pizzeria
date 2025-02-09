import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/CartContext";

const PizzaDetails = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const { addItemToCart } = useShoppingCart();
  const API_URL = `http://localhost:5000/api/pizzas/${id}`;

  useEffect(() => {
    const getPizzaDetails = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Error en la solicitud: ${res.status}`);
        }
        const result = await res.json();
        setPizzaData(result);
        console.log(result);
      } catch (error) {
        setFetchError(error.message);
        console.error("Error al obtener datos de la pizza:", error);
      }
    };

    getPizzaDetails();
  }, [id]);

  if (fetchError) {
    return <p>Error: {fetchError}</p>;
  }

  if (!pizzaData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="pizza-container">
      {pizzaData.img && <img src={pizzaData.img} alt={pizzaData.name} />}
      <h1>{pizzaData.name}</h1>
      <p>{pizzaData.desc}</p>
      <ul>
        {pizzaData.ingredients?.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Precio: ${pizzaData.price.toLocaleString("es-CL")}</h3>
      <button onClick={() => addItemToCart(pizzaData)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default PizzaDetails;
