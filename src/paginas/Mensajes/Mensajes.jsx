import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore';
import styles from './Mensajes.module.css';
import MenuLateral from '../MenuLateral/MenulLateral';

const db = getFirestore();

const Mensajes = ({ nombreUsuario }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioActual, setIdUsuarioActual] = useState('');
  const [idDestinatario, setIdDestinatario] = useState('');

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const usuariosSnapshot = await getDocs(collection(db, 'usuarios'));
        const listaUsuarios = usuariosSnapshot.docs.map(doc => {
          const data = doc.data();
          if (data.nombreUsuario === nombreUsuario) {
            setIdUsuarioActual(doc.id);
          }
          return {
            id: doc.id,
            nombre: data.nombreUsuario
          };
        }).filter(usuario => usuario.nombre !== nombreUsuario);

        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, [nombreUsuario]);

  useEffect(() => {
    if (idUsuarioActual && idDestinatario) {
      const chatID = [idUsuarioActual, idDestinatario].sort().join('_');

      const q = query(
        collection(db, 'mensajes'),
        where('chatID', '==', chatID),
        orderBy('timestamp')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const mensajes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMensajes(mensajes);
      });

      return () => unsubscribe();
    }
  }, [idUsuarioActual, idDestinatario]);

  const seleccionarDestinatario = (e) => {
    const seleccionado = e.target.value;
    setDestinatario(seleccionado);
    const usuario = usuarios.find(u => u.nombre === seleccionado);
    if (usuario) {
      setIdDestinatario(usuario.id);
    }
  };

  const enviarMensaje = async () => {
    if (nuevoMensaje.trim() && idDestinatario) {
      try {
        const chatID = [idUsuarioActual, idDestinatario].sort().join('_');

        await addDoc(collection(db, 'mensajes'), {
          texto: nuevoMensaje,
          timestamp: new Date(),
          usuarios: [idUsuarioActual, idDestinatario].sort(),
          de: nombreUsuario,
          para: destinatario,
          chatID: chatID,
        });
        setNuevoMensaje('');
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    }
  };

  return (
    <div>
      {/* Selector de destinatario fuera del contenedor de mensajes */}
      <div className={styles.selectContainer}>
        <select value={destinatario} onChange={seleccionarDestinatario}>
          <option value="">Selecciona un destinatario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.nombre}>
              {usuario.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.chatContainer}>
        <MenuLateral />

        {/* Contenedor de mensajes */}
        <div className={styles.mensajes}>
          {mensajes.map((msg) => (
            <div key={msg.id} className={styles.mensaje}>
              <strong>{msg.de}: </strong>{msg.texto}
            </div>
          ))}
        </div>

        {/* Campo de entrada de mensaje dentro del contenedor de mensajes */}
        <div className={styles.messageInputContainer}>
          <input
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje"
            type="text"
          />
          <button onClick={enviarMensaje}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
