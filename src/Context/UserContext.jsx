import { createContext, useState, useEffect, useContext } from "react";

// Crear el contexto de usuario
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Funcion para hacer login
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setUser({ email });
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  // Función para hacer registro
  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setUser({ email });
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  // Función para hacer logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Función para obtener perfil
  const fetchProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.email) {
        setUser({ email: data.email });
      }
    } catch (error) {
      console.error("Error obteniendo perfil:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);