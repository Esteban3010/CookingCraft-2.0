import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioSesion from '../InicioSesion/InicioSesion';
import Contenido from '../Contenido/Contenido';
import Registrarse from '../Registrarse/Registrarse';
import Home from '../Home/Home';
import Aspirantes from '../Aspirantes/Aspirantes';
import Mensajes from '../Mensajes/Mensajes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aspirantes" element={<Aspirantes />} />
        <Route path="/mensajes" element={<Mensajes />} />
      </Routes>
    </Router>
  );
}

export default App;

