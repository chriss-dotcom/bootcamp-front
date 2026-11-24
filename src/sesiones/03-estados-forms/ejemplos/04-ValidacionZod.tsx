import { useState } from "react"
import { z } from "zod"

type Formulario = {
    nombre: string
    direccion: string
    correo: string
    curso: string
    jornada: string
    condiciones: boolean
    comentario: string
}
let listaCursos = ['React', 'JavaScript'];

// Acá describimos qué aceptamos al enviar. Por ejemplo, trim() quita los espacios de los extremos antes de comprobar el largo del nombre.
const esquemaFormulario = z.object({
    nombre: z.string().trim()
        .min(1, { error: 'Ingresa tu nombre' })
        .max(64, { error: 'El nombre no puede tener mas de 64 caracteres' }),
    direccion: z.string().trim()
        .min(1, { error: 'Ingresa tu direccion' })
        .max(128, { error: 'La direccion no puede tener mas de 128 caracteres' }),
    correo: z.email({ error: 'El correo es invalido' }),
    curso: z.enum(listaCursos, { error: 'Selecciona un curso' }),
    jornada: z.enum(['Mañana', 'Tarde', 'Ambas'], { error: 'Selecciona una jornada' }),
    comentario: z.string().trim()
        .max(200, { error: 'El comentario puede tener hasta 200 caracteres' }),
    // Si usamos z.boolean(), false también pasa. Con literal(true) pedimos que la persona haya marcado la casilla.
    condiciones: z.literal(true, { error: 'Debes aceptar las condiciones' }),
})

type ResultadoValidacionType = ReturnType<typeof esquemaFormulario.safeParse>

export function EjemploValidacionZod() {

    const [resultadoValidacion, setResultadoValidacion] = useState<ResultadoValidacionType | null>(null);

    const [formulario, setFormulario] = useState<Formulario>({
        nombre: "Jose",
        direccion: "",
        correo: "",
        curso: "",
        jornada: "Mañana",
        condiciones: false,
        comentario: ""
    })

    // fieldErrors agrupa los mensajes por nombre de campo. Así mostramos el error de correo al lado del correo.
    const errores = resultadoValidacion && !resultadoValidacion.success ? z.flattenError(resultadoValidacion.error).fieldErrors : {}

    function enviarFormulario(evento: React.SubmitEvent<HTMLFormElement>) {
        evento.preventDefault()
        // Si success vale true, data contiene los datos validados. Si vale false, leemos error para mostrar qué campo hay que corregir.
        setResultadoValidacion(esquemaFormulario.safeParse(formulario))
    }

    function cambioInput(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setFormulario({
            ...formulario,
            [evento.target.name]: (evento.target instanceof HTMLInputElement && evento.target.type === "checkbox") ?
                evento.target.checked
                :
                evento.target.value
        })
    }
    return (
        <>
            <section className="lesson" id="validacion-zod" aria-labelledby="validacion-zod-title">
                <header className="lesson-heading">
                    <span className="lesson-number">04</span>
                    <h2 id="validacion-zod-title">Validar el formulario con Zod</h2>
                </header>
                <p>Al enviar, <code>safeParse</code> comprueba el formulario. Si algún dato falla, mostramos el mensaje junto al campo que debes revisar.</p>
                <pre><code>{"const resultado = esquemaFormulario.safeParse(formulario)\nif (!resultado.success) {\n  const errores = z.flattenError(resultado.error).fieldErrors\n  console.log(errores)\n}"}</code></pre>

                <form className="card" noValidate onSubmit={enviarFormulario}>
                    <p>
                        <label>
                            Nombre<br />
                            <input required name="nombre" value={formulario.nombre} onChange={cambioInput} />
                        </label>
                        {errores.nombre?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    </p>
                    <p>
                        <label>
                            Dirección<br />
                            <input required name="direccion" value={formulario.direccion} onChange={cambioInput} />
                        </label>
                        {errores.direccion?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    </p>
                    <p>
                        <label>
                            Correo<br />
                            <input type="email" name="correo" value={formulario.correo} onChange={cambioInput} />
                        </label>
                        {errores.correo?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    </p>
                    <p>
                        <label>
                            Curso<br />
                            <select name="curso" value={formulario.curso} onChange={cambioInput} >
                                <option value="">Seleccione...</option>
                                {listaCursos.map((curso) => <option key={curso} value={curso}>{curso}</option>)}
                            </select>
                        </label>
                        {errores.curso?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    </p>
                    <fieldset>
                        <legend>Jornada</legend>
                        <label><input type="radio" name="jornada" value="Tarde" checked={formulario.jornada === "Tarde"} onChange={cambioInput} /> Tarde</label><br />
                        <label><input type="radio" name="jornada" value="Ambas" checked={formulario.jornada === "Ambas"} onChange={cambioInput} /> Ambas</label><br />
                        <label><input type="radio" name="jornada" value="Mañana" checked={formulario.jornada === "Mañana"} onChange={cambioInput} /> Mañana</label><br />
                    </fieldset>
                    {errores.jornada?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    <p>
                        <label>
                            Comentario opcional<br />
                            <textarea rows={3} name="comentario" value={formulario.comentario} onChange={cambioInput} />
                        </label>
                        {errores.comentario?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    </p>
                    <p>
                        <label>
                            <input name="condiciones" type="checkbox" checked={formulario.condiciones} onChange={cambioInput} /> Acepto las condiciones
                        </label>
                        {errores.condiciones?.map((mensaje) => <span key={mensaje} role="alert"><br />{mensaje}</span>)}
                    </p>
                    <button className="button" type="submit">Inscribirme</button>
                    {resultadoValidacion?.success && <p role="status">Los datos del formulario son válidos.</p>}
                </form>

            </section >
        </>
    )
}