import { EjemploCrearStore } from "./ejemplos/01-CrearStore";
import { EjemploCompartirEstado } from "./ejemplos/02-CompartirEstado";
import { EjemploSelectores } from "./ejemplos/03-Selectores";
import { EjemploPersistencia } from "./ejemplos/04-Persistencia";
import { EjemploCarritoProductos } from "./ejemplos/05-CarritoProductos";
<<<<<<< HEAD
=======

import { Ejercicio } from "./ejercicio/Ejercicio";
import { Resolucion } from "./ejercicio/Resolucion";
>>>>>>> upstream/main

export function SesionEstadosGlobales() {
    return (
        <>
            <header className="chapter-header">
                <p className="eyebrow">Sesión 5 · Estados globales</p>
                <h1>Compartir estado con Zustand</h1>
            </header>
            <nav aria-label="Pasos de estados globales">
                <ol className="lesson-nav">
                    <li><a href="#crear-store">Crear un store</a></li>
                    <li><a href="#compartir-estado">Compartir el contador</a></li>
                    <li><a href="#selectores">Leer valores con selectores</a></li>
                    <li><a href="#persistencia-global">Guardar una preferencia</a></li>
                    <li><a href="#carrito-productos">Armar un carrito de productos</a></li>
                </ol>
                <a className="exercise-link" href="#estados-globales-reto">Ir al ejercicio ↗</a>
            </nav>
            <EjemploCrearStore />
            <EjemploCompartirEstado />
            <EjemploSelectores />
            <EjemploPersistencia />
            <EjemploCarritoProductos />
<<<<<<< HEAD
=======
            <Ejercicio />
            <Resolucion />
>>>>>>> upstream/main
        </>
    )
}