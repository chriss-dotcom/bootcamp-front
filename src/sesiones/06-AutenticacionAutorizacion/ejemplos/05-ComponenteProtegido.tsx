import { Protegido } from '../componentes/Protegido'

export function EjemploComponenteProtegido() {
  return (
    <section className="lesson" id="auth-protegido" aria-labelledby="auth-protegido-title">
      <header className="lesson-heading"><span className="lesson-number">05</span><h2 id="auth-protegido-title">Autorizar contenido con un componente Protegido</h2></header>
      <p>Autenticar responde quién eres; autorizar decide qué puedes hacer. <code>Protegido</code> espera a que termine la comprobación de la sesión y compara el rol confirmado por /me con <code>rolesPermitidos</code>. Si no recibe roles, permite el contenido a cualquier usuario autenticado.</p>
      <pre><code>{"<Protegido rolesPermitidos={['admin', 'moderator']}>\n  <PanelModeracion />\n</Protegido>\n\n// Dentro de Protegido:\nif (cargando) return <p>Verificando permisos...</p>\nif (!usuario) return <p>Inicia sesión.</p>\nif (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.role)) {\n  return <p>No tienes un rol permitido.</p>\n}\nreturn <>{children}</>"}</code></pre>
      <div className="example-grid">
        <article className="card">
          <h3>Contenido de la sesión</h3>
          <Protegido><p>Contenido privado para cualquier usuario autenticado.</p></Protegido>
        </article>
        <article className="card">
          <h3>Moderación</h3>
          <Protegido rolesPermitidos={['admin', 'moderator']}><p>Panel de moderación visible para admin o moderator.</p></Protegido>
        </article>
        <article className="card">
          <h3>Administración</h3>
          <Protegido rolesPermitidos={['admin']}><p>Panel de administración visible solo para admin.</p></Protegido>
        </article>
      </div>
      <p>Ocultar un componente es una regla de presentación: una persona puede modificar el frontend o sus datos locales. Un backend real debe validar el token y el rol en cada operación; no debe confiar en el rol que envía el navegador. DummyJSON es una API de práctica y estos paneles no ejecutan operaciones administrativas.</p>
      <p className="prompt">Compara la vista sin sesión, durante la consulta y después de entrar. Cierra sesión: los tres contenidos deben ocultarse. Un usuario con rol user solo podrá ver el primer contenido; moderator verá también moderación y admin verá los tres.</p>
    </section>
  )
}
