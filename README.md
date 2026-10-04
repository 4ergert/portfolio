# Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.20.

## Fonts

Karla is loaded locally through [src/styles/_fonts.scss](src/styles/_fonts.scss)
and used as the default font. The variable fonts support weights from 200 to 800
in normal and italic styles. No external font service is required.
Font files and their OFL license are in [src/styles/fonts/Karla](src/styles/fonts/Karla).

Fira Code is also loaded locally and available globally with
`font-family: 'Fira Code', monospace;`. It supports weights from 300 to 700
in normal style. Karla remains the default font.
Font files and their OFL license are in [src/styles/fonts/Fira_Code](src/styles/fonts/Fira_Code).

## Matrix rain

Import `UnderStringMatrixRainDirective` from
`src/app/shared/directives/string-to-matrixrain/under-string-matrix-rain.directive.ts` into a component's
`imports`, then apply it to a text container:

```html
<a appMatrixRain href="#projects">Projects</a>
```

On hover or keyboard focus, the text turns turquoise over 200ms, then fades
downward into decorative rain after a 220ms delay. The text returns on exit,
without changing layout or intercepting clicks. Existing text nodes and bindings
are preserved. Only the decorative rain is hidden from assistive technology; it
pauses while inactive, and is disabled for reduced-motion preferences.
The directive, its tests, and `_matrix-rain.scss` are colocated in
`src/app/shared/directives/string-to-matrixrain`. The animation styles are still
loaded globally through `src/styles.scss`.
Each column has a distinct randomized vertical start offset within a 96px range
above its fully hidden starting position, in addition to its own speed and delay.
Rain uses Japanese Katakana characters with system Japanese font fallbacks;
no external font service is requested.
Use a container that can hold child elements, rather than an input or image;
ancestor containers must allow overflow for the rain to remain visible.

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

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

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

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
