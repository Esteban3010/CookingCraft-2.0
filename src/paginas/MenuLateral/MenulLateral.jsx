import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuLateral.css';
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
      <div className="menu-button" onClick={toggleMenu}>
        <img src={menuBarritas} alt="Menu" className="menu-icon" />
      </div>
      <div className={`menu-lateral ${menuAbierto ? 'abierto' : ''}`}>
        <ul>
          <li>
            <Link to="/contenido" className="menu-item">
              <img src={gorro} alt="feed" />
              <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link to="/aspirantes" className="menu-item">
              <img src={cocinero} alt="aspirantes" />
              <span>Aspirantes</span>
            </Link>
          </li>
          <li>
            <Link to="/mensajes" className="menu-item">
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
