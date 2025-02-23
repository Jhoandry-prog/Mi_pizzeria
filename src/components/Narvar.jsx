import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/UserContext"; 

const Navbar = () => {
  const { total, cart } = useCart(); 
  const { token, logout } = useAuth(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">🍕 Pizzería Mamma Mia!</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">🏠 Home</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">👤 Profile</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={logout}
                    aria-label="Logout"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">📝 Register</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">🔑 Login</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {cart.length > 0 && (
              <Link to="/cart" className="btn btn-outline-info text-info border-info" aria-label="Go to cart">
                🛒 Total: ${total.toLocaleString()}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
