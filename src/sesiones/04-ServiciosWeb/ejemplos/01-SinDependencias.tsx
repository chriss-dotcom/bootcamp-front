import { useEffect, useState } from "react"

export function SinDependencias() {

    const [contador, setContador] = useState(0)
    const [curso, setCurso] = useState("React")

    // Sin segundo argumento, veremos este mensaje al montar el ejemplo y después de cada render que React aplique. Prueba cambiar el curso.
    useEffect(() => {
        console.log("El efecto (useEffect) sin ninguna dependencia, se ejecuto", { contador, curso })
    })
    // este es innecesario, pero es bueno ejemplificar que se pueden tener varios useEffect
    useEffect(() => {
        console.log("Segundo El efecto (useEffect) sin ninguna dependencia, se ejecuto", { contador, curso })
    })

    return (
        <section className="lesson" id="use-effect-sin-dependencias" aria-labelledby="use-effect-sin-dependencias-title">
            <header className="lesson-heading">
                <span className="lesson-number">01</span>
                <h2 id="use-effect-sin-dependencias-title">Un efecto sin arreglo de dependencias</h2>
            </header>
            <p><code>useEffect</code> ejecuta una tarea después de que React actualiza la pantalla. Si no escribimos un arreglo como segundo argumento, el efecto se ejecuta después de cada renderizado.</p>
            <p>Abre la consola del navegador. Al cambiar el contador o el curso, React vuelve a renderizar el componente y el mensaje aparece nuevamente.</p>
            <pre><code>{"useEffect(() => {\n  console.log('El efecto se ejecutó')\n})"}</code></pre>

            <article className="card">
                <h2>Contador: {contador}</h2>
                <button className="button" type="button" onClick={() => setContador((valorActual) => valorActual + 1)}>Incrementar</button>
                <br />
                <label>
                    <p>Curso:</p>
                    <select value={curso} onChange={(evento) => setCurso(evento.target.value)}>
                        <option>React</option>
                        <option>JavaScript</option>
                    </select>
                </label>
            </article>
        </section>
    )
}