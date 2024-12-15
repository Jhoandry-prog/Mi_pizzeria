const CardPizza = ({ name, price, ingredients, img }) => {
    return (
      <div className="col-md-4">
        <div className="card mb-4">
          <img src={img} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              <strong>Ingredientes:</strong> {ingredients.join(", ")}
            </p>
            <p className="card-text">
              <strong>Precio:</strong> ${price.toLocaleString()}
            </p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary">Ver Más</button>
              <button className="btn btn-success">Añadir</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardPizza;