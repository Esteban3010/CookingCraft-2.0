import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import styles from './Registrarse.module.css';
=======
import './Registrarse.css';
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff

function Registrarse() {
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleRegister = () => {
    setMensajeExito(true);
  };

  const closeModal = () => {
    setMensajeExito(false);
  };

  return (
<<<<<<< HEAD
    <div className={styles.registerContainer}>
      <h1>Bienvenido a CookingCraft</h1>
      <div className={styles.registerBox}>
        <h2>Registrarse</h2>
        <form>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Nombre Usuario:" />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Correo:" />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Contraseña:" />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Confirmar Contraseña:" />
          </div>
          <button type="button" className={styles.registerButton} onClick={handleRegister}>
=======
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
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
            Registrar
          </button>
        </form>
        <p>
<<<<<<< HEAD
          ¿Ya tienes cuenta? <Link to="/" className={styles.loginLink}>Iniciar Sesion</Link>
        </p>
      </div>
      {mensajeExito && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeX} onClick={closeModal}>×</button>
            <h3>¡Registro exitoso!</h3>
            <p>Ahora puedes <Link to="/" className={styles.loginLink}>Iniciar Sesion</Link>.</p>
=======
          ¿Ya tienes cuenta? <Link to="/" className="login-link">Iniciar Sesion</Link>
        </p>
      </div>

      {mensajeExito && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={closeModal}>×</button>
            <h3>¡Registro exitoso!</h3>
            <p>Ahora puedes <Link to="/" className="login-link">Iniciar Sesion</Link>.</p>
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
          </div>
        </div>
      )}
    </div>
  );
}

export default Registrarse;
