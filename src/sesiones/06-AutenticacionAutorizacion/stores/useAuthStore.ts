import z from "zod"
import { create } from "zustand"
import { consultarPerfil, solicitarCierre, solicitarToken, type ModoAutenticacion, type UsuarioAutenticado } from "../servicios/autenticacion"
import { persist } from "zustand/middleware"

type EstadoAuth = {
    accessToken: string | null,
    modo: ModoAutenticacion,
    usuario: UsuarioAutenticado | null,
    cargando: boolean,
    error: string,
    iniciarSesion: (username: string, password: string, modo?: ModoAutenticacion) => Promise<boolean>,
    verificarSesion: (modo?: ModoAutenticacion) => Promise<boolean>
    cerrarSesion: () => Promise<void>,
}

const esquemaPersistido = z.object({
    accessToken: z.string().min(1).nullable(),
    modo: z.enum(['header', 'cookie']),
})

const sesionVacia = { accessToken: null, usuario: null, cargando: false, error: '' }

// Las tres acciones comparten esta variable para poder cancelar la petición de sesión que esté en curso.
let controlador = new AbortController()

// abort() avisa al fetch anterior y deja su señal cancelada. Para la siguiente petición necesitamos una señal nueva.
function nuevaPeticion() {
    controlador.abort()
    controlador = new AbortController()
    return controlador.signal
}

export const useAuthStore = create<EstadoAuth>()(
    // El middleware persist envuelve la función que crea el estado y sus acciones.
    // Cuando usamos set, guarda en localStorage los campos elegidos en partialize. Al apretar F5 los recupera con merge.
    persist(
        // Con set actualizamos el store. Con get leemos sus valores y también podemos llamar a otra acción del mismo store.
        (set, get) => ({
            ...sesionVacia,
            modo: 'header',
            iniciarSesion: async (username, password, modo = 'header') => {
                // Esta acción conserva su propia señal y se la pasa a solicitarToken, que la entrega a fetch.
                const signal = nuevaPeticion()
                set({ ...sesionVacia, modo, cargando: true })
                try {
                    const accessToken = await solicitarToken(username, password, modo, signal)
                    // Mientras esperábamos el token pudo empezar otro login. Si canceló esta señal, descartamos el token anterior.
                    if (signal.aborted) return false
                    set({ accessToken })
                    // Ya tenemos el token. Ahora pedimos el perfil en el mismo modo para saber quién entró y qué rol tiene.
                    return await get().verificarSesion(modo);
                } catch (error) {
                    // !signal.aborted evita mostrar un fallo de login cuando nosotros mismos cancelamos la petición.
                    // catch puede recibir cualquier valor. Si el servicio hizo throw new Error(...), instanceof Error da true
                    // y mostramos error.message. Si lanzó un texto, la comprobación da false y usamos el mensaje alternativo.
                    if (!signal.aborted) set({ cargando: false, error: error instanceof Error ? error.message : 'Hubo un error al autenticar' })
                    return false;
                }
            },
            verificarSesion: async (modo = 'header') => {
                const signal = nuevaPeticion()
                const accessToken = get().accessToken;
                set({ usuario: null, modo, cargando: true, error: '' })
                try {

                    if (modo === 'header' && !accessToken) throw new Error('Inicia sesion para obtener un token')

                    const usuario = await consultarPerfil(accessToken, modo, signal)
                    // Si cerramos sesión mientras esperábamos /me, esta señal queda cancelada. Así evitamos volver a guardar el usuario.
                    if (signal.aborted) return false
                    if (!usuario) {
                        set({ ...sesionVacia, error: 'La sesion no es valida o expiro, inicia sesion nuevamente' })
                        return false
                    }
                    set({ usuario })
                    return true
                } catch (error) {
                    if (!signal.aborted) set({ error: error instanceof Error ? error.message : 'No fue posible iniciar sesion' })
                    return false
                } finally {
                    // finally también se ejecuta al cancelar. Solo la petición vigente puede quitar su indicador de carga.
                    if (!signal.aborted) set({ cargando: false })
                }
            },
            cerrarSesion: async () => {
                const signal = nuevaPeticion()
                const { accessToken, modo } = get()
                set({ ...sesionVacia, cargando: true })
                try {
                    await solicitarCierre(accessToken, modo, signal);
                } catch (error) {
                    if (!signal.aborted) set({ error: error instanceof Error ? error.message : 'Se cerro la sesion solo localmente' })
                } finally {
                    if (!signal.aborted) set({ cargando: false })
                }
            },
        })
        ,
        // Estas opciones indican dónde guardar la sesión y qué recuperar al apretar F5.
        {
            name: 'bootcamp-auth',
            // Guardamos token y modo. El perfil y su rol los volvemos a pedir a la API.
            partialize: (estado) => ({ accessToken: estado.accessToken, modo: estado.modo }),
            merge: (estadoLocalStorage, estadoActual) => {
                // merge recibe lo que había en localStorage y el store recién creado. Validamos lo guardado antes de incorporarlo.
                const validacion = esquemaPersistido.safeParse(estadoLocalStorage)
                if (!validacion.success) return { ...estadoActual, ...sesionVacia }
                // Conservamos las acciones del store y recuperamos token y modo. La espera empieza cuando verificarSesion inicia la consulta.
                return { ...estadoActual, ...sesionVacia, ...validacion.data, cargando: false }
            },
        }
    )
)
