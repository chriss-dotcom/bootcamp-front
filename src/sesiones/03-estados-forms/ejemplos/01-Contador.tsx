import { useState } from 'react'

export function EjemploContador() {
    // useState(0) nos da el contador de este render y la función para pedir otro valor. React lo recuerda entre clics.
    const [contador, setContador] = useState(0)

    // Prueba desde cero: cada función recibe lo que dejó la anterior, así que en un clic pasamos por 1, 2, 3 y 4.
    function sumarConFunciones() {
        setContador(actual => actual + 1)
        setContador(actual => actual + 1)
        setContador(actual => actual + 1)
        setContador(actual => actual + 1)
    }

    // Acá las cuatro llamadas leen el mismo contador del clic. Si era 0, las cuatro piden guardar 1.
    function sumarConValor() {
        setContador(contador + 1)
        setContador(contador + 1)
        setContador(contador + 1)
        setContador(contador + 1)
    }

    return (
        <section className="lesson" id="contador" aria-labelledby="contador-title">
            <header className="lesson-heading">
                <span className="lesson-number">01</span>
                <h2 id="contador-title">Guardar un número con useState</h2>
            </header>
            <p><code>useState(0)</code> guarda el contador entre renderizados. Cada botón llama cuatro veces a <code>setContador</code> en un mismo clic. ¿Cuánto sumará cada uno?</p>
            <div className="example-grid">
                <article className="card">
                    <h3>Pasar una función</h3>
                    <pre><code>{'setContador(actual => actual + 1)\n'.repeat(4).trimEnd()}</code></pre>
                    <p>Cada función recibe el resultado de la anterior. Desde cero, los valores pasan por 1, 2, 3 y 4 antes de que React muestre el resultado.</p>
                    <button className="button" type="button" onClick={sumarConFunciones}>Probar con funciones</button>
                </article>
                <article className="card">
                    <h3>Pasar un valor</h3>
                    <pre><code>{'setContador(contador + 1)\n'.repeat(4).trimEnd()}</code></pre>
                    <p>Las cuatro llamadas leen el mismo contador de ese renderizado. Si vale 0, las cuatro le piden a React que guarde 1.</p>
                    <button className="button" type="button" onClick={sumarConValor}>Probar con valores</button>
                </article>
            </div>
            <p role="status">Contador: {contador}</p>
            <button className="button" type="button" onClick={() => setContador(0)}>Volver a cero</button>
            <p className="prompt">Prueba cada botón desde cero. Luego deja el contador en 4 y predice qué mostrará cada botón en el siguiente clic.</p>
        </section>
    )
}
