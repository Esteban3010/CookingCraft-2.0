import React from 'react';
import './Contenido.css';
import MenuLateral from '../MenuLateral/MenulLateral';
import contacto from '../Imagenes/contacto.png';
import multimedia from '../Imagenes/borradorMultimedia.png';

const data = [
  {
    nombre: 'Usuario1',
    titulo: 'Título 1',
    descripcion: 'Esta es una descripción del contenido 1.',
  },
  {
    nombre: 'Usuario2',
    titulo: 'Título 2',
    descripcion: 'Esta es una descripción del contenido 2.',
  },
  {
    nombre: 'Usuario3',
    titulo: 'Título 3',
    descripcion: 'Esta es una descripción del contenido 3.',
  },
];

function Contenido() {
  return (
    <div className="contenido-container">
      <MenuLateral /> {/* Coloca el menú lateral aquí */}
      <h1>Contenido</h1>
      {data.map((item, index) => (
        <div key={index} className="contenido-item">
          <div className="contenido-header">
            <div className="user-info">
              <img src={contacto} alt="Usuario" className="user-icon" />
              <p className="user-name">{item.nombre}</p>
            </div>
            <h3 className="title">{item.titulo}</h3>
          </div>
          <div className="contenido-media">
            <img src={multimedia} alt="Multimedia" className="media-img" />
          </div>
          <div className="contenido-description">
            <p>Descripción: {item.descripcion}</p>
            <button className="comment-button">💬</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contenido;
