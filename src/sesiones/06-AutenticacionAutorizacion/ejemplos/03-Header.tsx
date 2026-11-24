import { useAuthStore } from '../stores/useAuthStore'

export function EjemploHeader() {
  const verificarSesion = useAuthStore((estado) => estado.verificarSesion)
  const accessToken = useAuthStore((estado) => estado.accessToken)
  const cargando = useAuthStore((estado) => estado.cargando)
  const usuario = useAuthStore((estado) => estado.usuario)
  const modo = useAuthStore((estado) => estado.modo)

  return (
    <section className="lesson" id="auth-header" aria-labelledby="auth-header-title">
      <header className="lesson-heading"><span className="lesson-number">03</span><h2 id="auth-header-title">Autenticar mediante Authorization: Bearer</h2></header>
      <p>Inicia sesión con el formulario del primer ejemplo. El token llega en el JSON y se guarda en Zustand. Cada petición que requiera autenticación debe incluirlo explícitamente en el header. Recibir el token no hace que fetch lo envíe automáticamente.</p>
      <pre><code>{"const accessToken = useAuthStore.getState().accessToken\nconst respuesta = await fetch('/dummyjson/auth/me', {\n  headers: { Authorization: `Bearer ${accessToken}` },\n  credentials: 'omit', // Comprobamos el header sin enviar cookies.\n})"}</code></pre>
      <article className="card">
        <h3>Consulta con token explícito</h3>
        <button className="button" type="button" disabled={!accessToken || cargando} onClick={() => { void verificarSesion('header') }}>Consultar usuario por header</button>
        {modo === 'header' && usuario ? <p>Header aceptado para {usuario.username}.</p> : null}
      </article>
      <p>Si /me rechaza el token por ser inválido o haber expirado, limpiamos el token y el perfil. Si hay un fallo de red, ocultamos el contenido protegido y conservamos el token para poder reintentar. La clave del store no convierte el token en una cookie.</p>
      <p className="prompt">Revisa Authorization en Network y compara esta petición con la del paso anterior. Cambia el token por un texto inválido en Local Storage y recarga: no debe aparecer contenido autorizado.</p>
    </section>
  )
}
