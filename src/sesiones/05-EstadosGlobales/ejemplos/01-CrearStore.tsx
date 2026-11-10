import { useState } from "react"
import { useContadorStore } from "../stores/useContadorStore"

export function EjemploCrearStore() {

    // aqui estoy usando el hook para acceder al valor actual y suscribirme a los cambios en el componente de ese valor
    const contador = useContadorStore((estado) => estado.contador)

    // aqui estoy usando el hook para acceder a la funcion de actualizacion "incrementar"
    const incrementar = useContadorStore((estado) => { return estado.incrementar })

    // aqui estoy usando el hook para acceder a la funcion de actualizacion "reiniciar"
    const reiniciar = useContadorStore((estado) => { return estado.reiniciar })


    return (
        <section>
            <header>
                <span>01</span>
                <h2>Instalar zustand y crear un store</h2>
            </header>
            <p>Un store es un lugar donde guardamos estados y acciones para modificarlos. Zustand permite leer ese estado desde distintos componentes</p>
            <p>Para instalar Zustand, escribimos pnpm install zustand o pnpm add zustand</p>

            <article>

                <h3>El contador por hook de store : {contador}</h3>
                <button className="button" type="button" onClick={incrementar} >Incrementar</button>
                <button className="button" type="button" onClick={reiniciar}>Reiniciar</button>
            </article>

        </section>
    )
}