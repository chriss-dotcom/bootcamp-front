import { Link, useParams, useSearchParams } from "react-router";
import { cursos } from "./Cursos"

export function DetalleCurso() {

    // En /cursos/react, cursoId vale "react". El nombre cursoId viene del :cursoId que escribimos en App.
    const { cursoId } = useParams();
    // Si agregas ?color=azul, get("color") devuelve "azul". Ese dato va después del signo ? y el curso sigue siendo el mismo.
    const [qParams] = useSearchParams();

    const color = qParams.get("color");
    const altura = qParams.get("altura");

    const cursoEncontrado = cursos.find((curso) => {
        if (curso.id === cursoId) {
            return curso;
        }
    });

    if (!cursoEncontrado) {
        return (
            <section>
                <h1>Curso no encontrado</h1>
                <p>No tenemos un curso con el identificador "{cursoId}"</p>
                <Link to="/cursos">Volver a los cursos</Link>
            </section>
        )
    }

    const { titulo, horario, sala = "Sala por confirmar", tieneCupos } = cursoEncontrado;

    return (
        <>
            <header className="chapter-header">
                <p className="eyebrow">Detalle del curso</p>
                <h1>{titulo}</h1>
                <p className="lead">El último tramo de la URL indica qué curso estás viendo. Cambia <code>react</code> por <code>html-css</code> y compara los datos.</p>
            </header>
            <section className="card">
                <p>Horario: {horario}</p>
                <p>Sala: {sala}</p>
                <p>Altura: {altura}, color: {color}</p>
                <p className={tieneCupos ? "badge" : "badge badge-muted"}>{tieneCupos ? "Hay Cupos" : "Completo"}</p>
            </section>
        </>
    )
}
