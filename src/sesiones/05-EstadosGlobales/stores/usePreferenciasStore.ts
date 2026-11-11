import { create } from "zustand"
import { persist } from "zustand/middleware"

type EstadoPreferfencias = {
    mostrarAyuda: boolean
    cambiarMostrarAyuda: (parametro: boolean) => void
}

export const usePrefenciasStore = create<EstadoPreferfencias>()(
    persist(
    (set) => ({
    mostrarAyuda: false,
    cambiarMostrarAyuda : (mostrarAyuda) => set({mostrarAyuda})
    }),
    {
        name: 'clase-estados-preferencias',
        partialize: (estado) => ({mostrarAyuda: estado.mostrarAyuda})
    }
))
