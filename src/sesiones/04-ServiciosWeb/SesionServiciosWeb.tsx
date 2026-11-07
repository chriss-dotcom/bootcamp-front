import { SinDependencias } from "./ejemplos/01-SinDependencias";
import { DependenciasVacias } from "./ejemplos/02-DependenciasVacias";
import { EjemploDependencias } from "./ejemplos/03-Dependencias";
import { EjemploLimpieza } from "./ejemplos/04-Limpieza";
import { EjemploPromesaBasica } from "./ejemplos/05-PromesaBasica";
import { EjemploAsincronia } from "./ejemplos/06-Asincronia";
import { EjemploPromiseAll } from "./ejemplos/07-PromiseAll";
import { EjemploPokeApi } from "./ejemplos/08-PokeApi";
import { EjemploCrudProductos } from "./ejemplos/09-CrudProductos";
import { Ejercicio } from "./ejercicio/Ejercicio";

export function SesionServiciosWeb() {
    return (
        <>
            <header className="chapter-header" id="servicios-web-inicio">
                <p className="eyebrow">Sesión 4 · Servicios web</p>
                <h1>React puede conectarse con el exterior.</h1>
                <p className="lead">Compararemos las dependencias de useEffect, limpiaremos un efecto y cargaremos datos desde un servicio web.</p>
                <div className="chapter-meta"><span>8 pasos</span><span>useEffect + Fetch API</span></div>
            </header>

            <nav aria-label="Pasos de servicios web">
                <ol className="lesson-nav">
                    <li><a href="#use-effect-sin-dependencias">Sin arreglo de dependencias</a></li>
                    <li><a href="#use-effect-dependencias-vacias">Dependencias vacías</a></li>
                    <li><a href="#use-effect-dependencias">Una prop y un estado</a></li>
                    <li><a href="#use-effect-limpieza">Limpiar al desmontar</a></li>
                    <li><a href="#promesa-basica">Resolver o rechazar una Promise</a></li>
                    <li><a href="#asincronia">Esperar resultados</a></li>
                    <li><a href="#promise-all">Esperar varias promesas</a></li>
                    <li><a href="#poke-api">Cargar datos con GET</a></li>
                    <li><a href="#crud-productos">CRUD de productos con JSON Server</a></li>
                </ol>
                <a className="exercise-link" href="#servicios-web-reto">Ir al ejercicio ↗</a>
            </nav>

            <SinDependencias />
            <DependenciasVacias />
            <EjemploDependencias />
            <EjemploLimpieza />
            <EjemploPromesaBasica />
            <EjemploAsincronia />
            <EjemploPromiseAll />
            <EjemploPokeApi />
            <EjemploCrudProductos />
            <Ejercicio />
        </>
    )
}