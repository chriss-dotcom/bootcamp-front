import { create } from 'zustand'

type EstadoContador = {
    contador: number
    incrementar: () => void
    reiniciar: () => void
}

const funcionCreacionStore = create<EstadoContador>()

export const useContadorStore = funcionCreacionStore((set)=>({
    contador: 0,
    incrementar : () => set((estado) => ({contador: estado.contador + 1})),
    reiniciar : () => set({contador:0}),
}))