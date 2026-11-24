import { useEffect, useState } from "react";

type PokemonGeneral = {
    name: string
    url: string
}

type ResponsePokeApi = {
    results: PokemonGeneral[]
}

type PokemonDetalle = {
    id: number
    sprites: {
        front_default: string
    }
}

type Pokemon = PokemonGeneral & {
    id: number
    imagen: string
}

export function EjemploPokeApi() {

    const [pokemones, setPokemones] = useState<Pokemon[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const controlador = new AbortController();

        const cargarDetalle = async (pokemon: PokemonGeneral): Promise<Pokemon> => {

            const respuestaDetalle = await fetch(pokemon.url, {
                signal: controlador.signal
            });

            if (!respuestaDetalle.ok) {
                throw new Error(`Error HTTP : ${respuestaDetalle.status}`)
            }

            const detalle: PokemonDetalle = await respuestaDetalle.json()

            return ({
                name: pokemon.name,
                url: pokemon.url,
                id: detalle.id,
                imagen: detalle.sprites.front_default
            })
        }


        async function cargarPokemones() {
            setCargando(true)
            setError('')
            try {
                const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10", {
                    signal: controlador.signal
                })
                if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`)

                const datos: ResponsePokeApi = await respuesta.json()
                // El listado trae el nombre y una URL por Pokémon. Iniciamos los detalles en el bucle y esperamos las promesas juntas antes de llenar la tabla.
                const peticionesDetalle: Promise<Pokemon>[] = []
                for (const pokemon of datos.results) {
                    peticionesDetalle.push(cargarDetalle(pokemon))
                }
                const resultados = await Promise.all(peticionesDetalle)
                if (!controlador.signal.aborted) setPokemones(resultados)
            } catch {
                // Salir de la página también cancela el fetch. Solo mostramos el aviso si falló una petición que todavía nos interesa.
                if (!controlador.signal.aborted) setError('No fue posible cargar los Pokémon.')
            } finally {
                if (!controlador.signal.aborted) setCargando(false)
            }
        }

        void cargarPokemones()

        return () => {
            // El listado y los detalles usan la misma señal. Si salimos de la página, abort() cancela las peticiones que sigan pendientes.
            controlador.abort();
        }

    }, []);

    return (
        <section className="lesson" id="poke-api" aria-labelledby="poke-api-title">
            <header className="lesson-heading">
                <span className="lesson-number">08</span>
                <h2 id="poke-api-title">Cargar una tabla desde PokeAPI</h2>
            </header>
            <p>Este efecto aplica <code>Promise.all</code> en un caso real. Realiza una petición GET cuando el componente aparece y después usa las URL recibidas para obtener el identificador y la imagen de cada Pokémon.</p>
            <p>En el bucle <code>for...of</code> iniciamos una petición por cada Pokémon y guardamos las promesas en un arreglo. Con <code>Promise.all</code> esperamos sus resultados para armar la tabla.</p>
            <p>El arreglo vacío <code>[]</code> indica que el efecto se ejecuta al montar el componente. Al desmontarlo, cancelamos sus peticiones para que una respuesta anterior no cambie la tabla.</p>
            <p>Aquí usamos <code>async/await</code>. Compara los dos fragmentos para ver cómo esperar los mismos detalles con <code>then()</code> o con <code>await</code>.</p>
            <pre><code>{"fetch(URL_POKEMON)\n  .then((respuesta) => respuesta.json())\n  .then((datos) => {\n    const peticionesDetalle = []\n\n    for (const pokemon of datos.results) {\n      const peticion = fetch(pokemon.url)\n        .then((respuesta) => respuesta.json())\n        .then((detalle) => ({\n          ...pokemon,\n          id: detalle.id,\n          imagen: detalle.sprites.front_default,\n        }))\n\n      peticionesDetalle.push(peticion)\n    }\n\n    // Espera que todas las peticiones terminen.\n    return Promise.all(peticionesDetalle)\n  })\n  .then((pokemonesConImagen) => {\n    setPokemones(pokemonesConImagen)\n  })"}</code></pre>
            <pre><code>{"// Versión que usa este componente\nconst peticionesDetalle = []\n\nfor (const pokemon of datos.results) {\n  peticionesDetalle.push(cargarDetalle(pokemon))\n}\n\n// Espera que todas las peticiones terminen.\nconst pokemonesConImagen = await Promise.all(\n  peticionesDetalle\n)\n\nsetPokemones(pokemonesConImagen)"}</code></pre>

            <article className="card">
                {cargando ? <p>Cargando Pokémon…</p> : null}
                {error ? <p role="alert">{error}</p> : null}

                <h3>Mis Pokémon</h3>

                {!cargando && !error ? (
                    <table>
                        <caption>Primeros Pokémon</caption>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Enlace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemones.map((pokemon) => {
                                return (
                                    <tr key={pokemon.id}>
                                        <td>{pokemon.id}</td>
                                        <td> <img src={pokemon.imagen} alt={`Imagen de ${pokemon.name}`} height={50} width={50}></img></td>
                                        <td>{pokemon.name}</td>
                                        <td><a href={pokemon.url} target="_blank">Ver JSON</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : null}
            </article>
        </section>
    )
}