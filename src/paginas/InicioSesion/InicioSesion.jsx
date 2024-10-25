import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import styles from './InicioSesion.module.css';
=======
import './InicioSesion.css';
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
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
<<<<<<< HEAD
    <div className={styles.loginContainer}>
      <h1>Bienvenido de nuevo a<br />CookingCraft</h1>
      <div className={styles.loginBox}>
        <h2>Iniciar sesión</h2>
        <form>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Nombre Usuario:" />
          </div>
          <div className={styles.inputGroup}>
=======
    <div className="login-container">
      <h1>Bienvenido de nuevo a<br />CookingCraft</h1>
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Nombre Usuario:" />
          </div>
          <div className="input-group">
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Contraseña:" 
            />
<<<<<<< HEAD
            <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
              <i className={`${styles['fas']} ${showPassword ? styles['faEyeSlash'] 
              : styles['faEye']}`}
              ></i>
            </span>
          </div>
          <button type="button" className={styles.loginButton} onClick={handleLogin}>
=======
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </span>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
            Ingresar
          </button>
        </form>
        <p>
<<<<<<< HEAD
          ¿No tienes cuenta? <Link to="/registrarse" className={styles.registerLink}>Registrarse</Link>
=======
          ¿No tienes cuenta? <Link to="/registrarse" className="register-link">Registrarse</Link>
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
        </p>
      </div>
    </div>
  );
}

export default InicioSesion;
