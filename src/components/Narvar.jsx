import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import UserContext from "../Context/UserContext";

const Navbarrr = () => {
  const { total } = useCart();
  const { token, logout } = useContext(UserContext);

  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <nav className="navbar">
      <NavLink className={`nav-link ${setActiveClass({ isActive: true })}`} to="/"> Inicio </NavLink>
      
      {token ? (
        <>
          <NavLink className={`nav-link ${setActiveClass({ isActive: true })}`} to="/profile"> Perfil </NavLink>
          <button onClick={logout} className="nav-link logout-button"> Cerrar sesión </button>
        </>
      ) : (
        <>
          <NavLink className={`nav-link ${setActiveClass({ isActive: true })}`}  to="/login"> Ingresar </NavLink>
          <NavLink className={`nav-link ${setActiveClass({ isActive: true })}`} to="/register"> Registro </NavLink>
        </>
      )}
      <NavLink className={`nav-link ${setActiveClass({ isActive: true })}`} to="/cart"> 🛒 Total: ${total.toLocaleString("es-CL")} </NavLink>
    </nav>
  );
};

export default Navbarrr;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const Navbarrr = () => {
//   const { total } = useCart();

//   return (
//     <nav className="navbar">
//       <Link to="/" className="nav-link">Home</Link>
//       <Link to="/register" className="nav-link">Registro</Link>
//       <Link to="/login" className="nav-link">Ingresar</Link>
//       <Link to="/profile" className="nav-link">Perfil</Link>
//       <Link to="/cart" className="nav-link">🛒 Total: ${total.toLocaleString("es-CL")}</Link>
//     </nav>
//   );

// };

// export default Navbarrr;