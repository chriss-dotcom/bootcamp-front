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
    vaciar: () => void
}

export const useCarritoStore = create<EstadoCarrito>()(
    (set) => ({
        items: [],
        agregar: (producto) => set((estado) => ({
            items: estado.items.some((item) => item.producto.id === producto.id)
            ? {...estado.agregar[1]} :{...estado.agregar[0]}})
        ),
        quitar: (id) => set((estado)=> ({
            items: estado.items.filter((item) => item.producto.id !== id)
        })) ,
        vaciar: () => set({items: []})
    })
)