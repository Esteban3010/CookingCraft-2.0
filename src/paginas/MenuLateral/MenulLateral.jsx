import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../app/menuSlice';
import { Link } from 'react-router-dom';
import styles from './MenuLateral.module.css';
import gorro from '../Imagenes/gorro.png';
import cocinero from '../Imagenes/cocinero.png';
import mensaje from '../Imagenes/mensaje.png';
import menuBarritas from '../Imagenes/menuBarritas.png';

function MenuLateral() {
  const dispatch = useDispatch();
  const menuAbierto = useSelector((state) => state.menu.abierto);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div>
      <button className={styles.menuButton} onClick={toggleMenuHandler}>
        <img src={menuBarritas} alt="Menu" className={styles.menuIcon} />
      </button>
      <div className={`${styles['menuLateral']} ${menuAbierto ? styles.abierto : ''}`}>
        <ul>
          <li>
            <Link to="/contenido" className={styles.menuItem}>
              <img src={gorro} alt="feed" />
              <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link to="/recomendados" className={styles.menuItem}>
              <img src={cocinero} alt="aspirantes" />
              <span>Recomendados</span>
            </Link>
          </li>
          <li>
            <Link to="/mensajes" className={styles.menuItem}>
              <img src={mensaje} alt="Chat" />
              <span>Chat</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuLateral;