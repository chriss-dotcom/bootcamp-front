import { usePrefenciasStore } from "../stores/usePreferenciasStore"

export function EjemploPersistencia() {

    const mostrarAyuda = usePrefenciasStore((estado) => estado.mostrarAyuda)
    const cambiarMostrarAyuda = usePrefenciasStore((estado) => estado.cambiarMostrarAyuda)

    return (
        <section>
            <header>
                <span>04</span>
                <h2>Recordar una preferencia con persist</h2>
            </header>
            <p>Compartir un estado no significa que se conserve al recargar la pagina</p>

            <article>
                <h1>Preferencias del navegador</h1>
                <label>
                    <input type="checkbox" checked={mostrarAyuda} onChange={(evento) => cambiarMostrarAyuda(evento.target.checked)} /> Mostrar ayuda
                </label>
                {mostrarAyuda ? <p>El contador se comparte en memoria; usando persist esto se conserva al recargar</p> : null}

            </article>
        </section>

    )
}