import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirigir al login si el usuario no está autenticado
  if (!user) {
    navigate("/login");  // Redirige si no hay usuario
    return null;  // Evitar que se renderice el contenido mientras se redirige
  }

  return (
    <div className="profile-page">
      <h2>Mi Perfil</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={logout} className="btn btn-outline-danger">Cerrar sesión</button>
    </div>
  );
};

export default ProfilePage;