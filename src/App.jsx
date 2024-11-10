import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioSesion from './paginas/InicioSesion/InicioSesion';
import Contenido from './paginas/Contenido/Contenido';
import Registrarse from './paginas/Registrarse/Registrarse';
import Home from './paginas/Home/Home';
import Recomendados from './paginas/Recomendados/Recomendados';
import Mensajes from './paginas/Mensajes/Mensajes';
import Configuracion from './paginas/Configuracion/Configuracion';

function App() {
  const [nombreUsuario, setNombreUsuario] = useState(null); // Estado para almacenar el nombre de usuario

  
  // Usar useEffect para imprimir el nombreUsuario en la consola cada vez que cambie
  useEffect(() => {
    console.log("Nombre de usuario en estado global:", nombreUsuario);
  }, [nombreUsuario]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion setUsuario={setNombreUsuario} />} /> {/* Pasar setUsuario a InicioSesion */}
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recomendados" element={<Recomendados />} />
        <Route path="/mensajes" element={<Mensajes nombreUsuario={nombreUsuario} />} /> {/* Pasar nombreUsuario a Mensajes */}
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  );
}

export default App;
