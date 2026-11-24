import { usePrefenciasStore } from "../stores/usePreferenciasStore"

export function EjemploPersistencia() {

    const mostrarAyuda = usePrefenciasStore((estado) => estado.mostrarAyuda)
    const cambiarMostrarAyuda = usePrefenciasStore((estado) => estado.cambiarMostrarAyuda)

    return (
        <section className="lesson" id="persistencia-global" aria-labelledby="persistencia-global-title">
            <header className="lesson-heading">
                <span className="lesson-number">04</span>
                <h2 id="persistencia-global-title">Recordar una preferencia con persist</h2>
            </header>
            <p>Compartir estado no implica conservarlo al recargar. El middleware <code>persist</code> añade ese comportamiento al store. Por defecto usa <code>localStorage</code> del navegador. Este ejemplo tiene su propio store en <code>stores/usePreferenciasStore.ts</code>.</p>
            <pre><code>{"import { create } from 'zustand'\nimport { persist } from 'zustand/middleware'\n\ntype EstadoPreferencias = {\n  mostrarAyuda: boolean\n  cambiarMostrarAyuda: (mostrarAyuda: boolean) => void\n}\n\nexport const usePreferenciasStore = create<EstadoPreferencias>()(\n  // persist recibe la función que crea el estado y un objeto de opciones.\n  // Devuelve un inicializador que añade la lectura y escritura del almacenamiento.\n  persist(\n    (set) => ({\n      // Valor inicial si todavía no hay una preferencia guardada.\n      mostrarAyuda: true,\n      // El parámetro es el nuevo booleano; { mostrarAyuda } abrevia { mostrarAyuda: mostrarAyuda }.\n      // set actualiza ese dato y conserva la función cambiarMostrarAyuda.\n      cambiarMostrarAyuda: (mostrarAyuda) => set({ mostrarAyuda }),\n    }),\n    {\n      // Clave única con la que se guardan los datos.\n      name: 'bootcamp-react-preferencias',\n      // Selecciona qué datos guardar; las acciones permanecen en el store.\n      // No recorta el estado en memoria: solo el objeto que se escribe en storage.\n      partialize: (estado) => ({ mostrarAyuda: estado.mostrarAyuda }),\n      // storage usa localStorage por defecto: conserva los datos entre sesiones.\n      // Para configurarlo, importa createJSONStorage desde 'zustand/middleware'.\n      // storage: createJSONStorage(() => localStorage),\n      // sessionStorage conserva los datos al recargar y los limita a la sesión de la pestaña.\n      // storage: createJSONStorage(() => sessionStorage),\n      // Un almacenamiento personalizado implementa getItem, setItem y removeItem.\n      // Sus métodos pueden ser asíncronos, por ejemplo con un adaptador de IndexedDB.\n      // storage: createJSONStorage(() => almacenamientoPersonalizado),\n      // version: versión de los datos guardados; por defecto es 0.\n      // migrate: adapta los datos si su versión difiere; recibe los datos y la versión anterior.\n      // merge: combina datos recuperados y estado actual; por defecto combina solo el primer nivel.\n      // onRehydrateStorage: se ejecuta antes de recuperar datos y puede devolver una función\n      // que se ejecuta al terminar, recibiendo el estado recuperado o un error.\n      // skipHydration: true evita la recuperación automática (por defecto es false).\n      // En ese caso, usa usePreferenciasStore.persist.rehydrate() para recuperarlos.\n    },\n  ),\n)"}</code></pre>
            <p><code>name</code> es la clave de almacenamiento y debe distinguirse de las de otros stores. <code>partialize</code> selecciona los datos que guardamos: aquí solo el booleano. Al iniciar la aplicación, Zustand recupera ese valor.</p>
            <pre><code>{"// Seleccionamos el valor recuperado por persist y la acción para cambiarlo.\nconst mostrarAyuda = usePreferenciasStore((estado) => estado.mostrarAyuda)\nconst cambiarMostrarAyuda = usePreferenciasStore((estado) => estado.cambiarMostrarAyuda)\n\n// checked entrega un booleano; value sería el valor de texto del control.\n<input type=\"checkbox\" checked={mostrarAyuda}\n  onChange={(evento) => cambiarMostrarAyuda(evento.target.checked)} />"}</code></pre>
            <article className="card">
                <h3>Preferencia del navegador</h3>
                <label><input type="checkbox" checked={mostrarAyuda} onChange={(evento) => cambiarMostrarAyuda(evento.target.checked)} /> Mostrar ayuda</label>
                {mostrarAyuda ? <p>El contador se comparte en memoria; esta preferencia también se conserva al recargar.</p> : null}
                <p>Ayuda: {mostrarAyuda ? 'visible' : 'oculta'}.</p>
                <button className="button" type="button" onClick={() => cambiarMostrarAyuda(true)}>Restablecer preferencia</button>
            </article>
            <p className="prompt">Desmarca la casilla y recarga. Compara la preferencia con el contador. Revisa la clave en DevTools → Application → Local Storage. La preferencia pertenece a este navegador y origen; no se guarda en la API.</p>
        </section>

    )
}