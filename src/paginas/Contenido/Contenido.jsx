import React, { useState } from 'react';
import './Contenido.css';
import contacto from '../Imagenes/contacto.png';
import MenuLateral from '../MenuLateral/MenulLateral';
import multimedia from '../Imagenes/borradorMultimedia.png';
import thumbUp from '../Imagenes/thumb-up.png'; // Imagen del pulgar hacia arriba

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
  const [openComments, setOpenComments] = useState(null);
  const [liked, setLiked] = useState(Array(data.length).fill(false));

  const toggleComments = (index) => {
    setOpenComments(openComments === index ? null : index);
  };

  const handleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  return (
    <div className="contenido-container">
      <MenuLateral />
      <h1>Contenido</h1>
      {data.map((item, index) => (
        <div className="feed-box" key={index}>
          <div className="contenido-item">
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
              <button
                className="comment-button"
                onClick={() => toggleComments(index)}
              >
                💬
              </button>
            </div>

            {openComments === index && (
              <div className="comments-section">
                <div className="comment-box">
                  <img src={contacto} alt="Usuario" className="comment-user-icon" />
                  <div className="comment-content">
                    <p className="comment-user">@UsuarioRandom</p>
                    <p className="comment-text">
                      Este es un comentario de ejemplo. ¡Qué buen contenido!
                    </p>
                    <div className="comment-actions">
                      <button
                        className={`like-button ${liked[index] ? 'liked' : ''}`}
                        onClick={() => handleLike(index)}
                      >
                        <img src={thumbUp} alt="like" className="thumb-icon" />
                        {liked[index] ? 1 : 0}
                      </button>
                      <button className="reply-button">Responder</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contenido;
