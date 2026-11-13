import { EjemploCrearStore } from "./ejemplos/01-CrearStore";
import { EjemploCompartirEstado } from "./ejemplos/02-CompartirEstado";
import { EjemploSelectores } from "./ejemplos/03-Selectores";
import { EjemploPersistencia } from "./ejemplos/04-Persistencia";
import { EjemploCarritoProductos } from "./ejemplos/05-CarritoProductos";

export function SesionEstadosGlobales() {
    return (
        <>
            <header>
                <p>Sesion 5  - Estados globales</p>

            </header>

            <EjemploCrearStore />
            <EjemploCompartirEstado />
            <EjemploSelectores />
            <EjemploPersistencia />
            <EjemploCarritoProductos />
        </>
    )
}