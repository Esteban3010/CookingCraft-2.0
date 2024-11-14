import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store'
import { Provider } from 'react-redux'

// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDC_zjATAa90kcqau86sFFp6_LuGTFywY",
  authDomain: "coockingcraft-c5d4e.firebaseapp.com",
  projectId: "coockingcraft-c5d4e",
  storageBucket: "coockingcraft-c5d4e.appspot.com",
  messagingSenderId: "35624123692",
  appId: "1:35624123692:web:b4b4f0d171be1a9cb38b3",
  measurementId: "G-595MLWTKG9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// Render de la aplicación de React
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
