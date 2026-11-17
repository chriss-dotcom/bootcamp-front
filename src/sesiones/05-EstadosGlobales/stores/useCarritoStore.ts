import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductoCarrito = {
    id: string
    precio: number
    nombre: string
    stock: number
}

type ItemCarrito = {
    producto: ProductoCarrito,
    cantidad: number
}

type EstadoCarrito = {
    items: ItemCarrito[]
    agregar: (producto: ProductoCarrito) => void
    quitar: (id: string) => void
    eliminar: (id: string) => void
    vaciar: () => void
}

export const useCarritoStore = create<EstadoCarrito>()(
    (set) => ({
        items: [],
        agregar: (producto) => set((estadoActual) => {

            const existente = estadoActual.items.find((item) => item.producto.id === producto.id)
            // si ya tienes todas las unidades disponibles (o no hay stock), no hace nada
            if((existente?.cantidad ?? 0) >= producto.stock) return estadoActual

            return {
                items: existente?
                //esta logica primero validara si el producto esta o no el el arreglo de items[]
                estadoActual.items.map((item) =>
                   
                //estadoActual.items.some((item) => item.producto.id === producto.id)
                   // ?// conseguir el arreglo de items[] actualizado
                    // esta logica solo se preocupa de actualizar las cantidades unicamente
                    // si el producto ya existe en el arreglo
                   // estadoActual.items.map((item) => item.producto.id === producto.id
                   item.producto.id === producto.id
                        // tratar la posicion de arreglo de items de forma individual si existe
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : //esto pasa si no es igual el id
                        item
                    )
                    : // si el some es falso, es decir no hay productos en la lista que existan con el mismo id.
                    [...estadoActual.items, { producto: producto, cantidad: 1 }]
            // Esta forma no sirve por que repite los productos y los marca siempre con cantidad 1
            //[...estadoActual.items, { producto: producto, cantidad: 1 }]
            }
            
        }),
        quitar: (id) => set((estadoActual) => ({
            items: estadoActual.items.map(
                (item) => item.producto.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ).filter((item) => item.cantidad > 0)
        })),
        eliminar: (id) => set((estado) => ({
            items: estado.items.filter((item) => item.producto.id !== id)
        })),
        vaciar: () => set({ items: [] })
    })
    
)