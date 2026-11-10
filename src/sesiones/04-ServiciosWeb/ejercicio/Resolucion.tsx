import { useEffect, useState, type SubmitEvent } from "react"
import { z } from "zod"

const API_BIBLIOTECA = "http://localhost:3002"

type Libro = {
  id: string
  titulo: string
  autor: string
}

type Prestamo = {
  id: string
  libroId: string
  lector: string
  fechaDevolucion: string
  modalidad: string
  devuelto: boolean
  observaciones: string
}

type PrestamoForm = Omit<Prestamo, "id">;

const formularioInicial: PrestamoForm = {
  libroId: "",
  lector: "",
  fechaDevolucion: "",
  modalidad: "Sala",
  devuelto: false,
  observaciones: "",
}

const esquemaPrestamo = z.object({

  libroId: z.string().trim().min(1, {error: 'Debe Seleccionar un libro'}),
  lector: z.string()
          .refine( (valor) => valor.trim().length > 0, {error: 'El nombre del lector es obligatorio'}),
  fechaDevolucion: z.string()
                    .regex(/^\d{4}-\d{2}-\d{2}$/, {error: 'La fecha debe tener formato YYYY-MM-DD'}),
  modalidad: z.string().trim().min(1, {error: 'Debe seleccionar el tipo de prestamo'}),
  devuelto: z.boolean(),
  observaciones: z.string(),
})

export function Resolucion() {

  const [libros, setLibros] = useState<Libro[]>([]);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [modalidades, setModalidades] = useState<Modalidad[]>([]);

  const [formulario, setFormulario] =
    useState<PrestamoForm>(formularioInicial);

   const [idEnEdicion, setIdEnEdicion] =
        useState<string | null>(null);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = 
          useState <"OK" | "error" | "">("");

  const [erroresValidacion, setErroresValidacion] =
    useState<string[]>([]);


  useEffect(() => {

    const controlador = new AbortController();

    async function cargarDatos() {

      try {
        setCargando(true);
        setError("");

        const librosPromise = fetch(`${API_BIBLIOTECA}/libros`, {
                method: 'GET',
                signal: controlador.signal,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

          const prestamosPromise = fetch(`${API_BIBLIOTECA}/prestamos`, {
                method: 'GET',
                signal: controlador.signal,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

          const [respuestaLibros, respuestaPrestamos] =
                await Promise.all([
                    librosPromise,
                    prestamosPromise
            ]);

          if (!respuestaLibros.ok) {
                throw new Error(
                    `Error HTTP libros: ${respuestaLibros.status}`
                );
            }

          if (!respuestaPrestamos.ok) {
                throw new Error(
                    `Error HTTP préstamos: ${respuestaPrestamos.status}`
                );
            }

          const datosLibros: Libro[] =
                await respuestaLibros.json();

          const datosPrestamos: Prestamo[] =
                await respuestaPrestamos.json();

          setLibros(datosLibros);
          setPrestamos(datosPrestamos);

      } catch (errorPeticion) {
        
        if (controlador.signal.aborted) {
                return;
        }

        console.error(
                'Error en solicitud HTTP',
                errorPeticion
        );

        setError(
                'No fue posible cargar los datos de la biblioteca.'
        );
        
      }finally{
        if (!controlador.signal.aborted) {
                setCargando(false);
            }
      }
    }

    cargarDatos();

    return () => controlador.abort();
      
  }, []);


  async function guardarPrestamo(evento: SubmitEvent<HTMLFormElement>) {

     evento.preventDefault();

        setError("");
        setMensaje("");

        const validacion =
            esquemaPrestamo.safeParse(formulario);

        if (!validacion.success) {
            validacion.error.issues.map(
              issue => issue.message
            )
            return;
        }

        setErroresValidacion([]);

        try {

            setGuardando(true);

            const url =
                idEnEdicion === null
                ? `${API_BIBLIOTECA}/prestamos`
                : `${API_BIBLIOTECA}/prestamos/${idEnEdicion}`;
            
            const respuesta = await fetch (url, {
              method: 
                idEnEdicion === null
                ? "POST"
                : "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validacion.data),
            });

            if(!respuesta.ok){
              throw new Error(
                `Error en consulta HTTP: ${respuesta.status}`
              );
            }

          
            const prestamoGuardado : Prestamo = 
            await respuesta.json();

            if(idEnEdicion === null){
              setPrestamos((prestamosActuales) => [
                ...prestamosActuales,
                prestamoGuardado,
              ]);
            }else{
              setPrestamos((prestamosActuales) => 
              prestamosActuales.map((prestamo) => 
              prestamo.id === idEnEdicion
                    ? prestamoGuardado
                    : prestamo
                  )
                );
            }

            limpiarFormulario();

            setMensaje(
              idEnEdicion === null
                ? "Prestamo Agregado Correctamente"
                : "Prestamo Actualizado Correctamente"
            );
            setTipoMensaje("OK")
    
        }catch (errorPeticion){

          console.log("Error en llamada HTTP", 
                      errorPeticion);

          setError("No Fue posible almacenar el prestamo.");

        }finally{

          setGuardando(false);

        }
    }

    async function eliminarPrestamo(id: string) {

      if(idEnEdicion === id){
        limpiarFormulario();

      }
      setError("");
      setMensaje("");

      try {
        
        setGuardando(true);

        const response = await fetch (
          `${API_BIBLIOTECA}/prestamos/${id}`,
          {
            method: "DELETE",
          }
        );

        if(!response.ok){
          throw new Error(`Error en Metodo HTTP: ${response.status}`);
        }

        setPrestamos((prestamosActuales) => 
              prestamosActuales.filter(
                (prestamo) => prestamo.id !== id
              ));
        
        setMensaje("Prestamo eliminado Correctamente");
        setTipoMensaje("OK");
        
      } catch (errorPeticion) {
        
        console.error(
          "Error en llamado HTTP", errorPeticion
        );

        setError("No fue posible eliminar el préstamo.");

      }finally{

        setGuardando(false);

      }
      
    }

    function editarPrestamo(prestamo: Prestamo){

      setIdEnEdicion(prestamo.id);

      setFormulario({
        libroId: prestamo.libroId,
        lector: prestamo.lector,
        fechaDevolucion: prestamo.fechaDevolucion,
        modalidad: prestamo.modalidad,
        devuelto: prestamo.devuelto,
        observaciones: prestamo.observaciones,
      });

      setErroresValidacion([]);
      setError("");
      setMensaje("");

    }

    function limpiarFormulario(){

      setFormulario(formularioInicial);

      setIdEnEdicion(null);

      setErroresValidacion([]);
      setError("");
      setMensaje("");

    }

    function obtenerTituloLibro(
      libroId: string
    ){

      const libro = libros.find(
        (libro) => libro.id === libroId
      );

      return libro?.titulo ?? "Libro no encontrado.";
    }


  return (
    <div>

        <h2>
            {idEnEdicion === null
                ? "Registrar préstamo"
                : "Editar préstamo"}
        </h2>

        {cargando && (
            <p>Cargando...</p>
        )}

        {guardando && (
            <p>Procesando solicitud...</p>
        )}

        {mensaje && (
          <div style={{ color: "green" }}>
            ✅ {mensaje}
          </div>
        )}

        {error && (
          <div style={{ color: "red" }}>
            ❌ {error}
          </div>
        )}

        {libros.length === 0 && (
            <p>
                No hay libros disponibles en el catálogo.
            </p>
        )}

        <form onSubmit={guardarPrestamo}>

            <div>
                <label htmlFor="libro">
                    Libro
                </label>

                <select
                    id="libro"
                    value={formulario.libroId}
                    disabled={cargando || guardando || libros.length === 0}
                    onChange={(e) =>
                        setFormulario({
                            ...formulario,
                            libroId: e.target.value
                        })
                    }
                >
                    <option value="">
                        Seleccione un libro
                    </option>

                    {libros.map((libro) => (
                        <option
                            key={libro.id}
                            value={libro.id}
                        >
                            {libro.titulo}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="lector">
                    Nombre del lector
                </label>

                <input
                    id="lector"
                    type="text"
                    value={formulario.lector}
                    disabled={cargando || guardando }
                    onChange={(e) =>
                        setFormulario({
                            ...formulario,
                            lector: e.target.value
                        })
                    }
                />
            </div>

            <div>
                <label htmlFor="fechaDevolucion">
                    Fecha devolución
                </label>

                <input
                    id="fechaDevolucion"
                    type="date"
                    value={formulario.fechaDevolucion}
                    disabled={cargando || guardando}
                    onChange={(e) =>
                        setFormulario({
                            ...formulario,
                            fechaDevolucion: e.target.value
                        })
                    }
                />
            </div>

            <fieldset disabled={cargando || guardando}>
                <legend>Modalidad</legend>

                <label>
                    <input
                        type="radio"
                        name="modalidad"
                        value="Sala"
                        checked={
                            formulario.modalidad ===
                            "Sala"
                        }
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                modalidad:
                                    e.target.value as
                                    "Sala"
                            })
                        }
                    />
                    Sala
                </label>

                <label>
                    <input
                        type="radio"
                        name="modalidad"
                        value="Domicilio"
                        checked={
                            formulario.modalidad ===
                            "Domicilio"
                        }
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                modalidad:
                                    e.target.value as
                                    "Domicilio"
                            })
                        }
                    />
                    Domicilio
                </label>
            </fieldset>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={formulario.devuelto}
                        disabled={cargando || guardando}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                devuelto:
                                    e.target.checked
                            })
                        }
                    />
                    Devuelto
                </label>
            </div>

            <div>
                <label htmlFor="observaciones">
                    Observaciones
                </label>

                <textarea
                    id="observaciones"
                    value={formulario.observaciones}
                    disabled={cargando || guardando}
                    onChange={(e) =>
                        setFormulario({
                            ...formulario,
                            observaciones:
                                e.target.value
                        })
                    }
                />
            </div>

            {erroresValidacion.length > 0 && (
                    <ul>
                        {erroresValidacion.map((error) => (
                          <li key={error}>
                            {error}
                          </li>
                        ))}
                    </ul>
                )}

            <button
                className="button"
                type="submit"
                disabled={
                    cargando
                    || guardando
                    || libros.length === 0
                }
            >
                {idEnEdicion === null
                    ? "Guardar préstamo"
                    : "Actualizar préstamo"}
            </button>

            {idEnEdicion !== null && (
                <button
                className="button"
                    type="button"
                    disabled={cargando || guardando}
                    onClick={limpiarFormulario}
                >
                    Cancelar edición
                </button>
            )}

        </form>

        <hr />

        <h2>Préstamos registrados</h2>

        {prestamos.length === 0 ? (
            <p>No hay préstamos registrados.</p>
        ) : (
            <ul>
                {prestamos.map((prestamo) => (
                    <li key={prestamo.id}>

                        <p>
                            <strong>Libro:</strong>{" "}
                            {obtenerTituloLibro(
                                prestamo.libroId
                            )}
                        </p>

                        <p>
                            <strong>Lector:</strong>{" "}
                            {prestamo.lector}
                        </p>

                        <p>
                            <strong>Fecha devolución:</strong>{" "}
                            {prestamo.fechaDevolucion}
                        </p>

                        <p>
                            <strong>Modalidad:</strong>{" "}
                            {prestamo.modalidad}
                        </p>

                        <p>
                            <strong>Devuelto:</strong>{" "}
                            {prestamo.devuelto
                                ? "Sí"
                                : "No"}
                        </p>

                        {prestamo.observaciones && (
                            <p>
                                <strong>Observaciones:</strong>{" "}
                                {prestamo.observaciones}
                            </p>
                        )}

                        <button
                            className="button"
                            type="button"
                            disabled={cargando || guardando}
                            onClick={() =>
                                editarPrestamo(
                                    prestamo
                                )
                            }
                        >
                            Editar
                        </button>

                        <button
                            className="button"
                            type="button"
                            disabled={cargando || guardando}
                            onClick={() =>
                                eliminarPrestamo(
                                    prestamo.id
                                )
                            }
                        >
                            Eliminar
                        </button>

                        <hr />

                    </li>
                ))}
            </ul>
        )}

    </div>
  )
}
