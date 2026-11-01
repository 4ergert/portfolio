# Portfolio

Julian Hergert's portfolio, built with Angular 21, TypeScript and SCSS.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.20.

## Getting started

Use a Node.js version supported by Angular 21. The project specifies npm 11.9.0
as its package manager in [package.json](package.json).
Run the following commands from the directory containing this README:

```bash
npm ci
npm start
```

The development server opens `http://localhost:4200/` and reloads when source files change.

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

## Cursor glow

The standalone [CursorGlowDirective](src/app/shared/directives/cursor-glow/cursor-glow.directive.ts)
adds a decorative glow following mouse and pen movement over its host.
Touch movement is ignored, and the glow disappears when the pointer leaves.
Listeners run outside Angular's zone and are removed when the directive is destroyed.

The application enables it on `app-root` through `hostDirectives` in
[app.ts](src/app/app.ts). To use it in a template, import `CursorGlowDirective`
into the consuming component's `imports` and apply the attribute:

```html
<div appCursorGlow>...</div>
```

The [cursor-glow.directive.scss](src/app/shared/directives/cursor-glow/cursor-glow.directive.scss)
stylesheet is loaded globally through [styles.scss](src/styles.scss).
It renders a viewport-fixed `::before` layer using the `--cursor-x` and
`--cursor-y` CSS variables. The layer does not intercept clicks.
The current implementation is a viewport background effect, not a glow clipped
to each host. Its negative z-index requires suitable stacking; `app-root` uses
`isolation: isolate`. Avoid hosts whose `::before` is already used.
Reduced-motion preferences disable the opacity transition.

## HTML/SCSS logo

The reusable [Logo component](src/app/shared/components/logo/logo.ts) replaces
the logo images in navigation and footer with HTML and SCSS.
Import `Logo` into a component's `imports`, then use:

```html
<app-logo></app-logo>
<app-logo variant="footer"></app-logo>
```

The default navigation variant shows only the symbol at viewport widths of
900px or less; the footer variant does so at 700px or less.
The component scales to its container width and exposes an accessible image label.
Frames, ornaments, brackets and initials have hover effects, with synchronized
letter spacing and padding for the initials and their shadow.

Logo text waits for the local Karla font weights 400, 700 and 800 to load.
Initials and their shadow remain `display: none` until then so they appear
in the current hover state without an entry transition.
Font-loading failures are logged to the console.
The layout and effects are defined in [logo.scss](src/app/shared/components/logo/logo.scss).

## Mindset speech bubble

Hovering the Mindset item in the technology grid reveals a speech bubble.
Its content is editable in
[technologies.html](src/app/shared/components/technologies/technologies.html),
inside `.skill_set__bubble`; it currently highlights Python and C++.
Appearance and responsive positioning are defined in
[technologies.scss](src/app/shared/components/technologies/technologies.scss).
The bubble currently has `aria-hidden="true"` and is hover-only, so its content
is not exposed to screen readers or through keyboard focus.

## Favicon

The [SVG favicon](public/icon/favicon.svg) has a transparent background.
[index.html](src/index.html) references it with `?v=2` to avoid the previously
cached background version. Increment this query value when updating the favicon
if browsers continue displaying an older copy, and deploy the updated SVG as well.
Transparent areas show the browser's tab background.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
npm run ng -- generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
npm run ng -- generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This compiles the project into `dist/portfolio/` using the production configuration.
For a development build that watches for changes, run `npm run watch`.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npm test
```

For a single non-watch run:

```bash
npm test -- --watch=false
```

To run only the logo and cursor-glow tests:

```bash
npm test -- --watch=false --include=src/app/shared/components/logo/logo.spec.ts --include=src/app/shared/directives/cursor-glow/cursor-glow.directive.spec.ts
```

## End-to-end testing

No end-to-end runner or `e2e` target is configured in
[angular.json](angular.json). Set up an end-to-end framework before using
`ng e2e`; the unit tests use Vitest.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
