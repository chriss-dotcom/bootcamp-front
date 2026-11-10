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

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Inicio />} />
          <Route path="/componentes" element={<SesionComponentes />} />
          <Route path="/router" element={<SesionRouter />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/estados-forms" element={<SesionEstadosForms />} />
          <Route path="/servicios-web" element={<SesionServiciosWeb />} />
          <Route path="/estados-globales" element={<SesionEstadosGlobales />} />
          <Route path="/cursos/:cursoId" element={<DetalleCurso />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </>
  )
}
