import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './InicioSesion.module.css';
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
    <div className={styles.loginContainer}>
      <h1>Bienvenido de nuevo a<br />CookingCraft</h1>
      <div className={styles.loginBox}>
        <h2>Iniciar sesión</h2>
        <form>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Nombre Usuario:" />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Contraseña:" 
            />
            <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
              <i className={`${styles['fas']} ${showPassword ? styles['faEyeSlash'] 
              : styles['faEye']}`}
              ></i>
            </span>
          </div>
          <button type="button" className={styles.loginButton} onClick={handleLogin}>
            Ingresar
          </button>
        </form>
        <p>
          ¿No tienes cuenta? <Link to="/registrarse" className={styles.registerLink}>Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export default InicioSesion;
