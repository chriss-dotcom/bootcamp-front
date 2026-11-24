import { useAuthStore } from '../stores/useAuthStore'

export function EjemploCookie() {
  const { iniciarSesion, verificarSesion, cerrarSesion, cargando, usuario, modo } = useAuthStore()

  return (
    <section className="lesson" id="auth-cookie" aria-labelledby="auth-cookie-title">
      <header className="lesson-heading"><span className="lesson-number">02</span><h2 id="auth-cookie-title">Autenticar una petición mediante cookie</h2></header>
      <p>Este ejemplo tiene su propio botón para iniciar sesión por cookie con la cuenta pública emilys / emilyspass. El servidor responde con <code>Set-Cookie</code>; el navegador guarda la cookie y la adjunta en las siguientes peticiones. <code>credentials: 'include'</code> permite usarla, pero no crea una cookie a partir del JSON.</p>
      <pre><code>{"// Solo este ejemplo solicita explícitamente el login por cookie.\nawait iniciarSesion('emilys', 'emilyspass', 'cookie')\n\nconst respuesta = await fetch('/dummyjson/auth/me', {\n  credentials: 'include',\n  // No enviamos Authorization: el navegador adjunta la cookie.\n})"}</code></pre>
      <p>DummyJSON emite cookies HttpOnly y Secure. El proxy configurado en <code>vite.config.ts</code> reenvía <code>/dummyjson</code> a <code>https://dummyjson.com</code>; así el navegador usa el origen de la aplicación y no depende de cookies de terceros. Abre la clase en <code>localhost</code>; para publicarla se necesita HTTPS y una ruta equivalente en el servidor.</p>
      <article className="card">
        <h3>Consulta sin header Bearer</h3>
        <button className="button" type="button" disabled={cargando} onClick={() => { void iniciarSesion('emilys', 'emilyspass', 'cookie') }}>Iniciar sesión por cookie</button>{' '}
        <button className="button" type="button" disabled={cargando} onClick={() => { void verificarSesion('cookie') }}>Consultar usuario por cookie</button>{' '}
        <button className="button" type="button" disabled={cargando || modo !== 'cookie'} onClick={() => { void cerrarSesion() }}>Cerrar sesión por cookie</button>
        {modo === 'cookie' && usuario ? <p>Cookie aceptada para {usuario.username}.</p> : null}
      </article>
      <p className="prompt">En DevTools → Network revisa /me: debe enviar Cookie, sin Authorization. En Application → Cookies busca accessToken y su atributo HttpOnly. Cierra sesión para que el servidor expire las cookies. Borrar localStorage por sí solo no borra esas cookies.</p>
    </section>
  )
}
