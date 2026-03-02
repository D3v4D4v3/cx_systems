import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Punto de entrada de la aplicación: renderiza el componente App dentro del elemento con id 'root', envuelto
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)