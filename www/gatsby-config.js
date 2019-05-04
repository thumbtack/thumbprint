const sassImporter = require('node-sass-tilde-importer');

module.exports = {
    plugins: [
        {
            // We need to hook up `src/pages` to `gatsby-source-filesystem` so that
            // `gatsby-remark-copy-linked-files` can process the MDX files and copy files.
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `/Users/doconnor/Thumbtack/thumbprint/www/src/pages`,
                ignore: ['**/*.mdx'],
            },
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                importer: sassImporter,
            },
        },
        {
            resolve: 'gatsby-mdx',
            options: {
                extensions: ['.mdx'],
                // defaultLayouts: {
                //     default: require.resolve('./src/components/mdx/index.jsx'),
                // },
                // gatsbyRemarkPlugins: [
                //     {
                //         resolve: 'gatsby-remark-copy-linked-files',
                //         options: { ignoreFileExtensions: [] },
                //     },
                //     { resolve: 'gatsby-remark-smartypants', options: {} },
                // ],
            },
        },
    ],
};
