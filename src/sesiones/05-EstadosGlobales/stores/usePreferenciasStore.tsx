import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type EstadoPreferencias = {
    mostrarAyuda: boolean
    cambiarMostrarAyuda: (mostrarAyuda: boolean) => void
}

export const usePreferenciasStore = create<EstadoPreferencias>()(
    persist(
        (set) => ({
            mostrarAyuda: false,
            cambiarMostrarAyuda: (mostrarAyuda) => set({ mostrarAyuda})
            }),
        {
            name: 'clase-estados-preferencias',
            partialize: (estado) => ({mostrarAyuda: estado.mostrarAyuda})
        }
    )
)