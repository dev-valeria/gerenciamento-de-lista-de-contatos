import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Certifique-se de que o CSS está configurado corretamente
import App from './App';
import reportWebVitals from './reportWebVitals';

// Criação do root da aplicação React
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Usando TypeScript
);

// Renderização do aplicativo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

