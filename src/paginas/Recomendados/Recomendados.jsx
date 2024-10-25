import React from 'react';
import styles from './Recomendados.module.css';
import MenuLateral from '../MenuLateral/MenulLateral';

const Recomendados = () => {
  const recommendedData = [
    { id: 1, name: 'Nombre 1', studies: 'Estudios', phrase: 'Frase' },
    { id: 2, name: 'Nombre 2', studies: 'Estudios', phrase: 'Frase' },
    { id: 3, name: 'Nombre 3', studies: 'Estudios', phrase: 'Frase' },
    { id: 4, name: 'Nombre 4', studies: 'Estudios', phrase: 'Frase' },
  ];

  return (
    <div className={styles.container}>
      <MenuLateral />
      <h1 className={styles.title}>Recomendados</h1>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Búsqueda" className={styles.searchInput} />
      </div>
      <div className={styles.list}>
        {recommendedData.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.profilePic}></div>
            <div className={styles.info}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.studies}>{item.studies}</p>
              <p className={styles.phrase}>{item.phrase}</p>
            </div>
            <div className={styles.contact}>
              <span className={styles.phoneIcon}>📞</span>
              <a href="#" className={styles.contactLink}>Contactar</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendados;
