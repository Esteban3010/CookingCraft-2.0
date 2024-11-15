import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import cloudinaryConfig from '../cloudinaryConfig';
import axios from 'axios';
import styles from './SubirContenido.module.css';

function SubirContenido({ nombreUsuario }) {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !titulo || !descripcion || !nombreUsuario) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setUploading(true);

    try {
      // Cargar el archivo a Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.upload_preset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/upload`,
        formData
      );

      const mediaUrl = response.data.secure_url;

      // Guardar los detalles en Firestore, incluyendo el nombre del usuario
      await addDoc(collection(db, 'contenido'), {
        titulo,
        descripcion,
        mediaUrl,
        usuario: nombreUsuario, // Guardar el nombre del usuario que sube el contenido
      });

      alert("Contenido subido exitosamente");
      navigate('/contenido');
    } catch (error) {
      console.error("Error al subir contenido:", error);
      alert("Hubo un error al subir el contenido");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.subirContainer}>
      <h1>Subir Contenido</h1>
      <div className={styles.formGroup}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título"
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese la descripción"
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="file">Archivo (audio, video o imagen)</label>
        <input
          type="file"
          id="file"
          accept="audio/*,video/*,image/*"
          onChange={handleFileChange}
          className={styles.input}
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={styles.uploadButton}
      >
        {uploading ? 'Subiendo...' : 'Subir'}
      </button>
    </div>
  );
}

export default SubirContenido;
