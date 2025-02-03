import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartTotal } = useCart();
  const displayTotal = cartTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-light">
      <div className="container-fluid">
        {/* LOGO */}
        <Link to="/" className="navbar-brand">🍕 La Pizza Loca</Link>

        {/* BOTON PARA USO MOVIL*/}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENÚ DE NAVEGACIÓN */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">🏡 Inicio</Link>
            </li>
            {!userLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">📋 Registrarse</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">🔐 Iniciar sesión</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">🙍‍♂️ Mi Cuenta</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={() => setUserLoggedIn(false)}>Salir</button>
                </li>
              </>
            )}
          </ul>

          {/* CARRITO */}
          <Link to="/cart" className="btn btn-outline-warning">
            🛒 Total: {displayTotal}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
