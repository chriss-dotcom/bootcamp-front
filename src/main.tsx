import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router'
import { useAuthStore } from './sesiones/06-AutenticacionAutorizacion/stores/useAuthStore.ts'

// Al apretar F5, persist ya recuperó el token de localStorage. Con getState() leemos el store acá, fuera de un componente.
const sesion = useAuthStore.getState()
// Si hay token, pedimos el perfil. Con void iniciamos la consulta y dejamos que React muestre la pantalla mientras esperamos.
if (sesion.accessToken) void sesion.verificarSesion()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Al envolver App con BrowserRouter, los enlaces y las rutas pueden leer la URL y seguir los cambios del historial. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
