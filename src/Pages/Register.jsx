import React, { useState } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el cargando

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los datos del formulario
    if (!email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(""); // Limpiar posibles errores previos
    setLoading(true); // Activar el estado de carga

    try {
      await register(email, password); // Llamar a la función de registro del contexto
      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => {
        navigate("/login"); // Redirigir al login después del registro
      }, 2000);
    } catch (err) {
      setError("Error al registrar. Intenta nuevamente.");
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="container w-50 mx-auto mt-5">
      <form onSubmit={handleSubmit} className="rounded p-4 border shadow">
        <h2 className="text-start mb-4">Registro</h2>

        {/* Mensajes de error o éxito */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Campo de correo */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-3">
          <label className="form-label">Repetir Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Botón para crear cuenta */}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
