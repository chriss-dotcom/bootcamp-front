export function Ejercicio() {
  return (
    <section className="exercise" id="estados-globales-reto" aria-labelledby="estados-globales-reto-title">
      <p className="eyebrow">Tu turno</p>
      <h2 id="estados-globales-reto-title">Tu turno: tablero de tareas de equipo</h2>
      <p>Un equipo necesita registrar sus tareas, cambiar su estado y consultar el avance. Construye un tablero donde un formulario, una barra de filtros, una lista y un resumen compartan información mediante Zustand.</p>
      <p>Implementa la interfaz en <code>05-EstadosGlobales/<wbr />ejercicio/<wbr />Resolucion.tsx</code> y el store en un nuevo archivo <code>05-EstadosGlobales/<wbr />stores/<wbr />useTableroStore.ts</code>. Este ejercicio funciona con datos propios en el navegador y no necesita JSON Server.</p>

      <h3>Paso 1 · Define los datos y el store</h3>
      <ul>
        <li>Define un tipo <code>EstadoTarea</code> con las opciones <strong>Pendiente</strong>, <strong>En curso</strong> y <strong>Completada</strong>.</li>
        <li>Define un tipo <code>Tarea</code> con <code>id</code>, <code>titulo</code> y <code>estado</code>. El id será un texto y el estado usará <code>EstadoTarea</code>.</li>
        <li>Crea un store tipado con <code>create</code>, definido fuera de los componentes y exportado como <code>useTableroStore</code>.</li>
        <li>El estado inicial tendrá <code>tareas</code> como un arreglo vacío y <code>filtro</code> con el valor <strong>Todas</strong>. El filtro permitirá Todas y los tres estados de tarea.</li>
        <li>Incluye las acciones <code>agregarTarea(titulo)</code>, <code>cambiarEstado(id, nuevoEstado)</code>, <code>eliminarTarea(id)</code> y <code>cambiarFiltro(filtro)</code>.</li>
      </ul>

      <h3>Paso 2 · Centraliza las actualizaciones</h3>
      <ol>
        <li>Al agregar, elimina los espacios de los extremos del título. Un texto vacío no debe crear una tarea, aunque la acción se invoque directamente.</li>
        <li>Genera el identificador con <code>crypto.randomUUID()</code> y asigna el estado inicial Pendiente. Dos tareas pueden tener el mismo título, pero tendrán ids distintos.</li>
        <li>Para cambiar el estado, actualiza solo la tarea cuyo id coincida. Conserva su id, su título y las demás tareas.</li>
        <li>Para eliminar, construye un arreglo sin la tarea indicada.</li>
        <li>Usa <code>set</code> con el estado actual cuando necesites el arreglo anterior. Devuelve nuevos arreglos y objetos; evita modificar directamente las tareas.</li>
      </ol>
      <p>Los componentes deben llamar a estas acciones. No mantengas otra copia del arreglo con <code>useState</code>.</p>

      <h3>Paso 3 · Separa la interfaz en componentes</h3>
      <p>Define los siguientes componentes fuera de <code>Resolucion</code> y muéstralos desde ese componente:</p>
      <ul>
        <li><strong>NuevaTarea:</strong> un formulario controlado para escribir un título. Conserva el borrador y su mensaje de error en estado local. Evita la recarga al enviar; si el título es válido, llama a la acción del store y limpia el campo. Si está vacío, muestra un mensaje y conserva el borrador.</li>
        <li><strong>FiltrosTablero:</strong> un select controlado con Todas, Pendiente, En curso y Completada. Lee el filtro del store y lo cambia mediante su acción.</li>
        <li><strong>ListaTareas:</strong> muestra las tareas del filtro actual. Cada tarea tendrá su título, un select para cambiar su estado y un botón para eliminarla. Usa el id como <code>key</code> y etiqueta los controles para identificar a qué tarea pertenecen.</li>
        <li><strong>ResumenTablero:</strong> muestra el total y cuántas tareas hay en cada estado. Debe contar todas las tareas, independientemente del filtro seleccionado.</li>
      </ul>
      <p>Cada componente importa el mismo hook y selecciona solo los datos y acciones que necesita. No pases las tareas, el filtro ni las acciones por props entre estos componentes. Reutiliza las clases <code>card</code>, <code>example-grid</code>, <code>button</code> y <code>badge</code> cuando corresponda.</p>

      <h3>Paso 4 · Calcula la vista y el resumen</h3>
      <ul>
        <li>Selecciona <code>tareas</code> y <code>filtro</code> por separado. Después, calcula las tareas visibles: Todas muestra el arreglo completo y cada otro filtro muestra las coincidencias de estado.</li>
        <li>Calcula los totales desde <code>tareas</code>, usando <code>length</code>, <code>filter</code> o <code>reduce</code>. No guardes los totales ni la lista filtrada como otro estado ni uses un efecto para sincronizarlos.</li>
        <li>Distingue el tablero vacío de un filtro sin coincidencias: muestra «Todavía no hay tareas» o «No hay tareas para este filtro», según corresponda.</li>
        <li>Si una tarea deja de cumplir el filtro al cambiar de estado, debe desaparecer de esa vista, pero seguir existiendo en el tablero y en el resumen.</li>
      </ul>

      <h3>Paso 5 · Persiste solo las tareas</h3>
      <ul>
        <li>Envuelve la creación del store con <code>persist</code> y usa la clave <code>bootcamp-react-tablero</code>.</li>
        <li>Usa <code>partialize</code> para guardar únicamente <code>tareas</code>. El filtro y el borrador del formulario no deben guardarse.</li>
        <li>Al recargar, conserva los ids, títulos y estados de las tareas; el filtro vuelve a Todas y el campo del formulario comienza vacío.</li>
      </ul>
      <p>Usa un store y una clave propios para este tablero. Conserva los ejemplos de contador, preferencias, carrito y el badge del encabezado.</p>

      <h3>Comprueba el resultado</h3>
      <ol>
        <li>Un título vacío o compuesto solo por espacios muestra un error y no crea tareas. Un título válido agrega exactamente una tarea Pendiente y actualiza el resumen.</li>
        <li>Crea «Preparar presentación», «Revisar estilos» y «Probar formulario». Pasa la segunda a En curso y la tercera a Completada: el resumen debe mostrar total 3, pendientes 1, en curso 1 y completadas 1.</li>
        <li>Filtra por En curso. Solo aparece «Revisar estilos», pero el resumen sigue contando las tres tareas.</li>
        <li>Cambia esa tarea a Completada sin salir del filtro. La lista muestra el mensaje de filtro sin coincidencias; el resumen indica dos completadas. Al elegir Todas, vuelves a ver las tres tareas.</li>
        <li>Elimina una tarea: desaparece y se recalculan los totales. Las otras conservan sus datos.</li>
        <li>Selecciona Completada, escribe un borrador sin enviarlo y recarga: las tareas se recuperan, el filtro vuelve a Todas y el borrador desaparece.</li>
        <li>Elimina todas las tareas y recarga: el tablero permanece vacío. Revisa en DevTools que la clave del tablero contenga únicamente los datos seleccionados por <code>partialize</code>.</li>
      </ol>

      <h3>Pistas · ábrelas solo si te atascas</h3>
      <details>
        <summary>¿Qué estado debe ser global y cuál local?</summary>
        <p>Las tareas y el filtro son compartidos entre componentes. El texto que todavía estás escribiendo y su error solo pertenecen al formulario. Guarda en el store los datos que necesitan compartir las vistas.</p>
      </details>
      <details>
        <summary>¿Por qué no cambia el resumen al elegir un filtro?</summary>
        <p>El resumen describe todo el tablero. Calcula sus indicadores desde el arreglo completo; solo la lista debe usar las tareas filtradas.</p>
      </details>
      <details>
        <summary>¿Cómo evito crear arreglos nuevos dentro de un selector?</summary>
        <p>Obtén <code>estado.tareas</code> y <code>estado.filtro</code> con selectores separados. Aplica <code>filter</code> después, en el cuerpo del componente. Así el selector devuelve la referencia guardada en el store.</p>
      </details>
      <details>
        <summary>¿Cómo conservo el filtro inicial sin guardarlo?</summary>
        <p>Declara Todas como valor inicial y devuelve solo las tareas desde <code>partialize</code>. Al recuperar los datos, <code>persist</code> los combina con el resto del estado inicial.</p>
      </details>

      <p className="prompt">Explica el recorrido: evento del formulario o de la lista → acción del store → nuevo estado → selectores → lista y resumen actualizados → persistencia. ¿Por qué el filtro puede cambiar lo que ves sin cambiar las tareas guardadas?</p>
    </section>
  )
}
