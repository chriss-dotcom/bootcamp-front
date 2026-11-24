import { create } from 'zustand'

type EstadoContador = {
    contador: number
    incrementar: () => void
    reiniciar: () => void
}

// En la primera llamada indicamos el tipo del store. La función que obtenemos recibe abajo el estado inicial y sus acciones.
const funcionCreacionStore = create<EstadoContador>()

export const useContadorStore = funcionCreacionStore((set)=>({
    contador: 0,
    // set recibe una función cuando necesitamos el contador actual para calcular el siguiente. Al reiniciar ya sabemos que queremos 0.
    incrementar : () => set((estado) => ({contador: estado.contador + 1})),
    reiniciar : () => set({contador:0}),
}))