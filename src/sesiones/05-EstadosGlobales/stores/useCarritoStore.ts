import { id } from "zod/locales";
import { create } from "zustand";

export type  ProductoCarrito = {
    id: string
    precio: number
    nombre: string
}

type ItemCarrito = {
    producto: ProductoCarrito,
    cantidad: number
}

type EstadoCarrito = {
    items: ItemCarrito[]
    agregar: (producto:ProductoCarrito ) => void
    quitar: (id: string) => void 
    eliminar: (id: string) => void 
    vaciar: () => void
}

export const useCarritoStore = create<EstadoCarrito>()(
    (set) => ({
        items: [],
        agregar: (producto) => set((estadoActual) => ({
            items: 

            // Esta logica valida si el producto esta o no en el arreglo de items[]
            estadoActual.items.some((item) => item.producto.id === producto.id)
                ? 
                // Conseguir el arreglo de items actualizado.
                // esta logica solo se preocupa de actualizar las cantidades unicamente
                // si el producto ya existe en el arreglo
                estadoActual.items.map((item) => item.producto.id === producto.id
                // tratar la posicion del arreglo de items de forma individual si existe
                ? {...item, cantidad: item.cantidad + 1}
                // esto sucede si no es igual el id
                : item
                )
                :
                [...estadoActual.items, {producto: producto, cantidad: 1}]
            

            // Esta forma no sirve porque duplica cada producto que se va agregando.
            //[...estadoActual.items, {producto: producto, cantidad: 1}]
        })),
        quitar: (id) => set((estadoActual) => ({
            items:
                estadoActual.items.map(
                    (item) => item.producto.id === id 
                    ? {...item, cantidad: item.cantidad - 1}
                    : item
                ).filter((item) => item.cantidad > 0)

        })),
        eliminar: (id) => set((estado)=> ({
            items: estado.items.filter((item) => item.producto.id !== id)
        })) ,
        vaciar: () => set({items: []})
    })
)