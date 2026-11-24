import imagen from '../../../assets/ejercicio-uno.png'
function Ejercicio() {
    return (
        <section className="exercise" id="reto" aria-labelledby="reto-title">
            <p className="eyebrow">Tu turno</p>
            <h2 id="reto-title">Ejercicio: un componente que muestre tres cursos</h2>
            <p>Crea un componente de React que muestre tres cursos de una universidad y úsalo dentro de este componente ( al final y despues de esta seccion). Dos cursos tendrán un botón para ver sus datos en una alerta; el tercero estará completo. Puedes dividirlo en componentes más pequeños para reutilizar lo que se repite.</p>
            <p><strong>No necesitas CSS.</strong> Usa títulos, párrafos, listas y botones normales. Todo puede aparecer uno debajo de otro. No hay que construir tarjetas, columnas ni copiar el diseño de esta página.</p>

            <h3>Qué debe mostrar tu componente</h3>
            <ol>
                <li>Un título: <strong>“Cursos disponibles”</strong>.</li>
                <li>Una sección <strong>“Bienvenida”</strong> con el texto “Conoce nuestros cursos y consulta sus horarios”.</li>
                <li>Una sección <strong>“Antes de comenzar”</strong> con tres recomendaciones en una lista. Puedes escribir, por ejemplo: traer un computador, revisar los horarios y anotar tus preguntas.</li>
                <li>Los tres cursos que se indican a continuación, uno debajo de otro.</li>
            </ol>

            <h3>Datos de los cursos</h3>
            <ul>
                <li><strong>Introducción a React:</strong> 09:00, Sala 1, con cupos.</li>
                <li><strong>JavaScript básico:</strong> 10:30, sin sala asignada, con cupos.</li>
                <li><strong>HTML y CSS:</strong> 12:00, Sala 2, completo.</li>
            </ul>
            <p>Para cada curso muestra su nombre, horario y sala. Si no tiene una sala asignada, debe decir “Sala por confirmar”.</p>

            <h3>Qué deben hacer los botones</h3>
            <ul>
                <li>Introducción a React y JavaScript básico deben tener un botón <strong>“Consultar curso”</strong>.</li>
                <li>Al consultar Introducción a React, debe aparecer una alerta que diga: <strong>“Curso: Introducción a React. Horario: 09:00.”</strong></li>
                <li>Al consultar JavaScript básico, la alerta debe mostrar su nombre y las 10:30.</li>
                <li>HTML y CSS debe mostrar <strong>“Completo”</strong> en lugar del botón.</li>
            </ul>
            <p>La consulta termina al cerrar la alerta. No hay inscripción, formulario, cambio de cupos ni datos que guardar.</p>

            <h3>El desafío de React</h3>
            <p>Consigue ese resultado reutilizando componentes. Practica props, desestructuración, valores predeterminados, condiciones y funciones como props. Para practicar children, reutiliza un contenedor con título en “Bienvenida” y “Antes de comenzar”: el contenido de uno será un párrafo y el del otro una lista. Tú decides los nombres de los componentes.</p>
            <p>Usa exportaciones nombradas. No uses hooks. No se evalúan colores, bordes ni distribución visual: se evalúa que los componentes y sus datos funcionen.</p>

            <h3>Comprueba que está terminado</h3>
            <ul>
                <li>Se ven la bienvenida, las recomendaciones y los tres cursos.</li>
                <li>JavaScript básico muestra “Sala por confirmar”.</li>
                <li>Hay dos botones y cada alerta corresponde al curso pulsado.</li>
                <li>HTML y CSS dice “Completo” y no tiene botón.</li>
                <li>Si cambias un horario en el código, el nuevo horario aparece en el componente y en su alerta.</li>
            </ul>
            <p><strong>Extra opcional:</strong> Recorre el arreglo con <code>map</code> y usa el <code>id</code> de cada curso como <code>key</code>. No es necesario para completar el ejercicio principal.</p>

            <h3>Pistas · ábrelas solo si te atascas</h3>
            <details>
                <summary>¿Qué puedo reutilizar?</summary>
                <p>Compara lo que se muestra de cada curso. ¿Qué se repite y qué cambia? Revisa los pasos 03 y 04.</p>
            </details>
            <details>
                <summary>¿Cómo resuelvo la sala que falta?</summary>
                <p>¿Qué aprendiste para mostrar un valor cuando un dato no se entrega? Revisa el paso 06.</p>
            </details>
            <details>
                <summary>La alerta muestra el curso equivocado</summary>
                <p>Sigue el recorrido del clic. ¿Qué nombre y horario recibe la función? Revisa el paso 10.</p>
            </details>
            <details>
                <summary>¿Cómo uso contenidos diferentes en un contenedor?</summary>
                <p>Recuerda cómo el ejemplo del paso 11 recibe contenido entre sus etiquetas. Prueba primero con un párrafo y después con una lista.</p>
            </details>
            <details>
                <summary>¿Cómo deberia verse el resultado final?</summary>
                <p>deberia verse algo as:</p>
                <img src={imagen} alt="imagen-resultado" />
            </details>
            <a href="#capitulo-01">Volver al inicio ↑</a>
        </section>
    );
}
export { Ejercicio }