import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioSesion from './paginas/InicioSesion/InicioSesion';
import Contenido from './paginas/Contenido/Contenido';
import Registrarse from './paginas//Registrarse/Registrarse';
import Home from './paginas/Home/Home';
import Recomendados from './paginas/Recomendados/Recomendados';
import Mensajes from './paginas//Mensajes/Mensajes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recomendados" element={<Recomendados />} />
        <Route path="/mensajes" element={<Mensajes />} />
      </Routes>
    </Router>
  );
}

export default App;

