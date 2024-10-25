import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import cocinero from '../Imagenes/cocinero.png';
import gorro from '../Imagenes/gorro.png';
import mensaje from '../Imagenes/mensaje.png';

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1>Cooking<br />Craft</h1>
      <div className={styles.iconContainer}>
        <Link to="/recomendados">
          <img src={cocinero} alt="Cocinero" className={styles.iconButton} data-texto="Aspirantes" />
          <p>Recomendados</p>
        </Link>
        <Link to="/contenido">
          <img src={gorro} alt="Gorro de Chef" className={styles.iconButton} data-texto="Contenido" />
          <p>Feed</p>
        </Link>
        <Link to="/mensajes">
          <img src={mensaje} alt="Mensaje" className={styles.iconButton} data-texto="Mensajes" />
          <p>Chat</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
