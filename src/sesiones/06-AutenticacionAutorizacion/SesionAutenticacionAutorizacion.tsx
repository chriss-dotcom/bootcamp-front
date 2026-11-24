import { EjemploIniciarSesion } from "./ejemplos/01-IniciarSesion";
import { EjemploCookie } from "./ejemplos/02-Cookie";
import { EjemploHeader } from "./ejemplos/03-Header";
import { EjemploRolUsuario } from "./ejemplos/04-RolUsuario";
import { EjemploComponenteProtegido } from "./ejemplos/05-ComponenteProtegido";

export function SesionAutenticacionAutorizacion() {
    return (
        <>
            <header className="chapter-header">
                <p className="eyebrow">Sesión 6 · Autenticación y autorización</p>
                <h1>Iniciar sesión y comprobar permisos</h1>
            </header>
            <nav aria-label="Pasos de autenticación y autorización">
                <ol className="lesson-nav">
                    <li><a href="#auth-login">Iniciar sesión</a></li>
                    <li><a href="#auth-cookie">Consultar el perfil con una cookie</a></li>
                    <li><a href="#auth-header">Enviar el token en la cabecera</a></li>
                    <li><a href="#auth-rol">Consultar el rol del usuario</a></li>
                    <li><a href="#auth-protegido">Mostrar contenido según el rol</a></li>
                </ol>
            </nav>
            <EjemploIniciarSesion />
            <EjemploCookie />
            <EjemploHeader />
            <EjemploRolUsuario />
            <EjemploComponenteProtegido />
        </>
    )
}
