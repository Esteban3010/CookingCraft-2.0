import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Registrarse.module.css';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyBc_zjAFA8Y9k0QauB6sFFp6_LuGTFywY",
  authDomain: "coockingcraft-c5d4e.firebaseapp.com",
  projectId: "coockingcraft-c5d4e",
  storageBucket: "coockingcraft-c5d4e.appspot.com",
  messagingSenderId: "35624123692",
  appId: "1:35624123692:web:b4b4f0d171be1a9cb38b3",
  measurementId: "G-595MLWTKG9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Registrarse() {
  const [mensajeExito, setMensajeExito] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [fuerzaContraseña, setFuerzaContraseña] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 
  const [shake, setShake] = useState(false); // Nuevo estado para la animación de sacudida


  const getPasswordStrengthMessage = () => {
    if (fuerzaContraseña >= 5) {
      return "Fuerte";
    } else if (fuerzaContraseña >= 3) {
      return "Medio";
    } else if (fuerzaContraseña >= 1) {
      return "Débil";
    } else {
      return "";
    }
  };
  

  // Función para evaluar la fortaleza de la contraseña
  const evaluarContraseña = (password) => {
    let fuerza = 0;
    if (password.length > 5) fuerza += 1; // Incrementa si tiene más de 5 caracteres
    if (password.length > 8) fuerza += 1; // Incrementa si tiene más de 8 caracteres
    if (/[A-Z]/.test(password)) fuerza += 1; // Incrementa si contiene una mayúscula
    if (/[0-9]/.test(password)) fuerza += 1; // Incrementa si contiene un número
    if (/[^A-Za-z0-9]/.test(password)) fuerza += 1; // Incrementa si contiene un carácter especial
    return fuerza;
  };

  // Función para manejar el cambio de contraseña
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setContraseña(password);
    setFuerzaContraseña(evaluarContraseña(password)); // Actualiza la fortaleza en tiempo real
  };
  

  const handleRegister = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setMensajeError('');
    setShake(false);
  
    if (!contraseña) {
      setMensajeError('Por favor, ingresa una contraseña');
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
      return;
    }
  
    if (!correo) {
      setMensajeError('Por favor, ingresa un correo');
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo
    if (!regexCorreo.test(correo)) {
      setMensajeError('Por favor, ingresa un correo válido');
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
  
    if (!nombreUsuario) {
      setMensajeError('Por favor, ingresa un usuario');
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
      return;
    }
  
    if (contraseña !== confirmarContraseña) {
      setMensajeError('Las contraseñas no coinciden');
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 300); // Restablece `shake` después de la animación
      return;
    }
  
  
    try {
      const q = query(collection(db, "usuarios"), where("nombreUsuario", "==", nombreUsuario));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        setMensajeError('El nombre de usuario ya existe');
        setIsLoading(false); // Finaliza la carga
        setShake(true); // Activa la sacudida cuando hay un error
        return;
      }
  
      const qCorreo = query(collection(db, "usuarios"), where("correo", "==", correo));
      const querySnapshotCorreo = await getDocs(qCorreo);
  
      if (!querySnapshotCorreo.empty) {
        setMensajeError('El correo ya está registrado');
        setIsLoading(false); // Finaliza la carga
        setShake(true); // Activa la sacudida cuando hay un error
        return;
      }
  
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombreUsuario: nombreUsuario,
        correo: correo,
        contraseña: contraseña
      });
  
      console.log("Usuario registrado con ID: ", docRef.id);
      setMensajeExito(true);
      setMensajeError('');
    } catch (e) {
      console.error("Error al registrar el usuario: ", e);
      setMensajeError('Ocurrió un error al registrar el usuario');
    } finally {
      setIsLoading(false); // Finaliza la carga después de intentar registrar
    }
  };
  

  const closeModal = () => {
    setMensajeExito(false);
  };

  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => {
        closeModal();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);

  return (
    <div className={styles.registerContainer}>
      <h1>Bienvenido a CookingCraft</h1>
      <div className={styles.registerBox}>
        <h2>Registrarse</h2>
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
              type="email"
              placeholder="Correo:"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Contraseña:"
              value={contraseña}
              onChange={handlePasswordChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Confirmar Contraseña:"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
            />
          </div>

          {/* Barra de fuerza de contraseña */}
          <div className={styles.passwordStrength}>
            <div className={`${styles.strengthBar} ${fuerzaContraseña >= 1 ? styles.red : styles.gray}`}/>
            <div className={`${styles.strengthBar} ${fuerzaContraseña >= 3 ? styles.yellow : styles.gray}`}/>
            <div className={`${styles.strengthBar} ${fuerzaContraseña >= 5 ? styles.green : styles.gray}`}/>
          </div>

          {/* Mensaje de fortaleza de la contraseña */}
          {fuerzaContraseña > 0 && (
            <p className={styles.strengthMessage}>
              Password strength: <span className={`${fuerzaContraseña >= 5 ? styles.textGreen : fuerzaContraseña >= 3 ? styles.textYellow : fuerzaContraseña >= 1 ? styles.textRed : ""}`}>
                {getPasswordStrengthMessage()}
              </span>
            </p>
          )}



          {mensajeError && <p className={`${styles.errorMessage} ${shake ? styles.shake : ''}`}>{mensajeError}</p>}
          <button type="button" className={styles.registerButton} onClick={handleRegister} disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <p>
          ¿Ya tienes cuenta? <Link to="/" className={styles.loginLink}>Iniciar Sesion</Link>
        </p>
      </div>
      {mensajeExito && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.progressBar}></div> 
            <button className={styles.closeX} onClick={closeModal}>×</button>
            <h3>¡Registro exitoso!</h3>
            <p>Ahora puedes iniciar Sesion</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registrarse;
