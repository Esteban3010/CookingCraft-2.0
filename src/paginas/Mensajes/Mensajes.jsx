
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
// import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore';
// import styles from './Mensajes.module.css';

// const db = getFirestore();

// const Mensajes = ({ nombreUsuario }) => {
//   const [mensajes, setMensajes] = useState([]);
//   const [nuevoMensaje, setNuevoMensaje] = useState('');
//   const [destinatario, setDestinatario] = useState('');
//   const [usuarios, setUsuarios] = useState([]);
//   const [idUsuarioActual, setIdUsuarioActual] = useState('');
//   const [idDestinatario, setIdDestinatario] = useState('');

//   // Obtener la lista de usuarios y el ID del usuario actual al cargar el componente
//   useEffect(() => {
//     const obtenerUsuarios = async () => {
//       try {
//         const usuariosSnapshot = await getDocs(collection(db, 'usuarios'));
//         const listaUsuarios = usuariosSnapshot.docs.map(doc => {
//           const data = doc.data();
//           if (data.nombreUsuario === nombreUsuario) {
//             setIdUsuarioActual(doc.id); // Almacena el ID del usuario actual
//           }
//           return {
//             id: doc.id,
//             nombre: data.nombreUsuario
//           };
//         }).filter(usuario => usuario.nombre !== nombreUsuario); // Excluir el usuario actual

//         setUsuarios(listaUsuarios);
//       } catch (error) {
//         console.error("Error al obtener usuarios:", error);
//       }
//     };

//     obtenerUsuarios();
//   }, [nombreUsuario]);

//   // Configurar la suscripción a mensajes entre el usuario actual y el destinatario seleccionado
//   useEffect(() => {
//     if (idUsuarioActual && idDestinatario) {
//       const q = query(
//         collection(db, 'mensajes'),
//         where('usuarios', 'array-contains', idUsuarioActual),
//         orderBy('timestamp')
//       );

//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const mensajesFiltrados = snapshot.docs
//           .map(doc => ({ id: doc.id, ...doc.data() }))
//           .filter(msg => msg.usuarios.includes(idDestinatario)); // Filtrar solo los mensajes entre ambos IDs

//         setMensajes(mensajesFiltrados);
//       });

//       return () => unsubscribe();
//     }
//   }, [idUsuarioActual, idDestinatario]);

//   // Actualizar el destinatario y su ID cuando se selecciona uno
//   const seleccionarDestinatario = (e) => {
//     const seleccionado = e.target.value;
//     setDestinatario(seleccionado);
//     const usuario = usuarios.find(u => u.nombre === seleccionado);
//     if (usuario) {
//       setIdDestinatario(usuario.id); // Almacenar el ID del destinatario seleccionado
//     }
//   };

//   // Función para enviar mensaje
//   const enviarMensaje = async () => {
//     if (nuevoMensaje.trim() && idDestinatario) {
//       try {
//         await addDoc(collection(db, 'mensajes'), {
//           texto: nuevoMensaje,
//           timestamp: new Date(),
//           usuarios: [idUsuarioActual, idDestinatario].sort(), // Usar IDs para consistencia
//           de: nombreUsuario,
//           para: destinatario,
//         });
//         setNuevoMensaje('');
//       } catch (error) {
//         console.error("Error al enviar mensaje:", error);
//       }
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.mensajes}>
//         {mensajes.map((msg) => (
//           <div key={msg.id} className={styles.mensaje}>
//             <strong>{msg.de}: </strong>{msg.texto}
//           </div>
//         ))}
//       </div>
//       {/* Selector de destinatario */}
//       <select value={destinatario} onChange={seleccionarDestinatario}>
//         <option value="">Selecciona un destinatario</option>
//         {usuarios.map((usuario) => (
//           <option key={usuario.id} value={usuario.nombre}>
//             {usuario.nombre}
//           </option>
//         ))}
//       </select>
//       {/* Campo de texto para el mensaje */}
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
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore';
import styles from './Mensajes.module.css';

const db = getFirestore();

const Mensajes = ({ nombreUsuario }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioActual, setIdUsuarioActual] = useState('');
  const [idDestinatario, setIdDestinatario] = useState('');

  // Obtener la lista de usuarios y el ID del usuario actual al cargar el componente
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const usuariosSnapshot = await getDocs(collection(db, 'usuarios'));
        const listaUsuarios = usuariosSnapshot.docs.map(doc => {
          const data = doc.data();
          if (data.nombreUsuario === nombreUsuario) {
            setIdUsuarioActual(doc.id); // Almacena el ID del usuario actual
          }
          return {
            id: doc.id,
            nombre: data.nombreUsuario
          };
        }).filter(usuario => usuario.nombre !== nombreUsuario); // Excluir el usuario actual

        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, [nombreUsuario]);

  // Configurar la suscripción a mensajes entre el usuario actual y el destinatario seleccionado
  useEffect(() => {
    if (idUsuarioActual && idDestinatario) {
      // Generar un chatID único y consistente
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

  // Actualizar el destinatario y su ID cuando se selecciona uno
  const seleccionarDestinatario = (e) => {
    const seleccionado = e.target.value;
    setDestinatario(seleccionado);
    const usuario = usuarios.find(u => u.nombre === seleccionado);
    if (usuario) {
      setIdDestinatario(usuario.id); // Almacenar el ID del destinatario seleccionado
    }
  };

  // Función para enviar mensaje
  const enviarMensaje = async () => {
    if (nuevoMensaje.trim() && idDestinatario) {
      try {
        // Generar un chatID único y consistente
        const chatID = [idUsuarioActual, idDestinatario].sort().join('_');

        await addDoc(collection(db, 'mensajes'), {
          texto: nuevoMensaje,
          timestamp: new Date(),
          usuarios: [idUsuarioActual, idDestinatario].sort(), // Usar IDs para consistencia
          de: nombreUsuario,
          para: destinatario,
          chatID: chatID, // Agregar el chatID al documento
        });
        setNuevoMensaje('');
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
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
      {/* Selector de destinatario */}
      <select value={destinatario} onChange={seleccionarDestinatario}>
        <option value="">Selecciona un destinatario</option>
        {usuarios.map((usuario) => (
          <option key={usuario.id} value={usuario.nombre}>
            {usuario.nombre}
          </option>
        ))}
      </select>
      {/* Campo de texto para el mensaje */}
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
