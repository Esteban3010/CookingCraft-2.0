import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './InicioSesion.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Importar Firestore

function InicioSesion() {
  const db = getFirestore(); // Si ya inicializaste Firebase, asegúrate de obtener la referencia de la base de datos

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [shake, setShake] = useState(false); // Nuevo estado para la animación de sacudida

  
  const handleLogin = async () => {

    setMensajeError('');
    setShake(false);

    // Verificar si el campo de nombre de usuario está vacío
    if (!nombreUsuario) {
      setMensajeError('Por favor, ingresa un nombre de usuario.');
      setShake(true);
      setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
      return;
    }

    // Verificar si el campo de contraseña está vacío
    if (!contraseña) {
      setMensajeError('Por favor, ingresa la contraseña.');
      setShake(true);
      setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
      return;
    }

    try {
      // Consultar Firestore para verificar si el usuario existe
      const q = query(collection(db, "usuarios"), where("nombreUsuario", "==", nombreUsuario));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si el nombre de usuario no existe
        setMensajeError('El usuario no existe.');
        setShake(true);
        setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
        return;
      }

      // Verificar si la contraseña es correcta
      let usuarioCorrecto = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().contraseña === contraseña) { // Comparar la contraseña ingresada con la de la base de datos
          usuarioCorrecto = true;
        }
      });

      if (!usuarioCorrecto) {
        setMensajeError('Contraseña incorrecta.');
        setShake(true);
        setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
        return;
      }

      // Si todo es correcto, limpiar el mensaje de error y permitir el acceso
      setMensajeError('');
      navigate('/home'); // Redirigir a la página de inicio (home)

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
              onChange={(e) => setNombreUsuario(e.target.value)} // Capturar el valor del nombre de usuario
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña:"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)} // Capturar el valor de la contraseña
            />
            <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>

          {/* Mostrar el mensaje de error si existe */}
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