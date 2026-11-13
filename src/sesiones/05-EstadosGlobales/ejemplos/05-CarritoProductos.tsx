import { useEffect, useState } from "react"
import z from "zod";
import { useCarritoStore } from "../stores/useCarritoStore";

const URL_PRODUCTOS = 'http://localhost:3001/productos'

const esquemaCatalogo = z.array(z.object({
    id: z.string().min(1),
    nombre: z.string().min(1),
    precio: z.number().nonnegative(),
    disponible: z.boolean()
}))

type ProductoCatalogo = z.infer<typeof esquemaCatalogo>[number]

export function EjemploCarritoProductos() {

    // estados de componentes
    const [cargando, setCargando] = useState(false);
    const [productos, setProductos] = useState<ProductoCatalogo[]>([])
    const [error, setError] = useState('')

    //estados globales
    //items del carrito
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

    return (
        <section className="lesson" id="carrito-productos">

            <h3>Catalogo</h3>
            {cargando ? <p role="status">Cargando catalogo...</p> : error ? <p role="status">{error}</p> : productos.length === 0 ? <p>No hay productos disponibles</p> : (
                <div className="example-grid">
                    {productos.map((producto) => (
                        <article key={producto.id} className="card">
                            <img className="producto-imagen" src={`https://placehold.co/480x300/eaf2ec/21634?text=${encodeURIComponent(producto.nombre)}`} alt="" />
                            <h4>{producto.nombre}</h4>
                            <p>Precio: ${producto.precio}</p>
                            <p>{producto.disponible ? 'Disponible' : 'No Disponible'}</p>
                            <button className="button" type="button" disabled={!producto.disponible} onClick={() => agregar(producto)}>Agregar al carrito</button>
                        </article>
                    ))}
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
                                    <button className="button" type="button" onClick={() => agregar(item.producto)}>+</button>
                                    <button className="button" type="button" onClick={() => eliminar(item.producto.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <p>Total: ${total}</p>
                <button className="button" type="button" disabled={items.length === 0} onClick={vaciar}>Vaciar Carrito</button>
            </article>
        </section>
    )
}