const path = require('path');

exports.sourceNodes = ({ actions }) => {
    const { createTypes } = actions;

    // GraphQL requires that all queried fields exist and have the same data
    // type.
    //
    // The `CodaImplementationsTable` definitions allow developers to run the
    // Thumbprint site locally without needing to set up a CODA API key. Read
    // the `CONTRIBUTING.md` file if you'd like to set this up.
    const typeDefs = `
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

exports.onCreateWebpackConfig = ({ actions }) => {
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
                        ? path.resolve(__dirname, '../packages/thumbprint-react/index.ts')
                        : '@thumbtack/thumbprint-react',
                '@thumbtack/thumbprint-scss':
                    process.env.NODE_ENV === 'development'
                        ? path.resolve(__dirname, '../packages/thumbprint-scss/components.scss')
                        : '@thumbtack/thumbprint-scss',
            },
        },
    });
};

/**
 * Create pages from the Markdown files created by Netlify CMS.
 *
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query {
            allFile(filter: { sourceInstanceName: { eq: "cms" }, ext: { eq: ".md" } }) {
                edges {
                    node {
                        name
                        relativeDirectory
                        relativePath
                        childMdx {
                            id
                            frontmatter {
                                title
                                description
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild("Can't load MDX files used by Netlify CMS.");
    }

    result.data.allFile.edges.forEach(({ node }) => {
        let slug;

        // These are all the collections that we use in Netlify CMS. The content also exists in
        // `www/static/admin/config.yml`.
        if (node.relativeDirectory === 'overview') {
            slug = `/overview/${node.name}/`;
        } else if (node.relativeDirectory === 'guide') {
            slug = `/guide/product/${node.name}/`;
        } else if (node.relativeDirectory === 'components-ios') {
            slug = `/components/${node.name}/ios/`;
        } else if (node.relativeDirectory === 'components-android') {
            slug = `/components/${node.name}/android/`;
        } else if (node.relativeDirectory === 'components-usage') {
            slug = `/components/${node.name}/usage/`;
        } else {
            reporter.panicOnBuild(
                `Can't generate a URL for the Markdown file in \`${node.relativePath}\`. Take a look at \`createPages\` in \`gatsby-node.js\`.`,
            );
        }

        createPage({
            path: slug,
            component: path.resolve(`./src/components/cms/index.jsx`),
            context: {
                id: node.childMdx.id,
                relatedComponentsGlob: `/components/${node.name}/*/`,
                isComponent: slug.startsWith('/components/'),
                frontmatter: {
                    title: node.childMdx.frontmatter.title,
                    description: node.childMdx.frontmatter.description,
                },
            },
        });
    });
};
