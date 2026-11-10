import { useContadorStore } from "../stores/useContadorStore"

function ControlesContador(){

    const incrementar = useContadorStore((estado) => estado.incrementar)
    const reiniciar = useContadorStore((estado) => estado.reiniciar)

    return(
        <article>
            <button className="button" type="button" onClick={incrementar}>Incrementar</button>
            <button className="button" type="button" onClick={reiniciar}>Reiniciar</button>
        </article>
    )
}

function ResumenContador(){
    const contador = useContadorStore((estado) => estado.contador)
    return(
        <article><h3>Componente que lee el valor compartido: {contador}</h3></article>
    )
}

export function EjemploCompartirEstado(){

    return (
        <section>
            <header>
                <span>02</span>
                <h2>Compartir Estado entre Componentes</h2>
            </header>
            <p>Ambos componentes importan el mismo hook</p>
            
            <ResumenContador/>
            <ControlesContador/>
        </section>
    )
}