import { useContadorStore } from "../stores/useContadorStore"

export function EjemploCrearStore() {

    // aqui estoy usando el hook para acceder al valor actual y suscribirme a los cambios en el componente de ese valor
    const contador = useContadorStore((estado) => estado.contador)

    // aqui estoy usando el hook para acceder a la funcion de actualizacion "incrementar"
    const incrementar = useContadorStore((estado) => { return estado.incrementar })

    // aqui estoy usando el hook para acceder a la funcion de actualizacion "reiniciar"
    const reiniciar = useContadorStore((estado) => { return estado.reiniciar })


    return (
        <section className="lesson" id="crear-store" aria-labelledby="crear-store-title">
            <header className="lesson-heading">
                <span className="lesson-number">01</span>
                <h2 id="crear-store-title">Instalar Zustand y crear un store</h2>
            </header>
            <p>Un store es un lugar donde guardamos estado y acciones para modificarlo. Zustand permite leer ese estado desde distintos componentes sin pasarlo por props. Conserva <code>useState</code> para valores que solo necesita un componente, como el texto temporal de un formulario.</p>
            <p>Desde el proyecto, instalamos la dependencia con <code>pnpm add zustand</code>. Este proyecto ya la incluye. Zustand trae sus tipos de TypeScript y este uso no necesita un Provider.</p>
            <p>Creamos <code>stores/useContadorStore.ts</code>. El tipo describe los datos y las acciones. <code>create</code> devuelve un hook que podemos usar en nuestros componentes; en TypeScript escribimos <code>create&lt;EstadoContador&gt;()(...)</code>.</p>
            <pre><code>{"import { create } from 'zustand'\n\n// El tipo describe datos y acciones; no crea sus valores en tiempo de ejecución.\ntype EstadoContador = {\n  contador: number\n  incrementar: () => void\n  reiniciar: () => void\n}\n\n// create<EstadoContador>() devuelve una función que acepta el inicializador del store.\n// La segunda llamada le entrega (set) => ({ ... }); ({ ... }) devuelve un objeto.\n// Zustand proporciona set: una función para actualizar el estado, no el estado mismo.\n// Al definirlo fuera de React, todos los componentes importan la misma instancia.\n// Con esta forma de uso no hay que pasar store={...} ni envolver App en un Provider.\nexport const useContadorStore = create<EstadoContador>()((set) => ({\n  contador: 0,\n  // Esta función se ejecuta al llamar a la acción, no al crear el store.\n  // El siguiente valor depende del anterior: set recibe una función con el estado actual.\n  incrementar: () => set((estado) => ({ contador: estado.contador + 1 })),\n  // set combina propiedades en el primer nivel: conserva incrementar y reiniciar.\n  reiniciar: () => set({ contador: 0 }),\n}))"}</code></pre>
            <p><code>set</code> combina los campos que entregamos con el estado actual: reiniciar el contador conserva las acciones. Si el siguiente valor depende del anterior, usamos una función que recibe el estado actual. Define el store fuera de los componentes para compartir la misma instancia.</p>
            <article className="card">
                <h3>Contador global: {contador}</h3>
                <button className="button" type="button" onClick={incrementar}>Incrementar</button>{' '}
                <button className="button" type="button" onClick={reiniciar}>Reiniciar</button>
            </article>
            <p className="prompt">Incrementa el contador y observa los siguientes ejemplos. Todos leen el mismo store.</p>
        </section>
    )
}