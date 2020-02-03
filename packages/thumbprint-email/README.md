# Thumbprint Email

This package contains the SCSS and Handlebar partials that make up the components used in emails at Thumbtack.

## Installation

```bash
yarn add @thumbtack/thumbprint-email
```

## Use from a CDN

The CSS for Thumbprint SCSS components is hosted on the [unpkg CDN](https://unpkg.com/). You can include it in a link tag.

```html
<link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/@thumbtack/thumbprint-email@^0.1.1/index.css"
/>
```

For best results, change the version number to the [latest version of the package](https://www.npmjs.com/package/@thumbtack/thumbprint-email).

## Parts of the system

We use [Foundation for Emails 2](https://foundation.zurb.com/emails.html) to build and style our emails. Foundation consists of three parts:

1. Inky is a templating language that converts a simplified HTML-like syntax to valid (and quite verbose) HTML that's required for wide email client support.
2. [Handlebar](https://foundation.zurb.com/emails/docs/panini.html#partials) is used under the hood for partials.
3. Foundation CSS/Sass adds the styling to the Inky output. We started with its [default SCSS](https://github.com/foundation/foundation-emails/tree/develop/scss) and modified it to use Thumbprint spacing and colors.
