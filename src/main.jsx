import React from 'react';
import './global.css';
import AppRouter from "./router";
import ReactDOM from 'react-dom/client';
//import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>,
);
