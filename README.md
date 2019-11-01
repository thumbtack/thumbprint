[![Build Status](https://badgen.net/travis/thumbtack/thumbprint)](https://travis-ci.org/thumbtack/thumbprint)

# Thumbprint

Thumbprint is the design system at Thumbtack. Though its primary purpose to support Thumbtack projects, we have open-sourced it for those interested in how we build and manage our documentation and code.

## Documentation

Thumbprint is documented at [thumbprint.design](https://thumbprint.design/).

[![Screenshot of Thumbprint documentation](https://i.imgur.com/ioUtLO5.png)](https://thumbprint.design/)

The documentation is hosted on Netlify and built with [Gatsby](https://www.gatsbyjs.org/) and [Gatsby MDX](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx).

## Overview

The Thumbprint codebase is a monorepo containing individually versioned NPM packages. These packges include:

| Package | Version | Size |
| --- | --- | --- |
| [`@thumbtack/thumbprint-atomic`](/packages/thumbprint-atomic) | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-atomic)](https://npmjs.com/package/@thumbtack/thumbprint-atomic) | [![Bundle size](https://badgen.net/bundlephobia/minzip/@thumbtack/thumbprint-atomic?label=gzip%20size)](https://bundlephobia.com/result?p=@thumbtack/thumbprint-atomic) |
| [`@thumbtack/thumbprint-react`](/packages/thumbprint-react) | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-react)](https://npmjs.com/package/@thumbtack/thumbprint-react) | [![Bundle size](https://badgen.net/bundlephobia/minzip/@thumbtack/thumbprint-react?label=gzip%20size)](https://bundlephobia.com/result?p=@thumbtack/thumbprint-react) |
| [`@thumbtack/thumbprint-scss`](/packages/thumbprint-scss) | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-scss)](https://npmjs.com/package/@thumbtack/thumbprint-scss) | [![Bundle size](https://badgen.net/bundlephobia/minzip/@thumbtack/thumbprint-scss?label=gzip%20size)](https://bundlephobia.com/result?p=@thumbtack/thumbprint-scss) |
| [`@thumbtack/thumbprint-global-css`](/packages/thumbprint-global-css) | [![npm version](https://badgen.net/npm/v/@thumbtack/thumbprint-global-css)](https://npmjs.com/package/@thumbtack/thumbprint-global-css) | [![Bundle size](https://badgen.net/bundlephobia/minzip/@thumbtack/thumbprint-global-css?label=gzip%20size)](https://bundlephobia.com/result?p=@thumbtack/thumbprint-global-css) |

## Contributing

Thumbprint accepts issues and pull requests. Take at look at our [contribution guidelines](https://thumbprint.design/overview/contributing/) if you'd like to contribute. We also maintain a [CONTRIBUTING.md](CONTRIBUTING.md) file that contains developer-specific instructions.

## License

Thumbprint is licensed under the terms of the [Apache License 2.0](LICENSE).
