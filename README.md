# PokemonSsr

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.5.


El código de este repositorio se realizó siguiendo el curso de [https://www.udemy.com/course/angular-pro-siguiente-nivel/ ](https://www.udemy.com/course/angular-pro-siguiente-nivel/), en concreto es el de la sección de SSR - SSG - Hydration ( aunque quizás vaya a tener algunas diferencias, porque estoy usando algunas librerías más actualizadas )

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Generar routes.txt, usado para las rutas prerenderizadas
```bash
node --watch scripts/prerender-routes.js
```

## Building

Para construir el proyecto

```bash
ng build
```

Despues de esto, podriamos servir el ssr, ejecuntando

```bash
npm run serve:ssr:pokemon-ssr
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) and  [Server-side & hybrid rendering](https://angular.dev/guide/performance)
