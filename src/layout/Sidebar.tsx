import { NavLink } from "react-router";

export function Sidebar() {
    return (
        <aside className="sidebar">
            <nav aria-label="Navegación principal">
                <p className="eyebrow">El recorrido</p>
                {/* NavLink agrega aria-current="page" al enlace que está activo. */}
                {/* NavLink con funcion de callback en el children */}
                <NavLink className="chapter-link" to="/" >
                    {({ isActive }) => {
                        return (isActive ? "Inicio (activo)" : "Inicio")
                    }}
                </NavLink>
                <NavLink className={(isActive) => {
                    return (
                        isActive ? "chapter-link link-activo" : "chapter-link link-inactivo"
                    )
                }} to="/componentes">01 · Componentes y props</NavLink>

                <NavLink style={({ isActive }) => {
                    return ({ color: isActive ? "red" : "green" })
                }}
                    className="chapter-link" to="/router">02 · React Router</NavLink>
                <NavLink className="chapter-link" to="/estados-forms">03 - Estados y formularios</NavLink>

                <NavLink className="chapter-link" to="/servicios-web">04 - useEffect y Fetch (Servicios Web)</NavLink>

                <NavLink className="chapter-link" to="/estados-globales">05 - Estados Globales (Zustand)</NavLink>

                {/* Sin end, Cursos también queda activo al visitar /cursos/react. */}
                <NavLink className="chapter-link" to="/cursos">Cursos</NavLink>
            </nav>
            <p className="sidebar-note">Lee el ejemplo.<br />Predice el resultado.<br />Cambia una cosa y observa.</p>
        </aside >
    )
}