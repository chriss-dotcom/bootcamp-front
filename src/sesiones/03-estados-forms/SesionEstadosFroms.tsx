import { EjemploContador } from "./ejemplos/01-Contador";
import { EjemploDisponibilidad } from "./ejemplos/02-Disponibilidad";
import { EjemploFormulario } from "./ejemplos/03-Formulario";
import { EjemploValidacionZod } from "./ejemplos/04-ValidacionZod";
import { Ejercicio } from "./ejercicio/Ejercicio";
import { Resolucion } from "./ejercicio/Resolucion";

export function SesionEstadosForms() {
    return (
        <>
            <header className="chapter-header" id="estados-inicio">
                <p className="eyebrow">Sesión 3 · Estados y formularios</p>
                <h1>La interfaz puede cambiar.</h1>
                <p className="lead">Usaremos useState para recordar valores entre renderizados y responder a las acciones de la persona usuaria.</p>
                <div className="chapter-meta"><span>4 pasos</span><span>React + TypeScript</span></div>
            </header>

            <nav aria-label="Pasos de estados y formularios">
                <ol className="lesson-nav">
                    <li><a href="#contador">Guardar un número</a></li>
                    <li><a href="#disponibilidad">Cambiar un valor booleano</a></li>
                    <li><a href="#formulario">Controlar un formulario pequeño</a></li>
                    <li><a href="#validacion-zod">Validar el formulario con Zod</a></li>
                </ol>
                <a className="exercise-link" href="#estados-reto">Ir al ejercicio ↗</a>
            </nav>
            <EjemploContador />
            <EjemploDisponibilidad />
            <EjemploFormulario />
            <EjemploValidacionZod />
            <Ejercicio />
            <Resolucion />
        </>
    )

}