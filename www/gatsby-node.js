const path = require('path');

exports.sourceNodes = ({ actions }) => {
    const { createTypes } = actions;

    // GraphQL requires that fields to have the same data type. We can't do
    // that since some of our token values are numbers and some are strings.
    // Adding the (partial) schema definition here tells Gatsby to treat the
    // fields in `ThumbprintTokenTokensValue` as a string even if it sees
    // one that is a number.
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
    `;

    createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
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
    });
};
