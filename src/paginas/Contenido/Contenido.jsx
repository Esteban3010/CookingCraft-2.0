import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import styles from './Contenido.module.css';
import contacto from '../Imagenes/contacto.png';
import MenuLateral from '../MenuLateral/MenulLateral';
import thumbUp from '../Imagenes/thumb-up.png';

function Contenido({ nombreUsuario }) {  // Recibe nombreUsuario como prop
  const [contenido, setContenido] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [likedComments, setLikedComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerContenido = async () => {
      const contenidoCollection = collection(db, 'contenido');
      const contenidoSnapshot = await getDocs(contenidoCollection);
      const contenidoData = contenidoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContenido(contenidoData);
    };

    obtenerContenido();
  }, []);

  const toggleComments = (index) => {
    setOpenComments(openComments === index ? null : index);
    setNewComment('');
  };

  const handleSubirClick = () => {
    navigate('/subircontenido');
  };

  const addComment = async (postId) => {
    if (newComment.trim()) {
      const postRef = doc(db, 'contenido', postId);
      await updateDoc(postRef, {
        comentarios: arrayUnion({
          usuario: nombreUsuario,  // Usa nombreUsuario del usuario actual
          texto: newComment,
          likes: 0,
        })
      });
      setNewComment('');
      const contenidoCollection = collection(db, 'contenido');
      const contenidoSnapshot = await getDocs(contenidoCollection);
      const contenidoData = contenidoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContenido(contenidoData);
    }
  };

  const toggleLike = async (postId, commentIndex) => {
    const postRef = doc(db, 'contenido', postId);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();

    const updatedComments = postData.comentarios.map((comentario, index) => {
      if (index === commentIndex) {
        const isLiked = likedComments[`${postId}-${commentIndex}`];
        return { ...comentario, likes: isLiked ? (comentario.likes || 0) - 1 : (comentario.likes || 0) + 1 };
      }
      return comentario;
    });

    await updateDoc(postRef, { comentarios: updatedComments });
    
    setLikedComments((prev) => ({
      ...prev,
      [`${postId}-${commentIndex}`]: !prev[`${postId}-${commentIndex}`],
    }));

    setContenido((prevContenido) =>
      prevContenido.map((item) => 
        item.id === postId ? { ...item, comentarios: updatedComments } : item
      )
    );
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
                  {item.comentarios?.map((comentario, i) => (
                    <div className={styles.commentBox} key={i}>
                      <img src={contacto} alt="Usuario" className={styles.commentUserIcon} />
                      <div className={styles.commentContent}>
                        <p className={styles.commentUser}>@{comentario.usuario}</p>
                        <p className={styles.commentText}>{comentario.texto}</p>
                        <div className={styles.commentActions}>
                          <button
                            className={`${styles.likeButton} ${
                              likedComments[`${item.id}-${i}`] ? styles.liked : ''
                            }`}
                            onClick={() => toggleLike(item.id, i)}
                          >
                            <img src={thumbUp} className={styles.thumbIcon} alt="Like" />
                            {comentario.likes || 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={styles.commentInputContainer}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribe un comentario"
                      className={styles.commentInput}
                    />
                    <button onClick={() => addComment(item.id)} className={styles.commentButton}>
                      Enviar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No hay contenido disponible.</p>
      )}

      <button className={styles.subirButton} onClick={handleSubirClick}>
        Subir
      </button>
    </div>
  );
}

export default Contenido;
