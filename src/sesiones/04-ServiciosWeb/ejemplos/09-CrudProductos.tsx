import { useEffect, useState, type SubmitEvent } from "react"
import z from "zod"

const URL_PRODUCTOS = 'http://localhost:3001/productos'
const URL_PRODUCTOS_CATEGORIAS = 'http://localhost:3001/categorias'

type Formulario = {
    nombre: string
    precio: string
    cantidad: string
    categoria: string
    disponible: boolean
    condicion: string
    descripcion: string
    fechaIngreso: string
    etiquetas: string[]
}

type Producto = Omit<Formulario, 'precio' | 'cantidad'> & {
    id: string
    precio: number
    cantidad: number
}

type Categoria = {
    id: string
    name: string
}

const formularioInicial: Formulario = {
    nombre: '',
    precio: '',
    cantidad: '',
    categoria: '',
    disponible: true,
    condicion: 'Nuevo',
    descripcion: '',
    fechaIngreso: '',
    etiquetas: []
}

const esquemaFormulario = z.object({
    nombre: z.string().trim().min(1, { error: 'Ingresa el nombre del producto' }),
    descripcion: z.string(),
    fechaIngreso: z.iso.date({ error: 'Ingresa una fecha valida' }),
    etiquetas: z.array(z.enum(["Oferta", "Escolar", "Oficina"]), { error: 'Seleccione una etiquetas' }),
    categoria: z.string().trim().min(1, { error: 'Seleccione una categoria' }),
    disponible: z.boolean(),
    condicion: z.enum(["Nuevo", "Usado", "Reacondicionado"], { error: 'Seleccione una condicion' }),
    precio: z.string().trim().min(1, { error: 'Ingresa el precio' })
        .transform(Number)
        .pipe(
            z.number({ error: 'Ingresa una cantidad valida' })
                .nonnegative({ error: 'La cantidad debe ser mayor o igual a cero' })
        ),
    cantidad: z.string().trim().min(1, { error: 'Ingresa el precio' })
        .transform(Number)
        .pipe(
            z.number({ error: 'Ingresa una cantidad valida' })
                .int({ error: 'La cantidad debe ser un numero valido' })
                .nonnegative({ error: 'La cantidad debe ser mayor o igual a cero' })
        ),
})

export function EjemploCrudProductos() {

    const [formulario, setFormulario] = useState(formularioInicial);
    const [productos, setProductos] = useState<Producto[]>([])
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [idEnEdicion, setIdEnEdicion] = useState<string | null>(null)
    const [resultadoValidacion, setResultadoValidacion] = useState<ReturnType<typeof esquemaFormulario.safeParse> | null>();
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('');

    const erroresValidacion = (resultadoValidacion && !resultadoValidacion.success)
        ? z.flattenError(resultadoValidacion.error).fieldErrors
        : {}

    useEffect(() => {

        const controlador = new AbortController()

        async function cargarProductos() {
            try {

                setCargando(true)
                const response = await fetch(URL_PRODUCTOS, {
                    method: 'GET',
                    signal: controlador.signal,
                    headers: { 'Content-type': 'application/json' }
                })

                if (!response.ok) { throw new Error(`Error HTTP: ${response.status}`) }

                const datos: Producto[] = await response.json()
                setProductos(datos)

            } catch (errorPeticion) {

                if (controlador.signal.aborted) { return }

                console.log('Error en solicitud http', errorPeticion)
                setError('No fue posible cargar los productos. Inicia la API con npm run api y recarga la página.')
            } finally {
                setCargando(false);
            }

        }

        async function cargarCategorias() {
            try {

                setCargando(true)
                const response = await fetch(URL_PRODUCTOS_CATEGORIAS, {
                    method: 'GET',
                    signal: controlador.signal,
                    headers: { 'Content-type': 'application/json' }
                })

                if (!response.ok) { throw new Error(`Error HTTP: ${response.status}`) }

                const datos: Categoria[] = await response.json()
                setCategorias(datos)

            } catch (errorPeticion) {

                if (controlador.signal.aborted) { return }

                console.log('Error en solicitud http', errorPeticion)
                setError('No fue posible cargar los productos. Inicia la API con npm run api y recarga la página.')
            } finally {
                setCargando(false);
            }

        }
        cargarCategorias();
        cargarProductos();
        return () => controlador.abort();
    }, [])

    async function guardarProducto(evento: SubmitEvent<HTMLFormElement>) {

        evento.preventDefault();
        setError('')
        setMensaje('')

        const validacion = esquemaFormulario.safeParse(formulario);
        setResultadoValidacion(validacion);

        if (!validacion.success) { return }

        try {

            setCargando(true);

            const url = idEnEdicion === null ? `${URL_PRODUCTOS}` : `${URL_PRODUCTOS}/${idEnEdicion}`
            const respuesta = await fetch(`${url}`, {
                method: idEnEdicion === null ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validacion.data)
            })

            if (!respuesta.ok) { throw new Error(`Error HTTP: ${respuesta.status}`) }

            const productoGuardado: Producto = await respuesta.json()

            if (idEnEdicion === null) {
                setProductos((productosActuales) => [...productosActuales, productoGuardado])
            } else {
                //const listaActualizadaProductos = productos.map((producto) => {
                //
                //    if (producto.id === productoGuardado.id) {
                //        return productoGuardado
                //    } else {
                //        return producto
                //    }
                //})
                //setProductos(listaActualizadaProductos)
                setProductos((productosActuales) => productosActuales.map((producto) => (
                    producto.id === idEnEdicion ? productoGuardado : producto
                )))
            }

            limpiarFormulario();
            setMensaje(idEnEdicion === null ? 'Producto agregado...' : 'Producto Actualizado')

        } catch (errorPeticion) {
            console.error(`Error en llamada http: ${errorPeticion}`)
            setError('No fue posible guardar el producto, revisa que puedas acceder y este levantada la API')
        } finally {
            setCargando(false)
        }
    }

    async function eliminarProducto(id: string) {

        if (idEnEdicion === id) { limpiarFormulario() }

        setError('')
        setMensaje('')

        try {

            setCargando(true)

            const response = await fetch(`${URL_PRODUCTOS}/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) { throw new Error(`Error HTTP: ${response.status}`) }



            setProductos((productosActuales) => productosActuales.filter((producto) => producto.id !== id));
            setMensaje(`El producto con id ${id} fue eliminado`)


        } catch (errorPeticion) {
            console.error(`Error en llamada http: ${errorPeticion}`)
            setError('No fue posible eliminar el producto, revisa que puedas acceder y este levantada la API')
        } finally {
            setCargando(false);
        }



    }

    async function editarProducto(producto: Producto) {
        setIdEnEdicion(producto.id);
        setFormulario({
            nombre: producto.nombre,
            precio: String(producto.precio),
            cantidad: String(producto.cantidad),
            categoria: producto.categoria,
            disponible: producto.disponible,
            condicion: producto.condicion,
            descripcion: producto.descripcion,
            fechaIngreso: producto.fechaIngreso,
            etiquetas: producto.etiquetas
        })
        setResultadoValidacion(null)
        setError('')
        setMensaje('');
    }

    function limpiarFormulario() {
        setFormulario(formularioInicial)
        setIdEnEdicion(null);
        setResultadoValidacion(null)
        setError('')
        setMensaje('')
    }

    return (
        <section className="lesson" id="crud-productos">
            <header className="lesson-heading">
                <span className="lesson-number">09</span>
                <h2 id="crud-productos-title">CRUD (Create, Read, Update, Delete) de productos con json server</h2>
            </header>

            <p>Retomamos los formularios controlados y las listas. El formulario y la tabla comparten el estado del mismo componente: al guardar un producto, React vuelve a mostrar la lista actualizada.</p>
            <p>CRUD significa crear, leer, actualizar y eliminar. JSON Server expone una API REST a partir de <code>data/productos.json</code> y guarda allí los cambios. El estado de React conserva la lista que mostramos en pantalla.</p>
            <p>Desde la carpeta <code>clase-estados-forms</code>, inicia la API con <code>npm run api</code> y, en otra terminal, la aplicación con <code>npm run dev</code>. El recurso está en <code>http://localhost:3001/productos</code>.</p>
            <pre><code>{"GET    /productos      → consultar la lista\nPOST   /productos      → crear un producto\nPATCH  /productos/:id  → actualizar un producto\nDELETE /productos/:id  → eliminar un producto"}</code></pre>

            <h3>1. Guardar los datos del formulario</h3>
            <p>Todos los campos se agrupan en un solo estado: <code>formulario</code>. Cada <code>onChange</code> crea una copia con <code>...formulario</code> y actualiza el campo correspondiente, conservando los demás. Los controles usan <code>value</code> o <code>checked</code> para leer su valor. Aunque el input sea de tipo <code>number</code>, su <code>value</code> es un texto; Zod comprueba que no esté vacío, lo convierte con <code>transform(Number)</code> y valida el número con <code>pipe</code>. El precio no puede ser negativo y la cantidad debe ser un entero mayor o igual a cero.</p>
            <pre><code>{"type Formulario = {\n  nombre: string\n  precio: string\n  cantidad: string\n  categoria: string\n  disponible: boolean\n  condicion: string\n  descripcion: string\n  fechaIngreso: string\n  etiquetas: string[]\n}\n\nconst formularioInicial: Formulario = {\n  nombre: '',\n  precio: '',\n  cantidad: '',\n  categoria: '',\n  disponible: true,\n  condicion: 'Nuevo',\n  descripcion: '',\n  fechaIngreso: '',\n  etiquetas: [],\n}\n\nconst [formulario, setFormulario] = useState(formularioInicial)\nconst [idEnEdicion, setIdEnEdicion] = useState<string | null>(null)"}</code></pre>

            <p>Como en la sesión de formularios, <code>safeParse</code> valida todos los campos sin lanzar una excepción. Guardamos el resultado en el estado y usamos <code>z.flattenError(resultadoValidacion.error).fieldErrors</code> para agrupar los mensajes por campo. Si falla, mostramos cada error junto a su control y no enviamos la petición. Los errores se actualizan al volver a enviar y se limpian al cancelar o editar otro producto. Si tiene éxito, <code>validacion.data</code> contiene el nombre sin espacios en los extremos y los valores numéricos. Usamos <code>noValidate</code> para que los mensajes provengan de Zod.</p>
            <pre><code>{"const [resultadoValidacion, setResultadoValidacion] = useState<ReturnType<typeof esquemaProducto.safeParse> | null>(null)\n\nconst erroresValidacion = resultadoValidacion && !resultadoValidacion.success\n  ? z.flattenError(resultadoValidacion.error).fieldErrors\n  : {}\n\nconst validacion = esquemaProducto.safeParse(formulario)\nsetResultadoValidacion(validacion)\n\nif (!validacion.success) {\n  return\n}\n\n// Solo enviamos los datos validados y transformados.\nbody: JSON.stringify(validacion.data)"}</code></pre>

            <p>El select usa <code>value</code> para la categoría. El checkbox usa <code>checked</code> y entrega un booleano mediante <code>evento.target.checked</code>. Los radios comparten el atributo <code>name</code> y comparan su valor con el estado de condición para permitir una sola selección. Zod valida las opciones con <code>z.enum</code> y la disponibilidad con <code>z.boolean</code>: desmarcar el checkbox también es válido.</p>
            <pre><code>{"<select value={formulario.categoria} onChange={(evento) => setFormulario({ ...formulario, categoria: evento.target.value })}>...</select>\n\n<input type=\"checkbox\" checked={formulario.disponible}\n  onChange={(evento) => setFormulario({ ...formulario, disponible: evento.target.checked })} />\n\n<input type=\"radio\" name=\"condicion-producto\" value=\"Nuevo\"\n  checked={formulario.condicion === 'Nuevo'}\n  onChange={(evento) => setFormulario({ ...formulario, condicion: evento.target.value })} />"}</code></pre>

            <p>La descripción usa un <code>textarea</code> y conserva el texto con sus saltos de línea. La fecha usa <code>type="date"</code>: su valor se envía como texto <code>YYYY-MM-DD</code> y Zod lo comprueba con <code>z.iso.date</code>. No necesitamos convertirla a un objeto <code>Date</code>.</p>
            <p>El select de etiquetas usa <code>multiple</code>. Su <code>value</code> es un arreglo de textos, y <code>selectedOptions</code> contiene todas las opciones seleccionadas. Con <code>Array.from</code> obtenemos sus valores. En JSON se guarda un arreglo como <code>["Oferta", "Escolar"]</code>; sin selección enviamos <code>[]</code>. La descripción vacía y el arreglo vacío también son válidos.</p>
            <pre><code>{"<select multiple value={formulario.etiquetas} onChange={(evento) => {\n  const seleccionadas = Array.from(\n    evento.target.selectedOptions,\n    (opcion) => opcion.value,\n  )\n  setFormulario({ ...formulario, etiquetas: seleccionadas })\n}}>...</select>\n\n// Al editar recuperamos los valores recibidos de la API:\nsetFormulario({\n  nombre: producto.nombre,\n  precio: String(producto.precio),\n  cantidad: String(producto.cantidad),\n  categoria: producto.categoria,\n  disponible: producto.disponible,\n  condicion: producto.condicion,\n  descripcion: producto.descripcion,\n  fechaIngreso: producto.fechaIngreso,\n  etiquetas: producto.etiquetas,\n})"}</code></pre>

            <h3>2. Consultar y agregar productos</h3>
            <p>Al montar el componente, <code>useEffect</code> carga los productos con GET. Al enviar el formulario, <code>preventDefault()</code> evita recargar la página y POST envía los datos como JSON. JSON Server genera el id y devuelve el producto guardado. Solo después de comprobar <code>respuesta.ok</code> lo agregamos al estado con <code>...</code>.</p>
            <pre><code>{"const respuesta = await fetch(URL_PRODUCTOS, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(validacion.data),\n})\n\nif (!respuesta.ok) {\n  throw new Error(`Error HTTP: ${respuesta.status}`)\n}\n\nconst productoGuardado = await respuesta.json()\nsetProductos((productosActuales) => [\n  ...productosActuales,\n  productoGuardado,\n])"}</code></pre>

            <h3>3. Editar usando el mismo formulario</h3>
            <p>Editar copia los datos al formulario y guarda su identificador en <code>idEnEdicion</code>. Si vale <code>null</code>, enviamos POST; si tiene un identificador, enviamos PATCH a ese producto. Con <code>map</code> reemplazamos solamente el producto que la API actualizó. Cancelar limpia el formulario sin enviar una petición.</p>
            <pre><code>{"const url = idEnEdicion === null\n  ? URL_PRODUCTOS\n  : `${URL_PRODUCTOS}/${idEnEdicion}`\n\n// El cuerpo JSON contiene todos los campos validados en ambos casos.\nmethod: idEnEdicion === null ? 'POST' : 'PATCH'\n\n// Tras recibir el producto actualizado:\nsetProductos((productosActuales) => productosActuales.map((producto) => (\n  producto.id === idEnEdicion ? productoGuardado : producto\n)))"}</code></pre>

            <h3>4. Eliminar y manejar errores</h3>
            <p>DELETE usa el id en la URL. Cuando la API confirma la eliminación, <code>filter</code> construye la lista sin ese producto. Si falla una petición, mostramos un error y conservamos los datos para intentarlo de nuevo. Las escrituras ocurren en los eventos, no en <code>useEffect</code>.</p>
            <pre><code>{"const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {\n  method: 'DELETE',\n})\n\nif (!respuesta.ok) {\n  throw new Error(`Error HTTP: ${respuesta.status}`)\n}\n\nsetProductos((productosActuales) =>\n  productosActuales.filter((producto) => producto.id !== id)\n)"}</code></pre>

            <div className="example-grid">

                <form className="card" noValidate onSubmit={guardarProducto}>
                    <h3>{idEnEdicion === null ? 'Agregar producto' : 'Editar producto'}</h3>
                    <p>
                        <label>
                            Nombre del producto <br />
                            <input type="text" disabled={cargando} value={formulario.nombre} onChange={(evento) => setFormulario({ ...formulario, nombre: evento.target.value })} />
                        </label>
                        {erroresValidacion.nombre ? <span role="alert"><br />{erroresValidacion.nombre.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            Precio <br />
                            <input type="number" disabled={cargando} value={formulario.precio} onChange={(evento) => setFormulario({ ...formulario, precio: evento.target.value })} />
                        </label>
                        {erroresValidacion.precio ? <span role="alert"><br />{erroresValidacion.precio.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            Cantidad <br />
                            <input type="number" disabled={cargando} value={formulario.cantidad} onChange={(evento) => setFormulario({ ...formulario, cantidad: evento.target.value })} />
                        </label>
                        {erroresValidacion.cantidad ? <span role="alert"><br />{erroresValidacion.cantidad.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            Categoria <br />
                            <select name="categoria" disabled={cargando} value={formulario.categoria} onChange={(evento) => setFormulario({ ...formulario, categoria: evento.target.value })}>
                                <option value="">Selecciona una categoria </option>
                                {categorias.map((categoria) => <option value={categoria.id} key={categoria.id}>{categoria.name}</option>)}
                            </select>
                        </label>
                        {erroresValidacion.categoria ? <span role="alert"><br />{erroresValidacion.categoria.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" disabled={cargando} checked={formulario.disponible} onChange={(evento) => setFormulario({ ...formulario, disponible: evento.target.checked })} /> Disponible para la venta
                        </label>
                        {erroresValidacion.disponible ? <span role="alert"><br />{erroresValidacion.disponible.join(' ')}</span> : null}
                    </p>
                    <p>
                        <fieldset disabled={cargando}>
                            <legend>Condicion del producto</legend>
                            <label><input type="radio" name="condicion" value="Nuevo" /> Nuevo</label>
                            <label><input type="radio" name="condicion" value="Usado" /> Usado</label>
                            <label><input type="radio" name="condicion" value="Reacondicionado" /> Reacondicionado</label>
                        </fieldset>
                        {erroresValidacion.condicion ? <span role="alert"><br />{erroresValidacion.condicion.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            Descripcion opcional <br />
                            <textarea rows={3} disabled={cargando} value={formulario.descripcion} onChange={(evento) => setFormulario({ ...formulario, descripcion: evento.target.value })} />
                        </label>
                        {erroresValidacion.descripcion ? <span role="alert"><br />{erroresValidacion.descripcion.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            Fecha Ingreso <br />
                            <input type="date" disabled={cargando} value={formulario.fechaIngreso} onChange={(evento) => setFormulario({ ...formulario, fechaIngreso: evento.target.value })} />
                        </label>
                        {erroresValidacion.fechaIngreso ? <span role="alert"><br />{erroresValidacion.fechaIngreso.join(' ')}</span> : null}
                    </p>
                    <p>
                        <label>
                            Etiquetas <br />
                            <select multiple size={3} disabled={cargando} value={formulario.etiquetas} onChange={(evento) => setFormulario({ ...formulario, etiquetas: Array.from(evento.target.selectedOptions, (options) => options.value) })}>
                                <option>Oferta</option>
                                <option>Escolar</option>
                                <option>Oficina</option>
                            </select>
                        </label>
                        {erroresValidacion.etiquetas ? <span role="alert"><br />{erroresValidacion.etiquetas.join(' ')}</span> : null}
                    </p>
                    <button className="button" type="submit" disabled={cargando}>
                        {idEnEdicion === null ? 'Agregar Producto' : 'Guardar cambios'}
                    </button>
                    {idEnEdicion !== null ? (
                        <button className="button" type="button" disabled={cargando} onClick={limpiarFormulario}>Cancelar Edicion</button>
                    ) : null

                    }
                </form>

                <article className="card">
                    <h3>Lista de productos</h3>
                    {cargando ? <p role="status">Cargando productos....</p> : productos.length === 0 ? <p>Todavia no hay productos, agrega uno en el formulario primero</p> : (
                        <div className="table-scroll">
                            <table>
                                <caption>Productos de JSON server</caption>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>cantidad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>
                                                <div>{producto.nombre}</div>
                                                <div>{categorias.find((categoria) => producto.categoria === categoria.id)?.name || 'Sin categoria'} · {producto.condicion} · {producto.disponible ? 'Disponible' : 'No disponible'}</div>
                                                <div>{producto.descripcion || 'Sin descripción'}</div>
                                                <div>Ingreso: {producto.fechaIngreso} · Etiquetas: {producto.etiquetas.join(', ') || 'Sin etiquetas'}</div>
                                            </td>
                                            <td>{producto.precio}</td>
                                            {producto.precio <= 100 && <span><strong>Producto en oferta!</strong></span>}
                                            <td>{producto.cantidad}</td>
                                            <td>
                                                <button className="button" type="button" disabled={cargando} onClick={() => editarProducto(producto)} >Editar</button>
                                                {' '}
                                                <button className="button" type="button" disabled={cargando} onClick={() => eliminarProducto(producto.id)} >Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </article>
            </div >


            {error ? <p role="alert">{error}</p> : null}
            {cargando ? <p role="status">Cargando...</p> : null}
            {mensaje ? <p role="status">{mensaje}</p> : null}
            <p className="prompt">Escribe una descripción con dos líneas, elige una fecha y selecciona dos etiquetas. Guarda, recarga la página y pulsa Editar: los controles recuperan los valores de la API. Repite dejando la descripción y las etiquetas vacías. Luego elimínalo y revisa la pestaña Network. ¿Qué método HTTP se usó en cada operación?</p>
        </section >
    )

}
