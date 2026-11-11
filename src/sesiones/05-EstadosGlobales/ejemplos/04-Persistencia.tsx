import { usePreferenciasStore } from "../stores/usePreferenciasStore"

export function EjemploPersistencia(){

    const mostrarAyuda = usePreferenciasStore((estado) => estado.mostrarAyuda)
    const cambiarMostrarAyuda = usePreferenciasStore((estado) => estado.cambiarMostrarAyuda)

    return(
        <section>
            <header>
                <span>04</span>
                <h2>Recordar una preferencia con persist</h2>
            </header>
            <p>Compartir un estado no significa que se conseve al recargar la pagina</p>

            <article>
                <h1>Preferencias del Navegador</h1>
                <label>
                    <input type="checkbox" checked={mostrarAyuda} onChange={(evento) => cambiarMostrarAyuda(evento.target.checked)}/>Mostrar Ayuda
                </label>
                {mostrarAyuda ? <p>El contador se comparte en memoria, usando persist esto se conserva al recargar</p> : null }
            </article>
        </section>
    )
}