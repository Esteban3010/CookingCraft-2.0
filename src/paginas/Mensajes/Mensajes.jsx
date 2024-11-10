
// import React from 'react';
// import styles from './Mensajes.module.css';
// import MenuLateral from '../MenuLateral/MenulLateral';

// import contacto from '../Imagenes/contacto.png';

// const ChatList = () => {
//   const chats = [
//     { id: 1, name: 'Nombre 1' },
//     { id: 2, name: 'Nombre 2' },
//     { id: 3, name: 'Nombre 3' },
//     { id: 4, name: 'Nombre 4' },
//     { id: 5, name: 'm' },
//     { id: 6, name: 'n' },
//     { id: 7, name: 'o' },
//     { id: 8, name: 'p' },
//   ];

//   return (
//     <div className={styles.container}>
//       <MenuLateral />
//       <h1 className={styles.title}>Chats</h1>
//       <ul className={styles.chatList}>
//         {chats.map((chat) => (
//           <li key={chat.id} className={styles.chatItem}>
//             <div className={styles.chatContent}>
//               <img src={contacto} alt="Profile" className={styles.profilePic} />
//               <span className={styles.name}>{chat.name}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// funcional

// import React, { useState, useEffect } from 'react';
// import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
// import styles from './Mensajes.module.css';

// // Configuración de Firestore
// const db = getFirestore();

// const Mensajes = ({ nombreUsuario }) => { // Recibe nombreUsuario como prop
//   console.log("Nombre de usuario recibido en Mensajes:", nombreUsuario);
//   const [mensajes, setMensajes] = useState([]);
//   const [nuevoMensaje, setNuevoMensaje] = useState('');

//   useEffect(() => {
//     // Escucha los mensajes en tiempo real
//     const q = query(collection(db, 'mensajes'), orderBy('timestamp'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMensajes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//     return () => unsubscribe();
//   }, []);

//   const enviarMensaje = async () => {
//     if (nuevoMensaje.trim()) {
//       await addDoc(collection(db, 'mensajes'), {
//         usuario: nombreUsuario,
//         texto: nuevoMensaje,
//         timestamp: new Date()
//       });
//       setNuevoMensaje(''); // Limpia el campo de entrada después de enviar
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.mensajes}>
//         {mensajes.map((msg) => (
//           <div key={msg.id} className={styles.mensaje}>
//             <strong>{msg.usuario}: </strong>{msg.texto}
//           </div>
//         ))}
//       </div>
//       <input
//         value={nuevoMensaje}
//         onChange={(e) => setNuevoMensaje(e.target.value)}
//         placeholder="Escribe un mensaje"
//       />
//       <button onClick={enviarMensaje}>Enviar</button>
//     </div>
//   );
// };

// export default Mensajes;


import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import styles from './Mensajes.module.css';

const db = getFirestore();

const Mensajes = ({ nombreUsuario }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [destinatario, setDestinatario] = useState(''); // El nombre del usuario con el que quieres chatear

  useEffect(() => {
    if (nombreUsuario && destinatario) {
      // Consulta para obtener mensajes entre el usuario actual y el destinatario
      const q = query(
        collection(db, 'mensajes'),
        where('usuarios', 'array-contains', nombreUsuario),
        orderBy('timestamp')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const mensajesFiltrados = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(msg => msg.usuarios.includes(destinatario)); // Filtra para mostrar solo mensajes de la conversación entre ambos usuarios

        setMensajes(mensajesFiltrados);
      });

      return () => unsubscribe();
    }
  }, [nombreUsuario, destinatario]);

  const enviarMensaje = async () => {
    if (nuevoMensaje.trim() && destinatario) {
      await addDoc(collection(db, 'mensajes'), {
        texto: nuevoMensaje,
        timestamp: new Date(),
        usuarios: [nombreUsuario, destinatario], // Incluye ambos usuarios en el mensaje
        de: nombreUsuario, // Remitente
        para: destinatario  // Destinatario
      });
      setNuevoMensaje('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.mensajes}>
        {mensajes.map((msg) => (
          <div key={msg.id} className={styles.mensaje}>
            <strong>{msg.de}: </strong>{msg.texto}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Destinatario"
        value={destinatario}
        onChange={(e) => setDestinatario(e.target.value)}
      />
      <input
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder="Escribe un mensaje"
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default Mensajes;
