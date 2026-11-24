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

<<<<<<< HEAD
function ResumenContador(){
=======
function ResumenContador() {
    // Cuando el otro componente llama a incrementar, cambia este mismo store. El resumen recibe el nuevo contador aunque nadie se lo pase por props.
>>>>>>> upstream/main
    const contador = useContadorStore((estado) => estado.contador)
    return(
        <article><h3>Componente que lee el valor compartido: {contador}</h3></article>
    )
}

export function EjemploCompartirEstado(){

    return (
<<<<<<< HEAD
        <section>
            <header>
                <span>02</span>
                <h2>Compartir Estado entre Componentes</h2>
            </header>
            <p>Ambos componentes importan el mismo hook</p>
            
            <ResumenContador/>
            <ControlesContador/>
=======
        <section className="lesson" id="compartir-estado" aria-labelledby="compartir-estado-title">
            <header className="lesson-heading">
                <span className="lesson-number">02</span>
                <h2 id="compartir-estado-title">Compartir estado entre componentes</h2>
            </header>
            <p>Ambos componentes importan el mismo hook. <code>ResumenContador</code> lee el número y <code>ControlesContador</code> obtiene las acciones. No necesitan recibir el contador ni sus funciones por props.</p>
            <pre><code>{"function ResumenContador() {\n  // Lee la misma instancia del store, sin recibir el dato por props.\n  const contador = useContadorStore((estado) => estado.contador)\n  return <p>Valor compartido: {contador}</p>\n}\n\nfunction ControlesContador() {\n  // Obtiene la acción; React la ejecutará al pulsar el botón.\n  const incrementar = useContadorStore((estado) => estado.incrementar)\n  return <button onClick={incrementar}>Incrementar</button>\n}"}</code></pre>
            <div className="example-grid"><ResumenContador /><ControlesContador /></div>
            <p className="prompt">Cambia el contador desde aquí y vuelve al primer ejemplo. El store conserva el valor mientras la aplicación sigue cargada, aunque sus componentes se desmonten. Al recargar la página, este contador vuelve a cero.</p>
>>>>>>> upstream/main
        </section>
    )
}