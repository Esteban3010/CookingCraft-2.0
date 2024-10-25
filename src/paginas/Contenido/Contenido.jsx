import React, { useState } from 'react';
import styles from './Contenido.module.css';
import contacto from '../Imagenes/contacto.png';
import MenuLateral from '../MenuLateral/MenulLateral';
import multimedia from '../Imagenes/borradorMultimedia.png';
import thumbUp from '../Imagenes/thumb-up.png'; // Imagen del pulgar hacia arriba


const data = [
  {
    nombre: 'Usuario1',
    titulo: 'Titulo 1',
    descripcion: 'Esta es una descripcion del contenido 1.',
  },
  {
    nombre: 'Usuario2',
    titulo: 'Titulo 2',
    descripcion: 'Esta es una descripcion del contenido 2.',
  },
  {
    nombre: 'Usuario3',
    titulo: 'Titulo 3',
    descripcion: 'Esta es una descripcion del contenido 3.',
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
    <div className={styles.contenidoContainer}>
      <MenuLateral/>
      <h1>Contenido</h1>
      {data.map((item, index) => (
        <div className={styles.feedBox} key={index}>
          <div className={styles.contenidoItem}>
            <div className={styles.contenidoHeader}>
              <div className={styles.userInfo}>
                <img src={contacto} alt="Usuario" className={styles.userIcon} />
                <p className={styles.userName}>{item.nombre}</p>
              </div>
              <h3 className={styles.title}>{item.titulo}</h3>
            </div>
            <div className={styles.contenidoMedia}>
              <img src={multimedia} alt="Multimedia" className={styles.mediaImg} />
            </div>
            <div className={styles.contenidoDescription}>
              <p>Descripcion: {item.descripcion}</p>
              <button className={styles.commentButton}onClick={() => toggleComments(index)}>
                 💬
              </button>
            </div>
            {openComments === index &&(
              <div className={styles.commentsSection}>
                <div className={styles.commentBox}>
                  <img src={contacto} alt="Usuario" className={styles.commentUserIcon} />
                  <div className={styles.commentContent}>
                    <p className={styles.commentUser}>@UsuarioRandom</p>
                    <p className={styles.commentText}> Este es un comentario de ejemplo. Que buen contenido!</p>
                    <div className={styles.commentActions}>
                      <button className={`${styles['likeButton']} ${liked[index] ? styles.liked : ''}`} onClick={() => handleLike(index)}>
                        <img src={thumbUp} className={styles.thumbIcon} /> 
                        {liked[index] ? 1 : 0}
                      </button>
                      <button className={styles.replyButton}>Responder</button>
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