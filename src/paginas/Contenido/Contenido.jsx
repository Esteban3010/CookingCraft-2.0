import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import styles from './Contenido.module.css';
import contacto from '../Imagenes/contacto.png';
import MenuLateral from '../MenuLateral/MenulLateral';
import thumbUp from '../Imagenes/thumb-up.png';

function Contenido() {
  const [contenido, setContenido] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [liked, setLiked] = useState([]);
  const navigate = useNavigate();

  // Cargar contenido desde Firestore
  useEffect(() => {
    const obtenerContenido = async () => {
      const contenidoCollection = collection(db, 'contenido');
      const contenidoSnapshot = await getDocs(contenidoCollection);
      const contenidoData = contenidoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContenido(contenidoData);
      setLiked(Array(contenidoData.length).fill(false));
    };

    obtenerContenido();
  }, []);

  const toggleComments = (index) => {
    setOpenComments(openComments === index ? null : index);
  };

  const handleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  const handleSubirClick = () => {
    navigate('/subircontenido');
  };

  return (
    <div className={styles.contenidoContainer}>
      <MenuLateral />
      <h1>Contenido</h1>
      {contenido.length > 0 ? (
        contenido.map((item, index) => (
          <div className={styles.feedBox} key={item.id}>
            <div className={styles.contenidoItem}>
              <div className={styles.contenidoHeader}>
                <div className={styles.userInfo}>
                  <img src={contacto} alt="Usuario" className={styles.userIcon} />
                  <p className={styles.userName}>{item.usuario || 'Usuario'}</p>
                </div>
                <h3 className={styles.title}>{item.titulo || 'Título'}</h3>
              </div>
              <div className={styles.contenidoMedia}>
                {item.mediaUrl ? (
                  <img src={item.mediaUrl} alt="Contenido" className={styles.mediaImg} />
                ) : (
                  <p>Sin multimedia</p>
                )}
              </div>
              <div className={styles.contenidoDescription}>
                <p>Descripcion: {item.descripcion || 'Sin descripción disponible.'}</p>
                <button className={styles.commentButton} onClick={() => toggleComments(index)}>
                  💬
                </button>
              </div>
              {openComments === index && (
                <div className={styles.commentsSection}>
                  <div className={styles.commentBox}>
                    <img src={contacto} alt="Usuario" className={styles.commentUserIcon} />
                    <div className={styles.commentContent}>
                      <p className={styles.commentUser}>@UsuarioRandom</p>
                      <p className={styles.commentText}>¡Qué buen contenido!</p>
                      <div className={styles.commentActions}>
                        <button
                          className={`${styles['likeButton']} ${liked[index] ? styles.liked : ''}`}
                          onClick={() => handleLike(index)}
                        >
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
        ))
      ) : (
        <p>No hay contenido disponible.</p>
      )}

      {/* Botón de "Subir" en la esquina inferior izquierda */}
      <button className={styles.subirButton} onClick={handleSubirClick}>
        Subir
      </button>
    </div>
  );
}

export default Contenido;
