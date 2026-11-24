import { useEffect, useState } from "react"

export function DependenciasVacias() {
    const [contador, setContador] = useState(0)

    // Con [] el efecto se ejecuta al montar el componente. Cambiar el contador no lo repite; salir de la sesión y volver sí.
    // En desarrollo, StrictMode también prueba el efecto una vez más al montar. Por eso puedes ver dos mensajes iniciales.
    useEffect(() => {
        console.log("El efecto (useEffect) con dependencias Vacias, se ejecuto!")
    }, [])

    return (
        <section className="lesson" id="use-effect-dependencias-vacias" aria-labelledby="use-effect-dependencias-vacias-title">
            <header className="lesson-heading">
                <span className="lesson-number">02</span>
                <h2 id="use-effect-dependencias-vacias-title">Un efecto con dependencias vacías</h2>
            </header>
            <p>El arreglo vacío <code>[]</code> indica que el efecto no depende de ningún estado ni prop. Se ejecuta cuando el componente aparece y no se repite por los cambios del contador.</p>
            <pre><code>{"useEffect(() => {\n  console.log('El componente apareció')\n}, [])"}</code></pre>

            < article className="card" >
                <h2>Contador: {contador}</h2>
                <button className="button" type="button" onClick={() => setContador((valorActual) => valorActual + 1)}>Incrementar</button>
            </article >
        </section>
    )
}