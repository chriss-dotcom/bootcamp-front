import { es } from "zod/locales"
import { useContadorStore } from "../stores/useContadorStore"

export function EjemploSelectores() {

    // selector
    const contador = useContadorStore((estado) => estado.contador)

    // un selector calculado
    const esPar = useContadorStore((estado) => estado.contador % 2 === 0)

    // un selector derivado
    const doble = contador * 2

    const incrementar = useContadorStore((estado) => estado.incrementar)

    return (
        <article>
            <h3>Datos derivados</h3>
            <p>Contador: {contador}</p>
            <p>Doble: {doble} </p>
            <p>El contador es {esPar ? 'par' : 'impar'}</p>
            <button className="button" type="button" onClick={incrementar}>incrementar</button>
        </article>
    )
}