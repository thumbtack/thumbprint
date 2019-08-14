[![Netlify Status](https://api.netlify.com/api/v1/badges/10043c63-1dc0-47ef-a69d-583e55171728/deploy-status)](https://app.netlify.com/sites/thumbprint/deploys)

# thumbprint.design

The Thumbprint documentation is powered by [Gatsby](https://www.gatsbyjs.org/) and hosted on [Netlify](https://netlify.com/). It is deployed automatically when pull requests are merged into `master`.

## Running the documentation locally

Run `yarn start` in the Thumbprint root folder to run the documentation locally.

It will be available at [http://localhost:8090/](http://localhost:8090/).

## How to make changes

The [`src`](https://github.com/thumbtack/thumbprint/tree/master/www/src) folder contains all of the documentation's pages and components.

The URL for each page in our documentation maps exactly to a file in [`src/pages/`](https://github.com/thumbtack/thumbprint/tree/master/www/src/pages). These pages can import components from [`src/components`](https://github.com/thumbtack/thumbprint/tree/master/www/src/components) as well as packages from NPM. The available packages are defined in [this folder's `package.json`](https://github.com/thumbtack/thumbprint/blob/master/www/package.json).

### Working with MDX files

[MDX](https://mdxjs.com/) is a file format that allows you to render JSX within Markdown documents. Thumbprint uses [`gatsby-plugin-mdx`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx) to create the pages.

Each MDX file starts with front matter. Here's an example from our button component documentation:

```
---
title: Button
description: Clickable elements used to perform actions.
---
```

MDX files can include `import` statements and [Gatsby GraphQL queries](https://www.gatsbyjs.org/docs/querying-with-graphql/). Take a look at examples in `src/pages/` to learn more.

The Markdown in MDX files gets transformed by the `MDXProvider` component in [`src/components/mdx/index.jsx`](https://github.com/thumbtack/thumbprint/blob/master/www/src/components/mdx/index.jsx). `MDXProvider` allows us to map Markdown elements to custom React components.

#### Multiline code blocks in MDX

You can [use triple backticks](https://help.github.com/en/articles/creating-and-highlighting-code-blocks) to document code examples in MDX. Behind the scenes, this uses our [custom `CodeBlock` component](https://github.com/thumbtack/thumbprint/blob/master/www/src/components/mdx/code-block/index.jsx) to render examples and highlight the source code.

Beyond [specifying a language](https://help.github.com/en/articles/creating-and-highlighting-code-blocks#syntax-highlighting), the triple backticks can include the following custom configuration options:

-   `shouldRender`: Code written in `jsx` or `html` will render by default if [the language identifier](https://help.github.com/en/articles/creating-and-highlighting-code-blocks#syntax-highlighting) was included. You can use `shouldRender=false` to prevent the example from rendering. (Here's an [example from the `InputRow` React component](https://github.com/thumbtack/thumbprint/blob/e9016e6b8589710641dbd7ded6434095dab5cdf0/www/src/pages/components/input-row/react/index.mdx#L38-L42).)
-   `theme`: You can set a rendered example's background color to `light`, `dark`, or `white`. The option defaults to `white`. (Here's an [example from the React `Button` component](https://github.com/thumbtack/thumbprint/blob/e9016e6b8589710641dbd7ded6434095dab5cdf0/www/src/pages/components/button/react/index.mdx#L27-L29).)

## Troubleshooting

Try doing one of the following if you run into issues:

-   Run `yarn install` or `yarn install --force` in the Thumbprint root folder.
-   Check the version of Yarn or Node that you're using. Our [`CONTRIBUTING.md` file](https://github.com/thumbtack/thumbprint/blob/master/CONTRIBUTING.md) includes our version requirements.
-   Run `rm -rf www/.cache www/public` to clear Gatsby's cache. ([View related bug in Gatsby](https://github.com/gatsbyjs/gatsby/issues/11747).)

If these tips don't won't, reach out to [#design-systems](https://teamsanfrancisco.slack.com/messages/C7FLM0ZGU/details/) (internal to Thumbtack employees) or [create an issue](https://github.com/thumbtack/thumbprint/issues) on GitHub.
