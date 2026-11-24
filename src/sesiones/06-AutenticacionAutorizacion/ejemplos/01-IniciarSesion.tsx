import { useState, type SubmitEvent } from 'react'
import { z } from 'zod'
import { useAuthStore } from '../stores/useAuthStore'

const esquemaFormulario = z.object({
  username: z.string().trim().min(1, 'Ingresa el nombre de usuario.'),
  password: z.string().min(1, 'Ingresa la contraseña.'),
})

type ErroresFormulario = {
  username?: string[]
  password?: string[]
}

export function EjemploIniciarSesion() {
  // Estas son credenciales públicas de prueba de DummyJSON, no de una cuenta real.
  const [formulario, setFormulario] = useState({ username: 'emilys', password: 'emilyspass' })
  const [erroresValidacion, setErroresValidacion] = useState<ErroresFormulario>({})
  // Este formulario usa casi todo el store: lo leemos una vez y desestructuramos.
  const {
    iniciarSesion, cerrarSesion, cargando, usuario, error, accessToken,
  } = useAuthStore(); // implementar del store

  async function enviar(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault()
    const validacion = esquemaFormulario.safeParse(formulario)
    if (!validacion.success) {
      setErroresValidacion(z.flattenError(validacion.error).fieldErrors)
      return
    }
    setErroresValidacion({})
    const correcto = await iniciarSesion(validacion.data.username, validacion.data.password)
    if (correcto) {
      setFormulario((actual) => ({ ...actual, password: '' }))
    }
  }

  return (
    <section className="lesson" id="auth-login" aria-labelledby="auth-login-title">
      <header className="lesson-heading"><span className="lesson-number">01</span><h2 id="auth-login-title">Autenticar y guardar el token con Zustand</h2></header>
      <p>Envía el usuario y la contraseña a <code>POST /auth/login</code> para obtener un token. DummyJSON devuelve <code>accessToken</code> y <code>refreshToken</code>. En este ejemplo pedimos un <code>accessToken</code> que dura 30 minutos y lo usamos en la cabecera <code>Authorization</code> para consultar tu perfil.</p>
      <p>Para empezar usa la cuenta pública <code>emilys</code> y la contraseña de prueba <code>emilyspass</code>. Puedes volver a escribirla tras cerrar sesión. Consulta las cuentas ficticias en la <a href="https://dummyjson.com/docs/auth" target="_blank" rel="noreferrer">documentación de DummyJSON</a>.</p>
      <pre><code>{"const respuesta = await fetch('/dummyjson/auth/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  credentials: 'omit', // Enviamos el usuario y la contraseña sin cookies.\n  body: JSON.stringify({ username, password, expiresInMins: 30 }),\n})\n\n// En el formulario llamamos al store sin elegir un modo:\nawait iniciarSesion(formulario.username, formulario.password)"}</code></pre>
      <p>El store está en <code>stores/useAuthStore.ts</code> y las peticiones en <code>servicios/autenticacion.ts</code>. La clave <code>bootcamp-react-auth</code> conserva el token en localStorage, sin guardar la contraseña ni el rol. Al recargar, el perfil se consulta de nuevo antes de mostrar contenido protegido.</p>
      <p>La lógica se apoya en tres datos: <code>usuario</code> contiene el perfil verificado o <code>null</code>; <code>cargando</code> indica si esperamos una respuesta, y <code>error</code> contiene el mensaje que mostramos si falla. Iniciar sesión obtiene el token y reutiliza <code>verificarSesion</code> para consultar el perfil.</p>
      <p>El token guardado en localStorage puede ser leído por JavaScript. Una cookie HttpOnly la administra el navegador y no puede leerse con JavaScript; en este ejercicio guardamos también el token devuelto en JSON para comparar ambos mecanismos, por lo que no tiene el aislamiento de una sesión basada únicamente en cookies HttpOnly.</p>

      <form className="card" noValidate onSubmit={enviar}>
        <h3>Iniciar sesión de prueba</h3>

        <fieldset disabled={cargando}>
          <legend>Credenciales</legend>

          <label>Usuario
            <input autoComplete="username" value={formulario.username} onChange={(evento) => setFormulario({ ...formulario, username: evento.target.value })} aria-invalid={Boolean(erroresValidacion.username)} aria-describedby={erroresValidacion.username ? 'auth-error-username' : undefined} />
          </label>
          {erroresValidacion.username ? <p id="auth-error-username" role="alert">{erroresValidacion.username.join(' ')}</p> : null}

          <label>Contraseña
            <input type="password" autoComplete="current-password" value={formulario.password} onChange={(evento) => setFormulario({ ...formulario, password: evento.target.value })} aria-invalid={Boolean(erroresValidacion.password)} aria-describedby={erroresValidacion.password ? 'auth-error-password' : undefined} />
          </label>
          {erroresValidacion.password ? <p id="auth-error-password" role="alert">{erroresValidacion.password.join(' ')}</p> : null}

        </fieldset>
        <button className="button" type="submit" disabled={cargando}>Iniciar sesión</button>
      </form>

      <article className="card" aria-labelledby="auth-estado-title">
        <h3 id="auth-estado-title">Estado de la sesión compartida</h3>
        <p role="status">{cargando ? 'Consultando...' : usuario ? 'Sesión iniciada.' : 'Sin sesión.'}</p>
        <p>{accessToken ? 'Hay un token guardado; su presencia no garantiza que siga siendo válido.' : 'No hay un token guardado.'}</p>
        {usuario ? <p>Usuario verificado: {usuario.username}.</p> : null}
        {error ? <p role="alert">{error}</p> : null}
        <button className="button" type="button" onClick={() => { void cerrarSesion() }} disabled={cargando || (!accessToken && !usuario)}>Cerrar sesión</button>
      </article>

      <p className="prompt">Prueba una contraseña incorrecta y luego la correcta. Observa que primero se obtiene el token y después se consulta /auth/me. Revisa en Local Storage que no se haya guardado la contraseña.</p>
    </section>
  )
}
