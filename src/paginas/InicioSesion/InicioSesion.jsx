import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './InicioSesion.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de que la ruta sea correcta

function InicioSesion({ setUsuario }) { // Agregar setUsuario como prop
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = async () => {
    setMensajeError('');
    setShake(false);

    if (!nombreUsuario) {
      setMensajeError('Por favor, ingresa un nombre de usuario.');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    if (!contraseña) {
      setMensajeError('Por favor, ingresa la contraseña.');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    try {
      const q = query(collection(db, "usuarios"), where("nombreUsuario", "==", nombreUsuario));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMensajeError('El usuario no existe.');
        setShake(true);
        setTimeout(() => setShake(false), 300);
        return;
      }

      let usuarioCorrecto = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().contraseña === contraseña) {
          usuarioCorrecto = true;
          setUsuario(doc.data().nombreUsuario); // Guarda el nombre del usuario en el estado global
        }
      });

      if (!usuarioCorrecto) {
        setMensajeError('Contraseña incorrecta.');
        setShake(true);
        setTimeout(() => setShake(false), 300);
        return;
      }

      setMensajeError('');
      navigate('/home'); // Redirigir a la página de mensajes

    } catch (error) {
      console.error("Error al verificar el usuario: ", error);
      setMensajeError('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Bienvenido de nuevo a<br />CookingCraft</h1>
      <div className={styles.loginBox}>
        <h2>Iniciar sesión</h2>
        <form>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Nombre Usuario:"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña:"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>

          {mensajeError && <p className={`${styles.errorMessage} ${shake ? styles.shake : ''}`}>{mensajeError}</p>}

          <button type="button" className={styles.loginButton} onClick={handleLogin}>
            Ingresar
          </button>
        </form>

        <p>
          ¿No tienes cuenta? <Link to="/registrarse" className={styles.registerLink}>Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export default InicioSesion;
