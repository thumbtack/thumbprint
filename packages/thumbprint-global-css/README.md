# Thumbprint Global CSS

A dependency of using Thumbprint React or SCSS components is the inclusion of the `@thumbtack/thumbprint-global-css` package.

The output of this package is a small CSS file and it should be the first file included in your project that Thumbprint.

## SCSS usage

```scss
@import '[node_modules path]/@thumbtack/thumbprint-global-css/dist/thumbprint-global';
```

## JavaScript usage

```js
import '@thumbtack/thumbprint-global-css';
```

## What's included

-   **CSS Reset**: Normalize styling for root all HTML elements.
-   **`<body>` styles**: Color, font, and line-height defaults for the `body` element.
-   **`<a>` styles**: Color and hover states default for the `a` element.
