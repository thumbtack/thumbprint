const path = require('path');

exports.sourceNodes = ({ actions }) => {
    const { createTypes } = actions;

    // GraphQL requires that all queried fields exist and have the same data
    // type. For Thumbprint Tokens, we can't do that since some of the token
    // values are numbers and some are strings.
    //
    // Adding the (partial) schema definition here tells Gatsby to treat the
    // fields in `ThumbprintTokenTokensValue` as a string even if it sees
    // one that is a number.
    //
    // The `CodaImplementationsTable` definitions allow developers to run the
    // Thumbprint site locally without needing to set up a CODA API key. Read
    // the `CONTRIBUTING.md` file if you'd like to set this up.
    const typeDefs = `
        type ThumbprintToken implements Node {
            tokens: [ThumbprintTokenTokens!]!
        }

        type ThumbprintTokenTokens {
            value: ThumbprintTokenTokensValue!
        }

        type ThumbprintTokenTokensValue {
            web: String
            ios: String
            android: String
        }

        type CodaImplementationsTableDataValue {
            Component: String
            Platform: String
            Design_status: String
            Development_status: String
            Documentation_status: String
        }

        type CodaImplementationsTableData {
            values: CodaImplementationsTableDataValue
        }

        type CodaImplementationsTable implements Node {
            data: CodaImplementationsTableData
        }
    `;

    createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
    actions.setWebpackConfig({
        resolve: {
            // This prevents Webpack from following symlinks in production.
            // It's a workaround for a bug that is popping up in our
            // production build in IE 11. This should be removed when we
            // eventually drop support for IE 11 or something changes in
            // Webpack or Gatsby that makes us not need this line.
            // https://github.com/thumbtack/thumbprint/issues/230
            symlinks: process.env.NODE_ENV !== 'production',
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            alias: {
                // Use Thumbprint React and SCSS source files when `import`'ing
                // them in the documentation. By default, Webpack will use the
                // value of the `main` or `module` field in the package's
                // `package.json` file. This makes it difficult to develop
                // locally because it'd require re-compiling the code after
                // each change.
                '@thumbtack/thumbprint-react':
                    process.env.NODE_ENV === 'development'
                        ? path.resolve(__dirname, '../packages/thumbprint-react/index.js')
                        : '@thumbtack/thumbprint-react',
                '@thumbtack/thumbprint-scss':
                    process.env.NODE_ENV === 'development'
                        ? path.resolve(__dirname, '../packages/thumbprint-scss/components.scss')
                        : '@thumbtack/thumbprint-scss',
            },
        },
        module: {
            rules: [
                {
                    // We want to prevent `handlebars` from getting imported because it uses `fs`,
                    // a dependency that doesn't work well with Gatsby. `handlebars` is not
                    // actually needed. It is getting imported becuase we import functions from
                    // `packages/thumbprint-tokens/src/helpers/ios.js` in our iOS MDX file.
                    test: /handlebars/,
                    use: loaders.null(),
                },
            ],
        },
    });
};
