export function Ejercicio() {
  return (
    <section className="exercise" id="servicios-web-reto" aria-labelledby="servicios-web-reto-title">
      <p className="eyebrow">Tu turno</p>
      <h2 id="servicios-web-reto-title">Tu turno: préstamos de una biblioteca</h2>
      <p>Construye una aplicación para registrar, consultar, editar y eliminar préstamos de libros. JSON Server guardará los datos y React mostrará el formulario y la lista en la misma vista.</p>
      <p>Implementa tu solución en <code>04-ServiciosWeb/<wbr />ejercicio/<wbr />Resolucion.tsx</code>. Usa como referencia los ejemplos de efectos, promesas, <code>Promise.all</code> y CRUD de productos.</p>

      <h3>Paso 1 · Prepara la API</h3>
      <p>Desde la carpeta <code>clase-estados-forms</code>, crea <code>data/biblioteca.json</code> con estos datos. Usa un archivo distinto al de productos para conservar el ejemplo de la sesión.</p>
      <pre><code>{JSON.stringify({
        libros: [
          { id: '1', titulo: 'Papelucho', autor: 'Marcela Paz' },
          { id: '2', titulo: 'El principito', autor: 'Antoine de Saint-Exupéry' },
        ],
        prestamos: [],
      }, null, 2)}</code></pre>
      <p>JSON Server ya está instalado en el proyecto. Inicia esta API en una terminal:</p>
      <pre><code>{'pnpm exec json-server data/biblioteca.json --port 3002'}</code></pre>
      <p>En otra terminal ejecuta <code>pnpm run dev</code>. Comprueba que puedas consultar <code>http://localhost:3002/libros</code> y <code>http://localhost:3002/prestamos</code>. El puerto 3002 permite mantener el ejemplo de productos en el 3001.</p>

      <h3>Paso 2 · Define los datos y carga ambos recursos</h3>
      <ul>
        <li>Define los tipos <code>Libro</code> y <code>Prestamo</code>. Los identificadores de JSON Server son textos.</li>
        <li>Cada préstamo tendrá <code>id</code>, <code>libroId</code>, <code>lector</code>, <code>fechaDevolucion</code>, <code>modalidad</code>, <code>devuelto</code> y <code>observaciones</code>.</li>
        <li>Crea estados para los libros, los préstamos, el formulario, el identificador en edición, la carga inicial, el guardado y los errores.</li>
        <li>En un <code>useEffect</code> con <code>[]</code>, consulta libros y préstamos mediante GET. Las consultas son independientes: inícialas juntas y espera ambas con <code>Promise.all</code>.</li>
        <li>Comprueba <code>respuesta.ok</code> en cada consulta antes de leer su JSON. Guarda cada resultado en su estado correspondiente.</li>
        <li>Usa <code>try</code>, <code>catch</code> y <code>finally</code> para mostrar los errores y finalizar la carga.</li>
        <li>Comparte un <code>AbortController</code> entre ambas peticiones y cancélalas en la limpieza del efecto. Una cancelación no debe mostrarse como error ni actualizar el estado de carga tras desmontar.</li>
      </ul>

      <h3>Paso 3 · Construye y valida el formulario</h3>
      <p>Todos los controles deben ser controlados por React:</p>
      <ul>
        <li><strong>Libro:</strong> un select cuyas opciones provengan del recurso <code>libros</code>. Usa el id como valor y el título como texto; comienza con una opción vacía.</li>
        <li><strong>Nombre del lector:</strong> un campo de texto obligatorio, sin aceptar un nombre compuesto solo por espacios.</li>
        <li><strong>Fecha de devolución:</strong> un input de tipo <code>date</code>, obligatorio y con una fecha válida en formato <code>YYYY-MM-DD</code>.</li>
        <li><strong>Modalidad:</strong> radios con las opciones <strong>Sala</strong> y <strong>Domicilio</strong>. Comienza con Sala seleccionada.</li>
        <li><strong>Devuelto:</strong> un checkbox que comience desmarcado. Tanto <code>true</code> como <code>false</code> son valores válidos.</li>
        <li><strong>Observaciones:</strong> un textarea opcional.</li>
      </ul>
      <p>Define las reglas con Zod. Usa <code>safeParse</code> antes de guardar y muestra sus mensajes si hay errores. No envíes una petición cuando la validación falle. Envía únicamente <code>validacion.data</code>.</p>
      <p>Si no hay libros en el catálogo, muestra un aviso y deshabilita el guardado. Reutiliza las clases y los estilos existentes.</p>

      <h3>Paso 4 · Registra un préstamo</h3>
      <ol>
        <li>Evita la recarga del formulario con <code>preventDefault()</code>.</li>
        <li>Envía los datos validados mediante POST a <code>http://localhost:3002/prestamos</code>, con <code>Content-Type: application/json</code> y <code>JSON.stringify</code>.</li>
        <li>Deja que JSON Server genere el identificador. Comprueba la respuesta antes de leer el préstamo guardado.</li>
        <li>Agrega al estado el préstamo devuelto por la API, sin modificar el arreglo anterior.</li>
        <li>Limpia el formulario solo si la operación fue exitosa. Si falla, conserva lo escrito para poder reintentar.</li>
      </ol>

      <h3>Paso 5 · Muestra, edita y elimina</h3>
      <ul>
        <li>Recorre los préstamos con <code>map</code> y usa su id como <code>key</code>. Muestra el lector, el título del libro, la fecha, la modalidad y si fue devuelto.</li>
        <li>Agrega un botón <strong>Editar</strong> que recupere todos los valores en los controles y guarde el id del préstamo seleccionado.</li>
        <li>Cuando haya un id en edición, envía PATCH a <code>/prestamos/:id</code>. Reemplaza con <code>map</code> solamente el préstamo confirmado por la API, conservando su id.</li>
        <li>Agrega <strong>Cancelar edición</strong>: debe restaurar los valores iniciales sin enviar una petición ni cambiar la lista.</li>
        <li>Agrega <strong>Eliminar</strong>: envía DELETE a <code>/prestamos/:id</code> y, solo cuando la API confirme el éxito, retíralo del estado con <code>filter</code>.</li>
        <li>Si eliminas el préstamo que estabas editando, limpia también el formulario y sal del modo edición.</li>
      </ul>

      <h3>Paso 6 · Maneja la espera y los errores</h3>
      <ul>
        <li>Muestra un mensaje durante la carga inicial y otro mientras guardas o eliminas.</li>
        <li>Deshabilita los controles y las acciones mientras esperas para evitar envíos duplicados o cambios de selección durante una escritura.</li>
        <li>Si falla una escritura, conserva la lista anterior y muestra un mensaje comprensible.</li>
        <li>Realiza POST, PATCH y DELETE desde los eventos de los controles. El efecto inicial se encarga de los GET.</li>
      </ul>

      <h3>Comprueba el resultado</h3>
      <ol>
        <li>Al entrar, se consultan ambos recursos y el select muestra los títulos de los libros. Escribir en el formulario no provoca nuevos GET.</li>
        <li>Un libro sin seleccionar, un lector vacío o una fecha inválida muestran errores sin crear un préstamo.</li>
        <li>Un formulario válido crea exactamente un préstamo. Al recargar, el registro sigue apareciendo.</li>
        <li>Editar recupera el select, la fecha, los radios, el checkbox y las observaciones. Cambia el libro, la modalidad y el estado devuelto; guarda y recarga para comprobar que se conservaron.</li>
        <li>Guardar una edición conserva el id y no agrega otra fila. Cancelar no modifica el registro.</li>
        <li>Eliminar retira el préstamo de la vista y de <code>data/biblioteca.json</code>.</li>
        <li>Detén la API e intenta guardar: aparece un error y el formulario conserva los datos. Reinicia la API y vuelve a intentarlo.</li>
        <li>En la pestaña Network, identifica las peticiones GET, POST, PATCH y DELETE, sus cuerpos y sus respuestas.</li>
      </ol>

      <h3>Pistas · ábrelas solo si te atascas</h3>
      <details>
        <summary>¿Cómo cargo los dos recursos sin esperar uno antes del otro?</summary>
        <p>Crea las dos promesas de consulta y entrégalas juntas a <code>Promise.all</code>. El resultado conserva el orden de las promesas, aunque terminen en otro orden. Cada consulta debe comprobar su respuesta y devolver el JSON.</p>
      </details>
      <details>
        <summary>¿Qué guardo en libroId?</summary>
        <p>Guarda el id del libro seleccionado, no su título ni el objeto completo. Para mostrar el título en la lista, busca en el catálogo el libro cuyo id coincida con <code>prestamo.libroId</code>.</p>
      </details>
      <details>
        <summary>¿Cómo recupero el checkbox al editar?</summary>
        <p>Asigna al estado el booleano <code>prestamo.devuelto</code> y conecta ese estado a <code>checked</code>. En su evento de cambio usa <code>evento.target.checked</code>.</p>
      </details>
      <details>
        <summary>¿Cómo distingo crear de editar?</summary>
        <p>Si el id en edición vale <code>null</code>, usa POST sobre la colección. Si tiene un valor, usa PATCH sobre la URL de ese préstamo. El formulario y el esquema de validación pueden ser los mismos.</p>
      </details>
      <details>
        <summary>¿Tengo que convertir la fecha a Date?</summary>
        <p>No. El input de fecha y la API pueden intercambiar el texto <code>YYYY-MM-DD</code>. Valídalo con <code>z.iso.date</code> y asígnalo directamente al estado cuando edites.</p>
      </details>

      <p className="prompt">Explica el recorrido: controles → validación → petición HTTP → archivo JSON → respuesta → estado de React → lista. ¿Por qué cambiamos la lista después de confirmar la respuesta y por qué las escrituras no pertenecen al efecto inicial?</p>
    </section>
  )
}
