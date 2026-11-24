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
        // Esta es la clave que puedes buscar en localStorage después de cambiar la casilla.
        name: 'bootcamp-react-preferencias',
        // Elegimos guardar solo mostrarAyuda. Al recargar recuperamos ese valor y el código vuelve a crear la acción para cambiarlo.
        partialize: (estado) => ({mostrarAyuda: estado.mostrarAyuda})
    }
))
