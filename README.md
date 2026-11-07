# Bootcamp de React

Proyecto de apoyo para las clases de React. Reúne explicaciones, ejemplos interactivos y ejercicios para avanzar desde componentes y props hasta formularios y consumo de servicios web.

La aplicación usa React 19, TypeScript 6 y Vite 8. La navegación se implementa con React Router 8, la validación de formularios con Zod 4 y la API local de práctica con JSON Server `1.0.0-beta.15`.

## Requisitos e inicio

- Node.js compatible con Vite 8: `^20.19.0 || >=22.12.0`.
- pnpm, utilizado por los scripts y el archivo `pnpm-lock.yaml` del proyecto.

Ejecuta los comandos desde la raíz del repositorio:

```bash
pnpm install
```

Para usar el CRUD de productos, prepara primero `data/productos.json` como se explica más abajo. Luego inicia la API y la aplicación en terminales distintas:

```bash
# Terminal 1: API de productos en http://localhost:3001
pnpm run jserver
```

```bash
# Terminal 2: aplicación React
pnpm run dev
```

Abre la dirección que Vite indique en la terminal. Las sesiones de componentes, rutas y formularios pueden explorarse sin iniciar JSON Server. El ejemplo de PokéAPI requiere conexión a Internet.

| Comando | Propósito |
| --- | --- |
| `pnpm run dev` | Inicia el servidor de desarrollo de Vite. |
| `pnpm run jserver` | Ejecuta JSON Server con `data/productos.json` en el puerto `3001`. |
| `pnpm run lint` | Revisa el código con Oxlint. |
| `pnpm run build` | Comprueba TypeScript y genera la aplicación en `dist/`. |
| `pnpm run preview` | Sirve localmente la compilación generada. |

La compilación del frontend no inicia ni incluye la API de JSON Server; el CRUD sigue necesitando su servidor por separado.

## Recorrido de las sesiones

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio del bootcamp. |
| `/componentes` | Componentes, exportaciones, props, desestructuración, valores predeterminados, condicionales, eventos, callbacks, children y listas. |
| `/router` | URL, BrowserRouter, rutas, enlaces, parámetros, páginas no encontradas y layouts. |
| `/cursos` y `/cursos/:cursoId` | Listado y detalle de cursos usados en los ejercicios. |
| `/estados-forms` | Estado con `useState`, controles de formulario y validación con Zod. |
| `/servicios-web` | `useEffect`, dependencias, limpieza, promesas, asincronía, `Promise.all`, PokéAPI y CRUD de productos. |

Cada sesión agrupa sus ejemplos y su ejercicio. La sesión de servicios web termina con un reto de préstamos de biblioteca; su archivo `Resolucion.tsx` contiene el espacio para implementar la solución.

## Estructura del proyecto

```text
bootcamp-react/
├── data/                         # Bases JSON locales (ignoradas por Git)
│   └── productos.json            # Productos, categorías y datos de práctica
├── public/                       # Recursos estáticos
├── src/
│   ├── main.tsx                  # Entrada: estilos, StrictMode y BrowserRouter
│   ├── App.tsx                   # Rutas principales
│   ├── index.css                 # Estilos compartidos
│   ├── assets/                   # Imágenes utilizadas desde el código
│   ├── layout/                   # Cabecera, navegación, contenido y pie
│   └── sesiones/
│       ├── 01-componentes/
│       ├── 02-react-router/
│       ├── 03-estados-forms/
│       └── 04-ServiciosWeb/
├── index.html                    # Documento HTML de entrada
├── package.json                  # Dependencias y scripts
├── pnpm-lock.yaml                # Versiones resueltas de dependencias
├── tsconfig*.json                # Configuración de TypeScript
├── vite.config.ts                # Configuración de Vite y del plugin de React
└── .oxlintrc.json                 # Configuración de Oxlint
```

Dentro de las sesiones, `ejemplos/` contiene demostraciones numeradas y `ejercicio/` reúne enunciados y archivos de trabajo o resolución. `01-componentes/componentes/` incluye un componente reutilizable.

## Para qué sirve `data/productos.json`

Es la base de datos local del ejemplo `src/sesiones/04-ServiciosWeb/ejemplos/09-CrudProductos.tsx`. JSON Server lee el archivo y expone sus colecciones como recursos HTTP. React accede a esos recursos con `fetch`; no importa el archivo JSON directamente.

El flujo del ejemplo es: formulario → validación con Zod → petición HTTP → archivo JSON → respuesta → estado de React → lista de productos.

Los cambios confirmados por la API se guardan en el archivo: crear agrega un producto, editar actualiza sus datos y eliminar lo borra. Por eso los registros se conservan al recargar la página o reiniciar la API. Usa datos de prueba y guarda una copia antes de realizar operaciones que quieras poder deshacer.

### Crear el archivo después de clonar

La regla `data/*.json` de `.gitignore` excluye estas bases locales. Un clon nuevo puede no incluir siquiera la carpeta `data`; créala y agrega `productos.json` con el siguiente contenido inicial. Si el archivo ya existe, conserva sus datos en lugar de reemplazarlo.

```json
{
  "productos": [
    {
      "id": "1",
      "nombre": "Cuaderno",
      "descripcion": "Cuaderno de práctica",
      "fechaIngreso": "2026-11-07",
      "etiquetas": ["Escolar", "Oficina"],
      "categoria": "1",
      "disponible": true,
      "condicion": "Nuevo",
      "precio": 1500,
      "cantidad": 10
    }
  ],
  "categorias": [
    { "id": "1", "name": "Papeleria" },
    { "id": "2", "name": "Tecnologia" },
    { "id": "3", "name": "Accesorios" }
  ],
  "pets": []
}
```

`productos` puede comenzar como un arreglo vacío. Mantén categorías para que el formulario tenga opciones disponibles.

### Colecciones y campos

| Clave raíz | Uso |
| --- | --- |
| `productos` | Registros que consulta, crea, edita y elimina el CRUD. |
| `categorias` | Catálogo que llena el select. Cada entrada tiene `id` y `name`. |
| `pets` | Colección adicional de práctica; los registros locales usan `id`, `nombre`, `precio` y `size`. El CRUD de productos no la consume. |

| Campo de producto | Tipo y significado |
| --- | --- |
| `id` | Texto que identifica el registro. Al crear desde el formulario se omite y JSON Server lo genera. |
| `nombre` | Texto obligatorio; el formulario rechaza un nombre vacío o compuesto solo por espacios. |
| `descripcion` | Texto; puede estar vacío y contener saltos de línea. |
| `fechaIngreso` | Fecha como texto `YYYY-MM-DD`, validada con `z.iso.date()`. |
| `etiquetas` | Arreglo de textos: `Oferta`, `Escolar` y/o `Oficina`. Puede estar vacío. |
| `categoria` | Texto con el `id` de una categoría, no su nombre ni el objeto completo. |
| `disponible` | Booleano `true` o `false`, conectado al checkbox. |
| `condicion` | `Nuevo`, `Usado` o `Reacondicionado`. |
| `precio` | Número mayor o igual a cero. |
| `cantidad` | Número entero mayor o igual a cero. |

Los controles de precio y cantidad mantienen texto en el formulario; Zod lo convierte a números antes del envío. Los identificadores se mantienen como textos. Si `categoria` no coincide con ninguna entrada del catálogo, la lista muestra “Sin categoria”. La validación actual exige una categoría no vacía, pero no comprueba que exista en el catálogo.

El archivo local también puede incluir `$schema`, una referencia opcional para ayudar al editor a validar su estructura. No es una colección de productos ni reemplaza las reglas de Zod del formulario. Si se utiliza desde `data/productos.json`, la ruta relativa al esquema instalado es `../node_modules/json-server/schema.json`.

### Recursos HTTP del ejemplo

La base de las URLs está escrita en `09-CrudProductos.tsx` como `http://localhost:3001`.

| Método y ruta | Acción en la aplicación |
| --- | --- |
| `GET /productos` | Carga la lista de productos. |
| `GET /categorias` | Carga las opciones del select de categorías. |
| `POST /productos` | Crea un producto con los datos validados. |
| `PUT /productos/:id` | Guarda la edición enviando todos los campos del formulario. |
| `DELETE /productos/:id` | Elimina el producto seleccionado. |

La colección adicional está disponible en `/pets`. Si cambias el puerto de la API, actualiza también las URLs del componente.

Las reglas de Zod se ejecutan en el frontend: editar el JSON manualmente o llamar a la API por otro medio puede introducir datos que no las cumplan. JSON Server se utiliza como API de práctica; no implementa aquí la validación de negocio de un backend propio.

## Ejercicio de biblioteca

El enunciado de servicios web propone crear una base independiente `data/biblioteca.json` con las colecciones `libros` y `prestamos`. Los datos iniciales y los pasos están en `src/sesiones/04-ServiciosWeb/ejercicio/Ejercicio.tsx`.

Para trabajar en ese reto, crea el archivo siguiendo el enunciado e inicia otra API:

```bash
pnpm exec json-server data/biblioteca.json --port 3002
```

Así se pueden consultar `http://localhost:3002/libros` y `http://localhost:3002/prestamos` sin alterar los productos del puerto `3001`.

## Notas para trabajar en clase

- Algunos textos de los ejemplos todavía mencionan `npm run api` y la carpeta `clase-estados-forms`. En este repositorio usa la raíz actual y `pnpm run jserver`; no existe un script `api` en `package.json`.
- La explicación de edición del CRUD menciona PATCH, pero su implementación actual utiliza PUT con todos los campos. El reto de biblioteca sí pide PATCH.
- Si falla la carga de productos, comprueba que exista `data/productos.json`, que sea JSON válido y que la API responda en el puerto `3001`.
- Para comprobar una práctica, revisa la pestaña Network del navegador y recarga después de guardar: permite relacionar métodos HTTP, respuestas y persistencia en el archivo.

Referencia: [documentación de JSON Server](https://github.com/typicode/json-server). El proyecto fija una versión beta; revisa su compatibilidad antes de actualizarla.
