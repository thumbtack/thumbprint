# Thumbprint SCSS

This package contains the SCSS components and mixins. It distributes a few files:

1. **`components.css`**: This is a compiled CSS file of all Thumbprint SCSS components, for example, buttons, type, and form elements. It is primarly used for projects that do not use React.
2. **`mixins.scss`**: This is a rollup of all Thumbprint mixins used by the SCSS components and includes our breakpoints.
3. **`alert.css`, `avatar.css`, `button.css`, etc.**: These files are published so that consumers can require individual files if needed.

See the [Thumbprint](https://thumbprint.design) Components section for full documentation.

## Installation

```bash
yarn add @thumbtack/thumbprint-scss
```

## Use from a CDN

The CSS for Thumbprint SCSS components is hosted on the [unpkg CDN](https://unpkg.com/). You can include it in a link tag.

```html
<link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/@thumbtack/thumbprint-scss@^0.1.1/components.css"
/>
```

For best results, change the version number to the [latest version of the package](https://www.npmjs.com/package/@thumbtack/thumbprint-scss).

## Use in SCSS

This is required if using breakpoints or component mixins in your SCSS:

```scss
@import '[node_modules path]/@thumbtack/thumbprint-scss/mixins
```

For projects that want to compile Thumbprint CSS components along with other SCSS files, include this CSS file:

```scss
@import '[node_modules path]/@thumbtack/thumbprint-scss/components
```

You can import a single component (`button.css`, for example) with:

```scss
@import '[node_modules path]/@thumbtack/thumbprint-scss/button
```

> **Tip:** You can use Sass's `includePaths` or [`node-sass-tilde-importer`](https://www.npmjs.com/package/node-sass-tilde-importer) if you don't want to include `[node_modules path]/` in the imports.

## Use in JavaScript

You can import all Thumbprint components (classes starting with `tp-*`) in JavaScript with this import:

```js
import '@thumbtack/thumbprint-scss';
```

You can import specific components as well:

```js
import '@thumbtack/thumbprint-scss/button.css';
import '@thumbtack/thumbprint-scss/input.css';
```

This works in development environments that support importing CSS files in JavaScript. It works without any additional configuration in Create React App, Gatsby, and Next.js.
