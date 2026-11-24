import { useState } from "react"

export function EjemploDisponibilidad() {

    //function miUseState(estado) {
    //    return [estado, () => { return false }, { nombre: "Alexia", edad: 38 }]
    //}
    //const [condicion, miFuncion] = miUseState(true);



    // disponible es el estado solo para leerlo, su tipo se infiere a partir del estado inicial 
    // de useState(valorInicial), o usando el operador de tipo en useState<tipo>(valor)
    // setDisponible(nuevoValor) siendo nuevo valor del mismo tipo que "disponible" y se llama funcion de actualizacion.


    // disponible = true -> className = "badge"
    // disponible = false -> className = "badge badge-muted"
    // { disponible ? "Disponible" : "No disponible" }
    //const paragraph = disponible ? <p><span className="badge">Disponible</span></p> : <p><span className="badge badge-muted ">No Disponible</span></p>
    //const [edad, funciondeActualizacion] = useState(25);
    //funciondeActualizacion(13)
    //let validar = true;
    //let numeros = [1, 2, 3]
    //let [cualquierCosaUno, dos] = numeros;

    const [disponible, setDisponible] = useState(false);

    function cambiarDisponibilidad() {
        setDisponible((valorActual) => {



            return !valorActual;
        })
    }
    return (
        <section className="lesson" id="disponibilidad" aria-labelledby="disponibilidad-title">
            <header className="lesson-heading">
                <span className="lesson-number">02</span>
                <h2 id="disponibilidad-title">Cambiar entre estados</h2>
            </header>
            <p></p>
            <pre><code></code></pre>
            <article className="card">
                <h3>Laboratorio</h3>
                <p><span className={disponible ? "badge" : "badge badge-muted"} >{disponible ? 'Disponible' : 'No Disponible'}</span></p>
                {/*paragraph*/}
                <button className="button" type="button" onClick={cambiarDisponibilidad} >Cambiar disponibilidad</button>
                {/*<button className="button" type="button" onClick={() => setDisponible(!disponible)} >Cambiar disponibilidad</button>*/}
            </article>
            <p className="prompt">Pulsa varias veces. ¿Qué valor conserva React entre un renderizado y el siguiente?</p>
        </section>
    )
}