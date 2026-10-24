# Buscador de Bebidas

Buscador de **bebidas y recetas de cócteles** hecho con **React 19 + Vite**. Permite filtrar por **ingrediente y categoría**, ver los resultados en tarjetas y abrir cada bebida en un **modal con su receta** (instrucciones, ingredientes y cantidades). Los datos vienen de la API pública y gratuita de [TheCocktailDB](https://www.thecocktaildb.com/); no hace falta ninguna API key.

**Demo:** https://buscador-bebidas-eight.vercel.app

![Tech](https://img.shields.io/badge/React-19-61DAFB)
![Tech](https://img.shields.io/badge/Vite-8-646CFF)
![Tech](https://img.shields.io/badge/React_Bootstrap-2-7952B3)
![Tech](https://img.shields.io/badge/Bootstrap-5-7952B3)
![Tech](https://img.shields.io/badge/Axios-HTTP-5A29E4)

---

## Tabla de contenidos

- [Buscador de Bebidas](#buscador-de-bebidas)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
  - [Uso](#uso)
  - [Cómo funciona](#cómo-funciona)
    - [1. `src/context/Categorias.Provider.jsx`](#1-srccontextcategoriasproviderjsx)
    - [2. `src/context/BebidasProvider.jsx`](#2-srccontextbebidasproviderjsx)
    - [3. Componentes](#3-componentes)
    - [4. `vercel.json`](#4-verceljson)
    - [Flujo de la aplicación](#flujo-de-la-aplicación)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- Carga las **categorías de bebidas** dinámicamente desde la API al iniciar.
- **Formulario de búsqueda** por nombre de ingrediente y categoría, con validación (ambos campos son obligatorios).
- Resultados en una **cuadrícula de tarjetas** con imagen y nombre de cada bebida.
- **Modal de receta** con imagen, instrucciones y la lista de ingredientes con su medida.
- Diseño responsive con **React Bootstrap**.
- **Cabeceras de seguridad** (CSP, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) y posibilidad de **incrustarse en un `<iframe>`**.

---

## Cómo ejecutar el proyecto

Requisitos: **Node.js `^20.19.0` o `>=22.12.0`** (requerido por Vite 8).

```bash
npm install
npm run dev
```

| Comando           | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desarrollo de Vite           |
| `npm run build`   | Build de producción en `dist/`           |
| `npm run preview` | Previsualiza el build de producción      |

**No necesita variables de entorno:** la key pública de prueba de TheCocktailDB (`1`) forma parte de la URL de la API.

---

## Uso

1. Escribe un ingrediente en **Nombre Bebida** (por ejemplo: Tequila, Vodka).
2. Elige una **Categoría Bebida** de la lista.
3. Pulsa **Buscar Bebidas**. Si falta algún campo aparece la alerta _"Todos los campos son obligatorios"_.
4. En cualquier tarjeta pulsa **Ver Receta** para abrir el modal; ciérralo haciendo clic fuera o con `Esc`.

> Cuando se envía una categoría, TheCocktailDB filtra solo por categoría e ignora el ingrediente: es el comportamiento de la API gratuita.

---

## Cómo funciona

El estado global se reparte en dos contextos de React, consumidos con los hooks `useCategorias` y `useBebidas` (`src/hooks/`).

### 1. `src/context/Categorias.Provider.jsx`

`CategoriasProvider` ejecuta `obtenerCategorias()` al montarse: hace `GET list.php?c=list` con axios y guarda el array en `categorias` (o `[]` si la respuesta no es un array).

### 2. `src/context/BebidasProvider.jsx`

`BebidasProvider` gestiona la búsqueda y el modal:

- **`consultarBebidas(datos)`**: llama a `filter.php` con `params: { i: nombre, c: categoria }`. Axios codifica los parámetros, así que la entrada del usuario no puede inyectar otros parámetros en la URL. Si la API devuelve algo que no es un array (por ejemplo `"no data found"`), guarda `[]`.
- **`handleModalClick()`**: alterna el estado `modal`.
- **`handleBebidaIdClick(id)`**: guarda `bebidaId`; un `useEffect` dependiente de `bebidaId` llama a `lookup.php?i=<id>` y guarda la `receta`, controlando el estado `cargando`.

### 3. Componentes

- **`Formulario`**: estado local `busqueda` (`nombre`, `categoria`) y `alerta`; en `handleSubmit` valida y llama a `consultarBebidas`.
- **`ListadoBebidas`**: recorre `bebidas` y renderiza un `Bebida` por resultado.
- **`Bebida`**: tarjeta (`Card`) con imagen, nombre y botón **Ver Receta**, que abre el modal y fija el id.
- **`ModalBebida`**: se muestra cuando `cargando` es `false`; `mostrarIngredientes()` recorre `strIngredient1…15` / `strMeasure1…15` de la receta y lista los que existen.

### 4. `vercel.json`

Aplica a todas las rutas una `Content-Security-Policy` que solo permite scripts propios, Google Fonts y `https://www.thecocktaildb.com` para imágenes y peticiones, con `frame-ancestors *` para permitir el `<iframe>`, además de `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy` (cámara, micrófono y geolocalización desactivados).

### Flujo de la aplicación

```
main.jsx  (importa bootstrap.min.css + index.css)
  └─ <App>
       └─ <CategoriasProvider>         → obtenerCategorias()  → list.php?c=list
            └─ <BebidasProvider>
                 ├─ <Formulario>       → handleSubmit() → consultarBebidas()
                 │                                         → filter.php?i=…&c=…
                 ├─ <ListadoBebidas>
                 │     └─ <Bebida> × N → "Ver Receta"
                 │                        ├─ handleModalClick()
                 │                        └─ handleBebidaIdClick(idDrink)
                 │                              ↓ useEffect([bebidaId])
                 │                           lookup.php?i=<id> → setReceta()
                 └─ <ModalBebida>      → imagen + instrucciones + ingredientes
```

---

## Tecnologías

- **React 19** — componentes funcionales, hooks y Context API.
- **Vite 8** — servidor de desarrollo y build.
- **React Bootstrap 2 / Bootstrap 5** — `Container`, `Form`, `Card`, `Modal`, `Alert`…
- **Axios** — peticiones HTTP con parámetros codificados.
- **TheCocktailDB API** — fuente de datos de bebidas y recetas.
- **Vercel** — despliegue y cabeceras de seguridad.

---

## Estructura del proyecto

```
buscador-bebidas/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Bebida.jsx              # Tarjeta de una bebida
│   │   ├── Formulario.jsx          # Búsqueda por ingrediente y categoría
│   │   ├── ListadoBebidas.jsx      # Cuadrícula de resultados
│   │   └── ModalBebida.jsx         # Modal con la receta
│   ├── context/
│   │   ├── BebidasProvider.jsx     # Búsqueda, receta y modal
│   │   └── Categorias.Provider.jsx # Categorías de la API
│   ├── hooks/
│   │   ├── useBebidas.jsx
│   │   └── useCategorias.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vercel.json                     # Cabeceras de seguridad / iframe
└── vite.config.js
```

---

## Personalización

| Dónde                                  | Qué                                   | Valor actual                                                  |
| -------------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `src/context/Categorias.Provider.jsx`  | URL de categorías                     | `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list` |
| `src/context/BebidasProvider.jsx`      | URL de búsqueda                       | `https://www.thecocktaildb.com/api/json/v1/1/filter.php`      |
| `src/context/BebidasProvider.jsx`      | URL de detalle de receta              | `https://www.thecocktaildb.com/api/json/v1/1/lookup.php`      |
| `src/components/ModalBebida.jsx`       | Ingredientes que se recorren          | `strIngredient1` a `strIngredient15`                          |

> Si cambias el dominio de la API, actualiza también `img-src` y `connect-src` de la CSP en `vercel.json`, o el navegador bloqueará las peticiones en producción.

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
