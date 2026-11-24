import { Outlet } from "react-router";

export function Body() {
    return (
        <main id="contenido" tabIndex={-1}>
            {/* Acá React Router coloca la página hija. Al pasar de Inicio a Cursos cambia este contenido y seguimos viendo el mismo menú. */}
            <Outlet />
        </main>
    )
}