# Thumbprint

Thumbprint is the design system at Thumbtack. Though its primary purpose to support Thumbtack projects, we have open-sourced it for those interested in how we build and manage our documentation and code.

## Documentation

Thumbprint is documented at [thumbprint.design](https://thumbprint.design/).

[![Screenshot of Thumbprint documentation](https://i.imgur.com/ioUtLO5.png)](https://thumbprint.design/)

The documentation is hosted on Netlify and built with [Gatsby](https://www.gatsbyjs.org/) and [Gatsby MDX](https://github.com/ChristopherBiscardi/gatsby-mdx).

## Overview

The Thumbprint codebase is a monorepo containing individually versioned NPM packages. These packges include:

| Package                                                                       | Version                                                                                                                                        |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@thumbtack/thumbprint-atomic`](/packages/thumbprint-atomic)                 | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-atomic)](https://badgen.net/npm/v/@thumbtack/thumbprint-atomic)                 |
| [`@thumbtack/thumbprint-react`](/packages/thumbprint-react)                   | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-react)](https://badgen.net/npm/v/@thumbtack/thumbprint-react)                   |
| [`@thumbtack/thumbprint-tokens`](/packages/thumbprint-tokens)                 | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-tokens)](https://badgen.net/npm/v/@thumbtack/thumbprint-tokens)                 |
| [`@thumbtack/tp-ui-component-alert`](/packages/tp-ui-component-alert)         | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-component-alert)](https://badgen.net/npm/v/@thumbtack/tp-ui-component-alert)         |
| [`@thumbtack/tp-ui-component-avatar`](/packages/tp-ui-component-avatar)       | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-component-avatar)](https://badgen.net/npm/v/@thumbtack/tp-ui-component-avatar)       |
| [`@thumbtack/tp-ui-component-form-note`](/packages/tp-ui-component-form-note) | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-component-form-note)](https://badgen.net/npm/v/@thumbtack/tp-ui-component-form-note) |
| [`@thumbtack/tp-ui-component-loader`](/packages/tp-ui-component-loader)       | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-component-loader)](https://badgen.net/npm/v/@thumbtack/tp-ui-component-loader)       |
| [`@thumbtack/tp-ui-core-font-face`](/packages/tp-ui-core-font-face)           | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-core-font-face)](https://badgen.net/npm/v/@thumbtack/tp-ui-core-font-face)           |
| [`@thumbtack/tp-ui-core-function`](/packages/tp-ui-core-function)             | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-core-function)](https://badgen.net/npm/v/@thumbtack/tp-ui-core-function)             |
| [`@thumbtack/tp-ui-core-mixin`](/packages/tp-ui-core-mixin)                   | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-core-mixin)](https://badgen.net/npm/v/@thumbtack/tp-ui-core-mixin)                   |
| [`@thumbtack/tp-ui-core-reset`](/packages/tp-ui-core-reset)                   | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-core-reset)](https://badgen.net/npm/v/@thumbtack/tp-ui-core-reset)                   |
| [`@thumbtack/tp-ui-element-body`](/packages/tp-ui-element-body)               | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-body)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-body)               |
| [`@thumbtack/tp-ui-element-button`](/packages/tp-ui-element-button)           | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-button)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-button)           |
| [`@thumbtack/tp-ui-element-checkbox`](/packages/tp-ui-element-checkbox)       | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-checkbox)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-checkbox)       |
| [`@thumbtack/tp-ui-element-fieldset`](/packages/tp-ui-element-fieldset)       | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-fieldset)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-fieldset)       |
| [`@thumbtack/tp-ui-element-hr`](/packages/tp-ui-element-hr)                   | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-hr)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-hr)                   |
| [`@thumbtack/tp-ui-element-img`](/packages/tp-ui-element-img)                 | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-img)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-img)                 |
| [`@thumbtack/tp-ui-element-label`](/packages/tp-ui-element-label)             | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-label)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-label)             |
| [`@thumbtack/tp-ui-element-link`](/packages/tp-ui-element-link)               | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-link)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-link)               |
| [`@thumbtack/tp-ui-element-list`](/packages/tp-ui-element-list)               | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-list)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-list)               |
| [`@thumbtack/tp-ui-element-radio`](/packages/tp-ui-element-radio)             | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-radio)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-radio)             |
| [`@thumbtack/tp-ui-element-select`](/packages/tp-ui-element-select)           | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-select)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-select)           |
| [`@thumbtack/tp-ui-element-table`](/packages/tp-ui-element-table)             | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-table)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-table)             |
| [`@thumbtack/tp-ui-element-textarea`](/packages/tp-ui-element-textarea)       | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-textarea)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-textarea)       |
| [`@thumbtack/tp-ui-element-type`](/packages/tp-ui-element-type)               | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-element-type)](https://badgen.net/npm/v/@thumbtack/tp-ui-element-type)               |
| [`@thumbtack/tp-ui-layout-block-list`](/packages/tp-ui-layout-block-list)     | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-block-list)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-block-list)     |
| [`@thumbtack/tp-ui-layout-button-row`](/packages/tp-ui-layout-button-row)     | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-button-row)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-button-row)     |
| [`@thumbtack/tp-ui-layout-form`](/packages/tp-ui-layout-form)                 | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-form)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-form)                 |
| [`@thumbtack/tp-ui-layout-grid`](/packages/tp-ui-layout-grid)                 | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-grid)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-grid)                 |
| [`@thumbtack/tp-ui-layout-input-row`](/packages/tp-ui-layout-input-row)       | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-input-row)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-input-row)       |
| [`@thumbtack/tp-ui-layout-longread`](/packages/tp-ui-layout-longread)         | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-longread)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-longread)         |
| [`@thumbtack/tp-ui-layout-wrap`](/packages/tp-ui-layout-wrap)                 | [![npm version](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-wrap)](https://badgen.net/npm/v/@thumbtack/tp-ui-layout-wrap)                 |

## Contributing

Thumbprint accepts issues and pull requests. Take at look at our [contribution guidelines](https://thumbprint.design/overview/contributing/) if you'd like to contribute. We also maintain a [CONTRIBUTING.md](CONTRIBUTING.md) file that contains developer-specific instructions.

## License

Thumbprint is licensed under the terms of the [Apache License 2.0](LICENSE).
