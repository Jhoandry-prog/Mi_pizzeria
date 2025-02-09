import React from "react";
import { useShoppingCart } from "../context/CartContext";
import { useAuth } from "../context/UserContext";

const ShoppingCart = () => {
  const { cartItems, modifyQuantity, totalAmount } = useShoppingCart();
  const { isAuthenticated } = useAuth();

  return (
    <div className="cart-container">
      <h3>Resumen de tu compra:</h3>
      <div className="cart-items">
        {cartItems.map(({ id, img, name, price, quantity }) => (
          <div key={id} className="cart-item">
            <img src={img} alt={name} className="cart-item-img" />

            <div className="cart-item-details">
              <span className="cart-item-name">{name}</span>
              <span className="cart-item-price">${price.toLocaleString("es-CL")}</span>
            </div>

            <div className="cart-item-controls">
              <button onClick={() => modifyQuantity(id, -1)} className="decrease-button">
                -
              </button>
              <span className="cart-item-quantity">{quantity}</span>
              <button onClick={() => modifyQuantity(id, 1)} className="increase-button">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">Total: ${totalAmount.toLocaleString("es-CL")}</div>
      <button className="checkout-button" disabled={!isAuthenticated}>
        {isAuthenticated ? "Finalizar Compra" : "Inicia sesión para comprar"}
      </button>
    </div>
  );
};

export default ShoppingCart;