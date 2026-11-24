import { Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import { SesionRouter } from './sesiones/02-react-router/SesionRouter'
import { Cursos } from './sesiones/01-componentes/ejercicio/Cursos.tsx'
import { SesionComponentes } from './sesiones/01-componentes/SesionComponentes'
import { PaginaNoEncontrada } from './sesiones/02-react-router/paginas/PaginaNoEncontrada'
import { Inicio } from './sesiones/02-react-router/paginas/Inicio'
import { DetalleCurso } from './sesiones/01-componentes/ejercicio/DetalleCurso'
import { SesionEstadosForms } from './sesiones/03-estados-forms/SesionEstadosFroms.tsx'
import { SesionServiciosWeb } from './sesiones/04-ServiciosWeb/SesionServiciosWeb.tsx'
import { SesionEstadosGlobales } from './sesiones/05-EstadosGlobales/SesionEstadosGlobales.tsx'
import { SesionAutenticacionAutorizacion } from './sesiones/06-AutenticacionAutorizacion/SesionAutenticacionAutorizacion.tsx'
import { Protegido } from './sesiones/06-AutenticacionAutorizacion/componentes/Protegido.tsx'

export function App() {
  return (
    <>
      <Routes>
        {/* Estas páginas comparten el layout. La ruta index se muestra al entrar a / y las demás se eligen según la URL. */}
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Inicio />} />
          <Route path="/componentes" element={<SesionComponentes />} />
          <Route path="/router" element={<SesionRouter />} />
          {/* Esta segunda dirección muestra la misma clase para que podamos probar cómo cambia el enlace activo. */}
          <Route path="/router/navlink-cursos" element={<SesionRouter />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/estados-forms" element={<SesionEstadosForms />} />
          <Route path="/servicios-web" element={<Protegido rolesPermitidos={["admin"]}><SesionServiciosWeb /> </Protegido>} />
          <Route path="/estados-globales" element={<SesionEstadosGlobales />} />
          <Route path="/autenticacion-autorizacion" element={<SesionAutenticacionAutorizacion />} />
          <Route path="/cursos/:cursoId" element={<DetalleCurso />} />
          {/* Si ninguna ruta coincide, mostramos la página de error. /cursos/no-existe sí coincide con la ruta del detalle. */}
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </>
  )
}
