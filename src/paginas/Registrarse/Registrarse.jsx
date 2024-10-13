import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registrarse.css';

function Registrarse() {
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleRegister = () => {
    setMensajeExito(true);
  };

  const closeModal = () => {
    setMensajeExito(false);
  };

  return (
    <div className="register-container">
      <h1>Bienvenido a CookingCraft</h1>
      <div className="register-box">
        <h2>Registrarse</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Nombre Usuario:" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Correo:" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Contraseña:" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Confirmar Contraseña:" />
          </div>
          <button type="button" className="register-button" onClick={handleRegister}>
            Registrar
          </button>
        </form>
        <p>
          ¿Ya tienes cuenta? <Link to="/" className="login-link">Iniciar Sesion</Link>
        </p>
      </div>

      {mensajeExito && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={closeModal}>×</button>
            <h3>¡Registro exitoso!</h3>
            <p>Ahora puedes <Link to="/" className="login-link">Iniciar Sesion</Link>.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registrarse;
