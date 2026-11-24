import { Link } from "react-router";

export function PaginaNoEncontrada() {
    return (
        <section>
            <p className="eyebrow">404 - Pagina no encontrada</p>
            <h1>Pagina no encontrada</h1>
            <p>La direccion que escribiste no existe</p>
            <Link to="/">Volver al inicio</Link>
        </section>
    )
}
