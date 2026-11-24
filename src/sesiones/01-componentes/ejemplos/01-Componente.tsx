function TarjetaAlumnoEstatica() {
    let nombre = 'Ana'
    return (
        <article>
            {/* Con las llaves mostramos el valor de la variable nombre. Prueba cambiar "Ana" arriba y mira qué aparece en el título.*/}
            <h3>{nombre}</h3>
            <p>Estudiante de React</p>
        </article>
    )
}

export function EjemploPrimerComponente() {
    return (
        <section className="lesson" id="componente" aria-labelledby="componente-title">
            <header className="lesson-heading">
                <span className="lesson-number">01</span>
                <h2 id="componente-title">Tu primer componente</h2>
            </header>
            <p>Un componente es una función que devuelve JSX. Su nombre comienza con mayúscula. Aquí TarjetaAlumnoEstatica se define y se usa en el mismo archivo, sin recibir datos.</p>
            <pre><code>{"function TarjetaAlumnoEstatica() {\n  return (\n    <article className=\"card\">\n      <h3>Ana</h3>\n      <p>Estudiante de React</p>\n    </article>\n  )\n}\n\n<TarjetaAlumnoEstatica />"}</code></pre>
            <TarjetaAlumnoEstatica />
            <p className="prompt">Predice: si cambias Ana dentro de la función, ¿qué nombre aparecerá?</p>
        </section>
    )

}

