const path = require('path');

exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: 'babel-plugin-inline-react-svg',
        options: {
            svgo: {
                plugins: [
                    {
                        removeAttrs: {
                            attrs: '(data-name)',
                        },
                    },
                ],
            },
        },
    });
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
    });
};

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        resolve(
            graphql(`
                query ThumprintPages {
                    allComponentApi: allMdx(
                        filter: { frontmatter: { mdxType: { eq: "componentApi" } } }
                    ) {
                        edges {
                            node {
                                frontmatter {
                                    package
                                    kit
                                    url
                                    platform
                                }
                                parent {
                                    ... on File {
                                        absolutePath
                                        relativeDirectory
                                    }
                                }
                            }
                        }
                    }
                    # These are all of the kits. We use this to create pages for the ones that have
                    # design documentation.
                    allKits: allMdx(filter: { frontmatter: { mdxType: { eq: "kit" } } }) {
                        edges {
                            node {
                                frontmatter {
                                    url
                                }
                                parent {
                                    ... on File {
                                        relativePath
                                    }
                                }
                            }
                        }
                    }
                }
            `).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }

                result.data.allKits.edges.forEach(({ node }) => {
                    const { url } = node.frontmatter;

                    if (url) {
                        createPage({
                            path: url,
                            component: path.resolve(
                                './src/components/thumbprint-components/page/index.jsx',
                            ),
                            context: {
                                // Example: `button/index.mdx`
                                kitPath: node.parent.relativePath,
                                isDesignGuidelinesPage: true,
                            },
                        });
                    }
                });

                // Create API documentation for Thumbprint components
                result.data.allComponentApi.edges.forEach(({ node }) => {
                    const { frontmatter } = node;

                    createPage({
                        path: frontmatter.url,
                        component: path.resolve(
                            './src/components/thumbprint-components/page/index.jsx',
                        ),
                        context: {
                            isDesignGuidelinesPage: false,
                            // Example: `@thumbtack/thumbprint-react`
                            package: frontmatter.package,
                            // Example: `thumbprint-react/components/Button`
                            pathToReactComponentFolder:
                                frontmatter.platform === 'react'
                                    ? node.parent.relativeDirectory
                                    : null,
                            // Example: `button/index.mdx`
                            kitPath: frontmatter.kit,
                            // Example: /components/button/react/
                            url: frontmatter.url,
                        },
                    });
                });

                return undefined;
            }),
        );
    });
};
