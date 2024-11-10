import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Configuracion.module.css';
import contacto from '../Imagenes/contacto.png';
import MenuLateral from '../MenuLateral/MenulLateral';
import Switche from '../Switche/Switche';

const Configuracion = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate('/');
  };

  return (
    <div className={styles.configuracionContainer}>
      <MenuLateral />

      <div className={styles.contenidoContainer}>
        <div className={styles.userSection}>
          <h2>Ajustes</h2>
          <div className={styles.userInfo}>
            <img src={contacto} alt="Icono de usuario" className={styles.userIcon} />
            <p className={styles.userName}>Nombre</p>
          </div>
        </div>

        <div className={styles.notificationsSection}> 
          <h2>Notificaciones</h2> 
          <Switche />
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar Sesion
        </button>
        {/* <button type="button" className={styles.loginButton} onClick={handleLog}></button> */}
      </div>
    </div>
  );
};

export default Configuracion;
