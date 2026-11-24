import z from "zod"

export type ModoAutenticacion = 'header' | 'cookie'

const esquemaToken = z.object({ accessToken: z.string().min(1) })

export const esquemaUsuario = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["admin", "user", "moderator"])
})

// Con z.infer obtenemos el tipo a partir del esquema. Así usamos las mismas propiedades para validar el JSON y para trabajar con el usuario en TypeScript.
export type UsuarioAutenticado = z.infer<typeof esquemaUsuario>

// Al empezar con /, esta ruta usa el origen de la página. Al iniciar sesión, el navegador pide /dummyjson/auth/login a Vite.
// En desarrollo, Vite hace de intermediario. El proxy de vite.config.ts quita /dummyjson, reenvía la petición
// a https://dummyjson.com/auth/login y devuelve la respuesta al navegador. Lo mismo ocurre con /me y /logout.
const URL_AUTH = '/dummyjson/auth'


export async function solicitarToken(username: string, password: string, modo: ModoAutenticacion, signal?: AbortSignal) {
    const respuesta = await fetch(`${URL_AUTH}/login`, {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json' },
        // El usuario y la contraseña van en el body en ambos modos. Acá usamos credentials para decidir qué hacer con las cookies.
        // Con 'include', si el servidor responde con Set-Cookie, el navegador puede guardar la cookie para la próxima petición.
        // Con 'omit', el navegador omite las cookies al enviar y al recibir. Para el modo Bearer leemos el token del JSON.
        credentials: modo === 'cookie' ? 'include' : 'omit',
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
    })
    if (!respuesta.ok) {
        throw new Error(respuesta.status === 400 || respuesta.status === 401
            ? 'Revisa el usuario o la contraseña.'
            : 'No fue posible iniciar sesión. Inténtalo nuevamente.')
    }
    const validacion = esquemaToken.safeParse(await respuesta.json())
    if (!validacion.success) throw new Error('La API no devolvió un token válido.')
    return validacion.data.accessToken
}


export async function consultarPerfil(token: string | null, modo: ModoAutenticacion, signal?: AbortSignal) {
    const respuesta = await fetch(`${URL_AUTH}/me`, {
        signal,
        // Con 'include', si la cookie del login sigue vigente y corresponde a esta ruta, el navegador la adjunta al pedir el perfil.
        // Así podemos usar una cookie HttpOnly aunque JavaScript no pueda leerla. En modo 'header' enviamos el token en Authorization.
        credentials: modo === 'cookie' ? 'include' : 'omit',
        headers: modo === 'header' ? { Authorization: `Bearer ${token}` } : undefined,
    })
    if ([400, 401, 403].includes(respuesta.status)) {
        return null // No hay un usuario autenticado con ese token o cookie.
    }
    if (!respuesta.ok) throw new Error('No fue posible consultar el usuario. Inténtalo nuevamente.')
    // Un HTTP 200 nos dice que la petición salió bien. Acá comprobamos además que el JSON trae el id, el nombre de usuario y un rol que conocemos.
    const validacion = esquemaUsuario.safeParse(await respuesta.json())
    if (!validacion.success) throw new Error('El perfil recibido no contiene un usuario y rol válidos.')
    return validacion.data
}

export async function solicitarCierre(token: string | null, modo: ModoAutenticacion, signal?: AbortSignal) {
    const respuesta = await fetch(`${URL_AUTH}/logout`, {
        method: 'POST',
        signal,
        // Al cerrar sesión usamos 'include' en ambos modos por si quedó una cookie de un login anterior.
        // Así el navegador puede enviarla y aplicar el Set-Cookie con el que el servidor le indica que la borre.
        credentials: 'include',
        headers: modo === 'header' ? { Authorization: `Bearer ${token}` } : undefined,
    })
    if (!respuesta.ok && respuesta.status !== 401) {
        throw new Error('La sesión local se cerró, pero no se confirmó el cierre remoto. Reintenta iniciar y cerrar sesión.')
    }
}
