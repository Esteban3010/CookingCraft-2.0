import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InicioSesion.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function InicioSesion() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1>Bienvenido de nuevo a<br />CookingCraft</h1>
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Nombre Usuario:" />
          </div>
          <div className="input-group">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Contraseña:" 
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </span>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
            Ingresar
          </button>
        </form>
        <p>
          ¿No tienes cuenta? <Link to="/registrarse" className="register-link">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export default InicioSesion;
