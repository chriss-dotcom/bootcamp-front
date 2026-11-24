import { Link } from "react-router";
import { cursos, type Curso } from "./Cursos";

function FichaCurso({ id, titulo, horario, sala = "Sala por confirmar", tieneCupos }: Curso) {
    return (
        <article className="card">
            <h2>{titulo}</h2>
            <p>Horario: {horario}</p>
            <p>{sala}</p>
            <p className={tieneCupos ? "badge" : "badge badge-muted"}>{tieneCupos ? "Hay Cupos" : "Completo"}</p>
            <p>
                <Link to={`/cursos/${id}`}>Ver detalle de {titulo} (Link)</Link>
            </p>
            <p>
                <a href={`/cursos/${id}`}>Ver detalle de {titulo} (a)</a>
            </p>
            {/* Prueba ambos enlaces: Link conserva la app en memoria y el enlace HTML vuelve a cargar el documento. */}

        </article>

    )
}
export function Cursos() {
    return (
        <>
            <header className="chapter-header">
                <p className="eyebrow">La aplicacion de cursos de ejercicio</p>
                <h1>Cursos disponibles</h1>
                <p className="lead">Elige el curso para consultar sus datos en una pagina de detalle</p>
            </header>
            <div className="example-grid">
                {cursos.map((curso) => {
                    return (
                        <FichaCurso
                            key={curso.id}
                            id={curso.id}
                            titulo={curso.titulo}
                            horario={curso.horario}
                            sala={curso.sala}
                            tieneCupos={curso.tieneCupos}
                        />
                    )
                })}
            </div>
        </>
    )
}