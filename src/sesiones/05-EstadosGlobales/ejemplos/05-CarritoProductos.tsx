import { useEffect, useState } from "react"
import z from "zod";
import { useCarritoStore } from "../stores/useCarritoStore";

const URL_PRODUCTOS = 'http://localhost:3001/productos'

<<<<<<< HEAD
const esquemaCatalogo = z.array(
    z.object({
        id: z.coerce.string().min(1),
        nombre: z.string().min(1),
        precio: z.coerce.number().nonnegative(),
        cantidad: z.number().nonnegative()
    }).transform(({cantidad, ...producto }) => ({
        ...producto,
        stock: cantidad,
        disponible: cantidad > 0
    }))
)

=======
const esquemaCatalogo = z.array(z.object({
    id: z.string().min(1),
    nombre: z.string().min(1),
    precio: z.number().nonnegative(),
    disponible: z.boolean()
}))

// z.infer nos da el tipo del arreglo validado. Con [number] sacamos el tipo de un solo producto para usarlo en el catálogo.
>>>>>>> upstream/main
type ProductoCatalogo = z.infer<typeof esquemaCatalogo>[number]

export function EjemploCarritoProductos() {

<<<<<<< HEAD
    // estados de componentes
=======
    // Solo esta vista necesita saber si el catálogo está cargando o si falló la petición.
>>>>>>> upstream/main
    const [cargando, setCargando] = useState(false);
    const [productos, setProductos] = useState<ProductoCatalogo[]>([])
    const [error, setError] = useState('')

<<<<<<< HEAD
    //estados globales
    //items del carrito
=======
    // El carrito también se muestra en la cabecera. Ambos componentes leen los productos elegidos del mismo store.
>>>>>>> upstream/main
    const items = useCarritoStore((estado) => estado.items)
    const agregar = useCarritoStore((estado) => estado.agregar)
    const quitar = useCarritoStore((estado) => estado.quitar)
    const eliminar = useCarritoStore((estado) => estado.eliminar)
    const vaciar = useCarritoStore((estado) => estado.vaciar)

    const total = items.reduce((acumulador, item) => acumulador + item.producto.precio * item.cantidad, 0)

    useEffect(() => {

        const controlador = new AbortController();

        async function cargarProductos() {
            try {
                setCargando(true)
                const respuesta = await fetch(`${URL_PRODUCTOS}`, {
                    signal: controlador.signal
                })

                if (!respuesta.ok) { throw new Error(`Error HTTP: ${respuesta.status}`) }

                const validacion = esquemaCatalogo.safeParse(await respuesta.json())


                if (!validacion.success) {
<<<<<<< HEAD
                    console.error(validacion.error.issues)
=======
>>>>>>> upstream/main
                    throw new Error(`La API devolvio un catalogo de productos invalido`)
                }


                if (!controlador.signal.aborted) {
                    setProductos(validacion.data);
                }




            } catch (errorPeticion) {
                if (!controlador.signal.aborted) {
                    console.log(errorPeticion)
                    setError("No fue posible cargar el catalogo de productos, revisar el API")
                }

            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false)
                }
            }
        }

        cargarProductos();

        return () => controlador.abort();
    }, [])

<<<<<<< HEAD
    //console.table(productos.map((p) => ({ nombre: p.nombre, stock: p.stock, disponible: p.disponible })))

    return (
        <section className="lesson" id="carrito-productos">

            <h3>Catalogo</h3>
            {cargando ? <p role="status">Cargando catalogo...</p> : error ? <p role="status">{error}</p> : productos.length === 0 ? <p>No hay productos disponibles</p> : (
                <div className="example-grid">
                    {productos.map((producto) => {
                         const enCarrito = items.find((item) => item.producto.id === producto.id)?.cantidad ?? 0
                         const restantes = producto.stock - enCarrito
                         const sinStock = restantes <= 0

                    return (
                        <article key={producto.id} className="card">
                            <img className="producto-imagen" src={`https://placehold.co/480x300/eaf2ec/21634?text=${encodeURIComponent(producto.nombre)}`} alt="" />
                            <h4>{producto.nombre}</h4>
                            <p>Precio: ${producto.precio}</p>
                            <p>{sinStock ? 'No Disponible' : `Disponible (quedan: ${restantes} Unidad)`}</p>
                            <button className="button" type="button" disabled={sinStock} onClick={() => agregar(producto)}>Agregar al carrito</button>
                        </article>
                    )
                    })}
                </div>
            )}

            <article className="card">
                <h3 id="resumen-carrito-title">Tu carrito</h3>
                {items.length === 0 ? <p>El carrito esta vacio</p> : (
                    <ul className="carrito-lista">
                        {items.map((item) => (
                            <li key={item.producto.id}>
                                <div className="producto-carrito">
                                    <img className="producto-imagen carrito-imagen" src={`https://placehold.co/480x300/eaf2ec/21634?text=${encodeURIComponent(item.producto.nombre)}`} alt="" width="480" height="300" />
                                    <p>{item.producto.nombre} - Unidades: {item.cantidad} - Subtotal: ${item.producto.precio * item.cantidad}</p>
                                </div>
                                <div className="carrito-controles">
                                    <button className="button" type="button" onClick={() => quitar(item.producto.id)}>-</button>
                                    <button className="button" type="button" disabled={item.cantidad >= item.producto.stock} onClick={() => agregar(item.producto)}>+</button>
                                    <button className="button" type="button" onClick={() => eliminar(item.producto.id)}>
=======
    return (
        <section className="lesson" id="carrito-productos" aria-labelledby="carrito-productos-title">
            <header className="lesson-heading">
                <span className="lesson-number">05</span>
                <h2 id="carrito-productos-title">Un carrito con productos de JSON Server</h2>
            </header>
            <p>Desde la raíz de <code>bootcamp-react</code>, inicia la API con <code>pnpm run jserver</code> y la aplicación con <code>pnpm run dev</code> en otra terminal. Consultamos <code>GET http://localhost:3001/productos</code> y validamos la respuesta con Zod.</p>
            <p>El catálogo y sus estados de carga viven en este componente. Los productos elegidos viven en <code>stores/useCarritoStore.ts</code>: así el carrito y el badge del encabezado leen el mismo estado global.</p>
            <pre><code>{"import { create } from 'zustand'\n\nexport type ProductoCarrito = {\n  id: string\n  nombre: string\n  precio: number\n}\n\ntype ItemCarrito = {\n  producto: ProductoCarrito\n  // Son unidades elegidas por la persona, no existencias del inventario de la API.\n  cantidad: number\n}\n\ntype EstadoCarrito = {\n  items: ItemCarrito[]\n  agregar: (producto: ProductoCarrito) => void\n  quitar: (id: string) => void\n  eliminar: (id: string) => void\n  vaciar: () => void\n}\n\n// Store en memoria: no usa persist y vuelve a su estado inicial al recargar.\nexport const useCarritoStore = create<EstadoCarrito>()((set) => ({\n  items: [],\n  // set recibe el estado más reciente para no perder cambios entre llamadas sucesivas.\n  agregar: (producto) => set((estado) => ({\n    // some devuelve true o false; el id identifica el producto aunque se repita su nombre.\n    items: estado.items.some((item) => item.producto.id === producto.id)\n      // Si ya existe, map crea otro arreglo y cambia solo el elemento coincidente.\n      ? estado.items.map((item) => item.producto.id === producto.id\n        // Copiamos las propiedades del item y reemplazamos su cantidad, sin mutarlo.\n        ? { ...item, cantidad: item.cantidad + 1 }\n        : item)\n      // Si no existe, copiamos el arreglo y añadimos una línea con una unidad.\n      : [...estado.items, { producto, cantidad: 1 }],\n  })),\n  // Resta una unidad al producto indicado y elimina la línea si su cantidad llega a cero.\n  quitar: (id) => set((estado) => ({\n    items: estado.items.map(\n      (item) => item.producto.id === id\n        // Copiamos el item coincidente y restamos una unidad, sin modificar el original.\n        ? { ...item, cantidad: item.cantidad - 1 }\n        : item)\n      // Conservamos solo las líneas que todavía tienen unidades.\n      .filter((item) => item.cantidad > 0)\n  })),\n  // Elimina la línea completa, independientemente de cuántas unidades tenga.\n  eliminar: (id) => set((estado) => ({\n    items: estado.items.filter((item) => item.producto.id !== id),\n  })),\n  // Solo reemplaza items: las funciones del store siguen disponibles.\n  vaciar: () => set({ items: [] }),\n}))"}</code></pre>
            <p>Si el producto ya está en el carrito, <code>map</code> aumenta sus unidades sin modificar el objeto anterior. Si es nuevo, agregamos una línea. Quitar resta una unidad; si la cantidad llega a cero, retira la línea. La acción <code>eliminar</code> retira la línea completa, sin importar su cantidad. La cantidad del carrito es independiente del campo <code>cantidad</code> de la API: este ejemplo no reserva ni descuenta inventario.</p>
            <pre><code>{"// En Header.tsx, seleccionamos la cantidad total de unidades:\n// Cuenta unidades: dos del mismo producto también cuentan como dos.\n// El selector devuelve un número; no crea objetos o arreglos nuevos.\nconst cantidadProductos = useCarritoStore((estado) =>\n  estado.items.reduce((total, item) => total + item.cantidad, 0)\n)\n\n<span className=\"badge\" role=\"status\">Carrito: {cantidadProductos}</span>\n\n// En el carrito, calculamos el total sin guardarlo como otro estado:\n// El acumulador comienza en 0 y suma precio por cantidad de cada línea.\nconst total = items.reduce(\n  (suma, item) => suma + item.producto.precio * item.cantidad,\n  0,\n)"}</code></pre>
            <h3>Catálogo</h3>
            {cargando ? <p role="status">Cargando catálogo...</p> : error ? <p role="alert">{error}</p> : productos.length === 0 ? <p>No hay productos en el catálogo.</p> : (
                <div className="example-grid">
                    {productos.map((producto) => (
                        <article className="card" key={producto.id}>
                            {/* placehold.co genera la imagen: 480x300 indica ancho y alto en píxeles. */}
                            {/* eaf2ec es el fondo y 21634c el color del texto, en hexadecimal sin #. */}
                            {/* ?text= define el mensaje; encodeURIComponent adapta el nombre para la URL. */}
                            <img className="producto-imagen" src={`https://placehold.co/480x300/eaf2ec/21634c?text=${encodeURIComponent(producto.nombre)}`} alt="" width="480" height="300" loading="lazy" />
                            <h4>{producto.nombre}</h4>
                            <p>Precio: ${producto.precio}</p>
                            <p>{producto.disponible ? 'Disponible' : 'No disponible'}</p>
                            <button className="button" type="button" disabled={!producto.disponible} onClick={() => agregar(producto)} aria-label={`Agregar ${producto.nombre} al carrito`}>Agregar al carrito</button>
                        </article>
                    ))}
                </div>
            )}
            <article className="card" aria-labelledby="resumen-carrito-title">
                <h3 id="resumen-carrito-title">Tu carrito</h3>
                {items.length === 0 ? <p>El carrito está vacío.</p> : (
                    <ul className="carrito-lista">
                        {items.map((item) => (
                            <li key={item.producto.id}>
                                <div className="carrito-producto">
                                    {/* Reutilizamos el placeholder del catálogo; carrito-imagen limita su tamaño visual. */}
                                    {/* encodeURIComponent permite incluir espacios, tildes y símbolos en el parámetro text. */}
                                    <img className="producto-imagen carrito-imagen" src={`https://placehold.co/480x300/eaf2ec/21634c?text=${encodeURIComponent(item.producto.nombre)}`} alt="" width="480" height="300" loading="lazy" />
                                    <p>{item.producto.nombre} · Unidades: {item.cantidad} · Subtotal: ${item.producto.precio * item.cantidad}</p>
                                </div>
                                <div className="carrito-controles" role="group" aria-label={`Acciones para ${item.producto.nombre}`}>
                                    <button className="button" type="button" onClick={() => quitar(item.producto.id)} aria-label={`Restar una unidad de ${item.producto.nombre}`} title="Restar una unidad">−</button>
                                    <button className="button" type="button" onClick={() => agregar(item.producto)} aria-label={`Agregar una unidad de ${item.producto.nombre}`} title="Agregar una unidad">+</button>
                                    <button className="button" type="button" onClick={() => eliminar(item.producto.id)} aria-label={`Eliminar ${item.producto.nombre} del carrito`} title="Eliminar producto del carrito">
>>>>>>> upstream/main
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>
<<<<<<< HEAD

=======
>>>>>>> upstream/main
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <p>Total: ${total}</p>
<<<<<<< HEAD
                <button className="button" type="button" disabled={items.length === 0} onClick={vaciar}>Vaciar Carrito</button>
            </article>
=======
                <button className="button" type="button" disabled={items.length === 0} onClick={vaciar}>Vaciar carrito</button>
            </article>
            <p className="prompt">Agrega dos veces el mismo producto y luego otro. El badge debe contar tres unidades y el carrito mostrar dos líneas. Pulsa − en el producto repetido: el badge debe bajar a dos y conservar ambas líneas. Pulsa + para recuperar la unidad. Usa la papelera para eliminar esa línea completa. Si pulsas − cuando queda una sola unidad, también desaparece la línea. El carrito vive en memoria: al recargar la página vuelve a estar vacío. Ninguna acción del carrito modifica JSON Server.</p>
>>>>>>> upstream/main
        </section>
    )
}