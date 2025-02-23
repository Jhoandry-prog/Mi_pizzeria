import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, total, clearCart } = useCart();
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage({ text: "El carrito está vacío. Agrega productos antes de realizar la compra.", type: "danger" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "¡Compra realizada con éxito! Te redirigiremos pronto.", type: "success" });
        clearCart();
        setTimeout(() => navigate("/"), 3000); // Redirigir después de 5 segundos
      } else {
        setMessage({ text: data.message || "Hubo un problema al procesar la compra.", type: "danger" });
      }
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
      setMessage({ text: "Hubo un error al procesar tu compra. Intenta de nuevo.", type: "danger" });
    }
  };

  return (
    <div className="container my-5">
      <h2>Carrito de Compras</h2>

      {/* MOSTRAR MENSAJE DE EXITO O ERROR */}
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* MOSTRAR LOS PRODUCTOS EN EL CARRITO */}
      <div className="my-3">
        {cart.length > 0 ? (
          cart.map(({ name, quantity, price }, index) => (
            <div key={index} className="d-flex justify-content-between border-bottom py-2">
              <span>{name} x{quantity}</span>
              <span>${(price * quantity).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>

      {/* TOTAL DEL CARRITO */}
      <div className="d-flex justify-content-between my-3">
        <strong>Total: </strong>
        <strong>${total.toFixed(2)}</strong>
      </div>

      {/* Botón de checkout */}
      <button className="btn btn-dark" onClick={handleCheckout}>
        Confirmar
      </button>
    </div>
  );
};

export default Cart;
