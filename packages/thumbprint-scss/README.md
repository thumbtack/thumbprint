# Thumbprint SCSS

This package contains the SCSS components and mixins. It distributes two files:

1. **components.css**: This is a compiled CSS file of all Thumbprint SCSS components, for example, buttons, type, and form elements. It is used for projects that do not use React.
2. **mixins.scss**: This is a rollup of all functions and Thumbprint mixins used by the SCSS components and includes our breakpoints.

See the [Thumbprint](https://thumbprint.design) Components section for full documentation.

## Installation

```
yarn add @thumbtack/thumbprint-scss
```

## Use in SCSS

This is required if using breakpoints or component mixins in your SCSS.

```
@import '[node_modules path]/@thumbtack/thumbprint-scss/mixins
```

For projects that want to compile Thumbprint CSS components along with other SCSS files, include the CSS file.

```
@import '[node_modules path]/@thumbtack/thumbprint-scss/components
```
