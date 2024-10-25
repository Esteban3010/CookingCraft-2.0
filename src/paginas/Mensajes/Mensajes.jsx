import React from 'react';
import styles from './Mensajes.module.css';
import MenuLateral from '../MenuLateral/MenulLateral';

import contacto from '../Imagenes/contacto.png';

const ChatList = () => {
  const chats = [
    { id: 1, name: 'Nombre 1' },
    { id: 2, name: 'Nombre 2' },
    { id: 3, name: 'Nombre 3' },
    { id: 4, name: 'Nombre 4' },
    { id: 5, name: 'm' },
    { id: 6, name: 'n' },
    { id: 7, name: 'o' },
    { id: 8, name: 'p' },
  ];

  return (
    <div className={styles.container}>
      <MenuLateral />
      <h1 className={styles.title}>Chats</h1>
      <ul className={styles.chatList}>
        {chats.map((chat) => (
          <li key={chat.id} className={styles.chatItem}>
            <div className={styles.chatContent}>
              <img src={contacto} alt="Profile" className={styles.profilePic} />
              <span className={styles.name}>{chat.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
