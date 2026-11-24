import type { ReactNode } from "react"

type TarjetaContenidoProps = {
    titulo: string
    children: ReactNode
}

function TarjetaContenido({ titulo, children }: TarjetaContenidoProps) {
    return (
        <article className="card">
            <h3>{titulo}</h3>
            {children}
        </article>
    )
}
export function EjemploComponentesChildren() {
    return (
        <section className="lesson" id="children" aria-labelledby="children-title">
            <header className="lesson-heading">
                <span className="lesson-number">11</span>
                <h2 id="children-title">Elegir el contenido con children</h2>
            </header>
            <p>children recibe lo que escribimos entre las etiquetas del componente. ReactNode describe contenido renderizable, como texto o elementos. El contenedor mantiene su estructura y recibe distintos contenidos.</p>
            <pre><code>{"type TarjetaContenidoProps = {\n  titulo: string\n  children: ReactNode\n}\n\nexport function TarjetaContenido({ titulo, children }: TarjetaContenidoProps) {\n  return (\n    <article className=\"card\">\n      <h3>{titulo}</h3>\n      {children}\n    </article>\n  )\n}\n\n<div className=\"example-grid\">\n        <TarjetaContenido titulo=\"Nuestra clase\">\n          <p>Aprendemos creando componentes pequeños.</p>\n        </TarjetaContenido>\n        <TarjetaContenido titulo=\"Antes de continuar\">\n          <ul><li>Identifica al padre.</li><li>Encuentra las props del hijo.</li></ul>\n          <a href=\"#argumentos\">Volver al ejemplo de argumentos</a>\n        </TarjetaContenido>\n      </div>"}</code></pre>
            <div className="example-grid">

                <TarjetaContenido titulo="Nuestra clase" >
                    <p>Escribe un párrafo entre las etiquetas de <code>TarjetaContenido</code>. El componente lo recibe en <code>children</code>.</p>
                </TarjetaContenido>

                <TarjetaContenido titulo="Antes de continuar" >
                    <ul>
                        <li>Este es un item</li>
                        <li>Este es otro item</li>
                    </ul>
                    <a href="#argumentos">Volver al ejemplo de props como argumentos</a>
                </TarjetaContenido>

            </div>
            <p className="prompt">Cambia el contenido entre las etiquetas sin modificar TarjetaContenido.</p>
        </section>
    )
}