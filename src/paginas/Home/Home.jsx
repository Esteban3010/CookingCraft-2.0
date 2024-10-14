import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import cocinero from '../Imagenes/cocinero.png';
import gorro from '../Imagenes/gorro.png';
import mensaje from '../Imagenes/mensaje.png';

function Home() {
  return (
    <div className="home-container">
      <h1>Cooking<br />Craft</h1>
      <div className="icon-container">
        <Link to="/aspirantes">
          <img src={cocinero} alt="Cocinero" className="icon-button" data-texto="Aspirantes" />
          <p>Aspirantes</p>
        </Link>
        <Link to="/contenido">
          <img src={gorro} alt="Gorro de Chef" className="icon-button" data-texto="Contenido" />
          <p>Feed</p>
        </Link>
        <Link to="/mensajes">
          <img src={mensaje} alt="Mensaje" className="icon-button" data-texto="Mensajes" />
          <p>Chat</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
