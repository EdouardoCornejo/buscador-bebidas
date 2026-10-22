# Buscador de Bebidas

A drink and cocktail recipe finder built with React and Vite. Search by ingredient and category, browse the results and open any drink to see its instructions and ingredients. Data comes from the free [TheCocktailDB](https://www.thecocktaildb.com/) API.

**Live demo:** https://buscador-bebidas-eight.vercel.app

> The UI is in Spanish.

## Features

- Categories loaded dynamically from the API
- Search by ingredient name and category
- Recipe modal with image, instructions, ingredients and measures
- Responsive layout with React Bootstrap
- Embeddable in an `<iframe>`

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/) / [Bootstrap 5](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)
- Deployed on [Vercel](https://vercel.com/)

## Getting started

Requirements: Node.js `^20.19.0` or `>=22.12.0`.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build in dist/
npm run preview   # preview the production build
```

No environment variables or API keys are needed: TheCocktailDB public test key is part of the API URL.

## Project structure

```
src/
├── components/   # Formulario, ListadoBebidas, Bebida, ModalBebida
├── context/      # BebidasProvider, CategoriasProvider (React Context)
├── hooks/        # useBebidas, useCategorias
├── App.jsx
└── main.jsx
```

## Embedding

The app can be embedded on any site:

```html
<iframe
  src="https://buscador-bebidas-eight.vercel.app"
  title="Buscador de Bebidas"
  width="100%"
  height="800"
  style="border: 0;"
  loading="lazy"
></iframe>
```

## Security

`vercel.json` sets security headers for every route:

- `Content-Security-Policy` that only allows the app's own scripts, Google Fonts and TheCocktailDB for images and API requests. `frame-ancestors *` allows embedding.
- `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`

Query parameters are URL-encoded by Axios, so user input can't change the API request.

## Note about search

When a category is sent, TheCocktailDB filters by category only and ignores the ingredient. This is how the free API works.
