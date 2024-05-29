import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/App';
import './infrastructure/i18n/i18n-index';
import { createRoot } from 'react-dom/client';
//import './index.css';


const container = document.getElementById('root');
if (container) {
    // Crear la raíz y renderizar la aplicación
    const root = createRoot(container);
    root.render(<App />);
}

