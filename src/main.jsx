import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBc_zjAFA8Y9k0QauB6sFFp6_LuGTFywY",
  authDomain: "coockingcraft-c5d4e.firebaseapp.com",
  projectId: "coockingcraft-c5d4e",
  storageBucket: "coockingcraft-c5d4e.appspot.com",
  messagingSenderId: "35624123692",
  appId: "1:35624123692:web:b4b4f0d171be1a9cb38b3",
  measurementId: "G-595MLWTKG9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Render de la aplicación de React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
