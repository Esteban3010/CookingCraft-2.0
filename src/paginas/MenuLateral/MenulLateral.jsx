import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuLateral.module.css';
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
      <button className={styles.menuButton} onClick={toggleMenu}>
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
