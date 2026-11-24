import { useEffect, useState } from "react"

type PreferenciaCursoProps = {
    curso: string
}

function PreferenciaCurso({ curso }: PreferenciaCursoProps) {

    const [nivel, setNivel] = useState("Inicial")

    // Guardamos el curso al montar el hijo y cada vez que el padre le pasa un curso distinto.
    useEffect(() => {
        localStorage.setItem('curso-seleccionado', curso)
    }, [curso])

    // Este efecto también guarda el nivel inicial. Después, si solo cambia el nivel, se repite este efecto y el del curso queda igual.
    useEffect(() => {
        localStorage.setItem('nivel-seleccionado', nivel)
    }, [nivel])

    return (
        <>
            <p> Curso recibido mediante props: {curso}</p>
            <p>
                <label>
                    Nivel guardado en el estado del componente hijo.
                    <select value={nivel} onChange={(evento) => setNivel(evento.target.value)}>
                        <option>Inicial</option>
                        <option>Intermedio</option>
                        <option>Avanzado</option>
                    </select>
                </label>
            </p>
            <p>Preferencia Guardada: {curso} - {nivel}</p>
        </>
    )
}

export function EjemploDependencias() {

    const [curso, setCurso] = useState("React")

    return (
        <section className="lesson" id="use-effect-dependencias" aria-labelledby="use-effect-dependencias-title">
            <header className="lesson-heading">
                <span className="lesson-number">03</span>
                <h2 id="use-effect-dependencias-title">Efectos con una prop y un estado</h2>
            </header>
            <p>El componente padre entrega <code>curso</code> como prop. El componente hijo tiene su propio estado <code>nivel</code>.</p>
            <p>Podemos tener varios <code>useEffect</code>. El primero responde solo a la prop <code>curso</code> y el segundo responde solo al estado <code>nivel</code>.</p>
            <pre><code>{"useEffect(() => {\n  localStorage.setItem('curso-seleccionado', curso)\n}, [curso])\n\nuseEffect(() => {\n  localStorage.setItem('nivel-seleccionado', nivel)\n}, [nivel])"}</code></pre>

            <article className="card">
                <p>
                    <label >
                        Elige un curso. El componente padre guarda tu selección.
                        <select value={curso} onChange={(evento) => setCurso(evento.target.value)}>
                            <option>React</option>
                            <option>JavaScript</option>
                        </select>
                    </label>
                </p>
                <PreferenciaCurso curso={curso} />
            </article>

            <p className="prompt">Cambia solamente el curso y luego solamente el nivel. ¿Cuál de los dos efectos se ejecuta en cada caso?</p>
        </section>
    )
}