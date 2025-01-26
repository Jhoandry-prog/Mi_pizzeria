import React, { useEffect, useState } from 'react'
import CardPizza from '../components/CardPizza';

const Pizza = () => {


  const [descripcion, setDescripcion] = useState({})
  const [isLoading, setIsLoading] = useState(true);


  const getDescripcion = async () => {
    const response = await fetch("http://localhost:5000/api/pizzas/p001");
    const data = await response.json();
    console.log(data);
    setDescripcion(data);
    setIsLoading(false);

  };

  useEffect(() => {
    getDescripcion();
  }, []);

  return (
    <>
      {isLoading ? (<p>Cargando...</p>) : (
        
        <CardPizza
          name={descripcion.name}
          price={descripcion.price.toLocaleString('de-DE')}
          ingredients={descripcion.ingredients}
          img={`/imgs/${descripcion.name}.jpeg`}
          descripcion={descripcion.desc}
          key={descripcion.id}
        />
      )}

    </>
  )
}

export default Pizza