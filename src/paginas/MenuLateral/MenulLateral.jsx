import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import styles from './MenuLateral.module.css';
=======
import './MenuLateral.css';
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
import gorro from '../Imagenes/gorro.png';
import cocinero from '../Imagenes/cocinero.png';
import mensaje from '../Imagenes/mensaje.png';
import menuBarritas from '../Imagenes/menuBarritas.png';

function MenuLateral() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div>
      {/* Por preguntar si se puede dejar ese div o si se deja button (recuadro blanco del boton) */}
<<<<<<< HEAD
      <button className={styles.menuButton} onClick={toggleMenu}>
        <img src={menuBarritas} alt="Menu" className={styles.menuIcon} />
      </button>
      <div className={`${styles['menuLateral']} ${menuAbierto ? styles.abierto : ''}`}>
        <ul>
          <li>
            <Link to="/contenido" className={styles.menuItem}>
=======
      <button className="menu-button" onClick={toggleMenu}>
        <img src={menuBarritas} alt="Menu" className="menu-icon" />
      </button>
      <div className={`menu-lateral ${menuAbierto ? 'abierto' : ''}`}>
        <ul>
          <li>
            <Link to="/contenido" className="menu-item">
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
              <img src={gorro} alt="feed" />
              <span>Feed</span>
            </Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link to="/recomendados" className={styles.menuItem}>
=======
            <Link to="/recomendados" className="menu-item">
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
              <img src={cocinero} alt="aspirantes" />
              <span>Recomendados</span>
            </Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link to="/mensajes" className={styles.menuItem}>
=======
            <Link to="/mensajes" className="menu-item">
>>>>>>> 504f31236210df7a887e7746f3a43eacf20c7cff
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
