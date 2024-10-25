import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Registrarse.module.css';

function Registrarse() {
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleRegister = () => {
    setMensajeExito(true);
  };

  const closeModal = () => {
    setMensajeExito(false);
  };

  return (
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
            Registrar
          </button>
        </form>
        <p>
          ¿Ya tienes cuenta? <Link to="/" className={styles.loginLink}>Iniciar Sesion</Link>
        </p>
      </div>
      {mensajeExito && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeX} onClick={closeModal}>×</button>
            <h3>¡Registro exitoso!</h3>
            <p>Ahora puedes <Link to="/" className={styles.loginLink}>Iniciar Sesion</Link>.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registrarse;
