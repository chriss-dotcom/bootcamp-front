import { useState } from 'react'

type Tarea = {
  mensaje: string
  demora: number
}

const TAREAS: Tarea[] = [
  { mensaje: '1. Cargar perfil', demora: 1200 },
  { mensaje: '2. Cargar cursos', demora: 300 },
  { mensaje: '3. Cargar asistencia', demora: 900 },
  { mensaje: '4. Cargar evaluaciones', demora: 600 },
]

function ejecutarTarea(tarea: Tarea) {
  return new Promise<string>((resolver) => {
    setTimeout(() => resolver(tarea.mensaje), tarea.demora)
  })
}

export function EjemploPromiseAll() {
  const [finalizados, setFinalizados] = useState<string[]>([])
  const [resultados, setResultados] = useState<string[]>([])
  const [esperando, setEsperando] = useState(false)

  function ejecutarTodas() {
    setFinalizados([])
    setResultados([])
    setEsperando(true)

    const promesas: Promise<string>[] = []

    for (const tarea of TAREAS) {
      const promesa = ejecutarTarea(tarea).
        then((mensaje) => {
          setFinalizados((mensajesActuales) => [...mensajesActuales, mensaje])
          return mensaje
        })

      promesas.push(promesa)
    }

    Promise.all(promesas).then((mensajes) => {
      setResultados(mensajes)
      setEsperando(false)
    })
  }

  return (
    <section className="lesson" id="promise-all" aria-labelledby="promise-all-title">
      <header className="lesson-heading">
        <span className="lesson-number">07</span>
        <h2 id="promise-all-title">Esperar varias promesas con Promise.all</h2>
      </header>
      <p>Cada llamada a <code>ejecutarTarea</code> inicia una tarea. Con <code>Promise.all</code> esperamos los resultados de todas las promesas que guardamos en el arreglo.</p>
      <p>Las tareas terminan como <code>2 → 4 → 3 → 1</code>, pero el arreglo de resultados conserva el orden de las promesas: <code>1 → 2 → 3 → 4</code>.</p>
      <pre><code>{"const promesas = []\n\nfor (const tarea of tareas) {\n  const promesa = ejecutarTarea(tarea)\n  promesas.push(promesa)\n}\n\nPromise.all(promesas).then((resultados) => {\n  console.log(resultados)\n})"}</code></pre>

      <article className="card">
        <button className="button" type="button" disabled={esperando} onClick={ejecutarTodas}>Probar Promise.all</button>

        <h3>Orden en que terminaron</h3>
        <ul id="promise-all-finalizados">
          {finalizados.map((mensaje) => <li key={mensaje}>{mensaje}</li>)}
        </ul>

        <h3>Orden entregado por Promise.all</h3>
        <ul id="promise-all-resultados">
          {resultados.map((mensaje) => <li key={mensaje}>{mensaje}</li>)}
        </ul>
      </article>

      <p className="prompt">¿Por qué conviene usar <code>Promise.all</code> cuando las tareas son independientes y necesitamos todos sus resultados?</p>
    </section>
  )
}
