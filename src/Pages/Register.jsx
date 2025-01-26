import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {
      username: username.trim() === "",
      password: password.length < 6,
      confirmPassword: password !== confirmPassword,
    };

    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
    } else {
      setValidationErrors({ username: false, password: false, confirmPassword: false });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setIsRegistered(true);
    }
  };

  return (
    <div className="signup-container">
      <header>
        <div className="header-content">
          <Link to='/' className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </Link>
          {isRegistered ? (
            <div className="success-message">
              <FontAwesomeIcon icon={faCircleCheck} className="icon-success" />
              <h2>¡Registro exitoso! <br />
                <span>Tu próxima degustación comienza aquí.</span>
              </h2>
            </div>
          ) : (
            <div className="form-wrapper">
              <h2>Únete a <span>Pizza Express</span></h2>
              <form onSubmit={handleFormSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {validationErrors.username && (
                    <p className="error-message">
                      <FontAwesomeIcon icon={faCircleExclamation} /> El nombre no puede estar vacío
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationErrors.password && (
                    <p className="error-message">
                      <FontAwesomeIcon icon={faCircleExclamation} /> La contraseña debe tener al menos 6 caracteres
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {validationErrors.confirmPassword && (
                    <p className="error-message">
                      <FontAwesomeIcon icon={faCircleExclamation} /> Las contraseñas no coinciden
                    </p>
                  )}
                </div>
                <button type="submit" className="submit-button">Registrar</button>
              </form>
            </div>
          )}
        </div>
        {screenWidth > 768 && <img src="/imgs/Header_Responsive.jpeg" alt="Pizza Header" className="header-image" />}
      </header>
    </div>
  );
};

export default SignUp;
