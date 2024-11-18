import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Recomendados.module.css';
import MenuLateral from '../MenuLateral/MenulLateral';
import { db } from '../firebase'; // Asegúrate de que la ruta sea correcta
import { collection, getDocs } from 'firebase/firestore';

const Recomendados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const navigate = useNavigate();

  // Cargar los usuarios desde Firestore
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const usuariosCollection = collection(db, 'usuarios');
      const usuariosSnapshot = await getDocs(usuariosCollection);
      const usuariosData = usuariosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(usuariosData);
      setFilteredUsuarios(usuariosData); // Inicialmente, muestra todos los usuarios
    };

    obtenerUsuarios();
  }, []);

  // Filtrar los usuarios según el término de búsqueda
  useEffect(() => {
    const resultadosFiltrados = usuarios.filter(usuario =>
      usuario.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsuarios(resultadosFiltrados);
  }, [searchTerm, usuarios]);

  // Función para manejar el clic en "Contactar"
  const handleContactar = (usuario) => {
    // Redirige al chat y pasa el nombre del usuario como parámetro
    navigate('/mensajes', { state: { destinatario: usuario.nombreUsuario } });
  };

  return (
    <div className={styles.container}>
      <MenuLateral />
      <h1 className={styles.title}>Recomendados</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Búsqueda"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filteredUsuarios.map((usuario) => (
          <div key={usuario.id} className={styles.card}>
            <div className={styles.profilePic}></div>
            <div className={styles.info}>
              <p className={styles.name}>{usuario.nombreUsuario}</p>
              <p className={styles.studies}>{usuario.estudios || 'Estudios'}</p>
              <p className={styles.phrase}>{usuario.frase || 'Estado'}</p>
            </div>
            <div className={styles.contact}>
              <span className={styles.phoneIcon}>📞</span>
              <button
                onClick={() => handleContactar(usuario)}
                className={styles.contactLink}
              >
                Contactar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendados;
