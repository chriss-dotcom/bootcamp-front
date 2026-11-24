import { useAuthStore } from '../stores/useAuthStore'

export function EjemploRolUsuario() {
  const usuario = useAuthStore((estado) => estado.usuario)
  const verificarSesion = useAuthStore((estado) => estado.verificarSesion)
  const accessToken = useAuthStore((estado) => estado.accessToken)
  const modo = useAuthStore((estado) => estado.modo)
  const cargando = useAuthStore((estado) => estado.cargando)

  return (
    <section className="lesson" id="auth-rol" aria-labelledby="auth-rol-title">
      <header className="lesson-heading"><span className="lesson-number">04</span><h2 id="auth-rol-title">Consultar el rol del usuario autenticado</h2></header>
      <p>El login no incluye necesariamente el rol. Consultamos <code>GET /auth/me</code> con el mecanismo elegido y validamos la respuesta con Zod. DummyJSON devuelve <code>role</code> con valores como <code>admin</code>, <code>moderator</code> o <code>user</code>. No asignamos el rol desde un select ni lo deducimos del nombre de usuario.</p>
      <pre><code>{"// Después de validar la respuesta de /auth/me:\nset({ usuario: validacion.data })\n\n// En cualquier componente:\nconst usuario = useAuthStore((estado) => estado.usuario)\n// El rol está en usuario?.role."}</code></pre>
      <article className="card">
        <h3>Perfil comprobado por la API</h3>
        {usuario ? <><p>Nombre: {usuario.firstName} {usuario.lastName}</p><p>Usuario: {usuario.username}</p><p>Rol: <span className="badge">{usuario.role}</span></p></> : <p>Todavía no hay un perfil verificado.</p>}
        <button className="button" type="button" disabled={cargando || (!accessToken && modo !== 'cookie')} onClick={() => { void verificarSesion() }}>Volver a consultar perfil y rol</button>
      </article>
      <p className="prompt">La cuenta de prueba emilys tiene rol admin. Para contrastar permisos usa otras cuentas ficticias del recurso /users de DummyJSON y comprueba su role en /auth/me. Recargar no debe aceptar un rol escrito manualmente en Local Storage.</p>
    </section>
  )
}
