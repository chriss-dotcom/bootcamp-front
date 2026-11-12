import { useEffect, useState } from "react";
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

export function EjemploCarritoProductos(){

    // Estados de componentes
    const [cargando, setCargando] = useState(false);
    const [productos, setProductos] = useState<ProductoCatalogo[]>([])
    const [error, setError] = useState(' ')

    // Estados Globales
    // items del carrito
    const items = useCarritoStore((estado) => estado.items)
    const agregar = useCarritoStore((estado) => estado.agregar)
    const quitar = useCarritoStore((estado) => estado.quitar)
    const eliminar = useCarritoStore((estado) => estado.eliminar)
    const vaciar = useCarritoStore((estado) => estado.vaciar)

    const total = items.reduce((acumulador, item) => acumulador + item.producto.precio * item.cantidad, 0)

    useEffect(() => {

        const controlador = new AbortController();

        async function cargarProductos() {
            
            try{
                setCargando(true)
                const respuesta = await fetch(`${URL_PRODUCTOS}`, {
                    signal: controlador.signal
                })

                if (!respuesta.ok){ throw new Error(`Error HTTP: ${respuesta.status}`)}

                const validacion = esquemaCatalogo.safeParse(await respuesta.json())

                if(!validacion.success){ throw new Error(`La API devolvio un catalogo de productos invalidos.`)}

                setProductos(validacion.data);

            }catch(errorPeticion){
                console.log(errorPeticion)
                setError("No fue posible cargar el catalogo de productos, revisar el API.")
            }finally{
                setCargando(false)
            }
            
        }

        cargarProductos();

        return () => controlador.abort();
    }, [])

    return(
        <>
        </>
    )
}