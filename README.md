# Thumbprint

Thumbprint is the design system at Thumbtack. Though its primary purpose to support Thumbtack projects, we have open-sourced it for those interested in how we build and manage our documentation and code.

## Documentation

Thumbprint is documented at [thumbprint.design](https://thumbprint.design/).

[![Screenshot of Thumbprint documentation](https://i.imgur.com/ioUtLO5.png)](https://thumbprint.design/)

The documentation is hosted on Netlify and built with [Gatsby](https://www.gatsbyjs.org/) and [Gatsby MDX](https://github.com/ChristopherBiscardi/gatsby-mdx).

## Overview

The Thumbprint codebase is a monorepo containing individually versioned NPM packages. These packges include:

| Package                                                               | Version                                                                                                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`@thumbtack/thumbprint-atomic`](/packages/thumbprint-atomic)         | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-atomic)](https://badgen.net/npm/v/@thumbtack/thumbprint-atomic)         |
| [`@thumbtack/thumbprint-tokens`](/packages/thumbprint-tokens)         | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-tokens)](https://badgen.net/npm/v/@thumbtack/thumbprint-tokens)         |
| [`@thumbtack/thumbprint-react`](/packages/thumbprint-react)           | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-react)](https://badgen.net/npm/v/@thumbtack/thumbprint-react)           |
| [`@thumbtack/thumbprint-scss`](/packages/thumbprint-scss)             | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-scss)](https://badgen.net/npm/v/@thumbtack/thumbprint-scss)             |
| [`@thumbtack/thumbprint-global-css`](/packages/thumbprint-global-css) | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-global-css)](https://badgen.net/npm/v/@thumbtack/thumbprint-global-css) |

## Contributing

Thumbprint accepts issues and pull requests. Take at look at our [contribution guidelines](https://thumbprint.design/overview/contributing/) if you'd like to contribute. We also maintain a [CONTRIBUTING.md](CONTRIBUTING.md) file that contains developer-specific instructions.

## License

Thumbprint is licensed under the terms of the [Apache License 2.0](LICENSE).
