const { resolver } = require('react-docgen');
const sassImporter = require('node-sass-tilde-importer');

module.exports = {
    siteMetadata: {
        title: 'Thumbprint',
        description: 'Thumbprint is the design system of Thumbtack.',
        siteUrl: 'https://thumbprint.design',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        'gatsby-plugin-typescript',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'packages',
                path: `${__dirname}/../packages/`,
                // Ignore these files because they make up ~70% of the file nodes. This was causing
                // Gatsby to run out of memory on Netlify deploys.
                // https://github.com/thumbtack/thumbprint-archive/issues/1093
                ignore: [
                    '**/dist',
                    '**/.cache',
                    '**/__snapshots__',
                    '**/*.map',
                    // Ignore tsconfig files, since they have a .json extension but also allow
                    // comments, which causes an error later in `gatsby-transformer-json` which
                    // expects strict JSON only.
                    '**/tsconfig*',
                ],
            },
        },
        {
            // We need to hook up `src/pages` to `gatsby-source-filesystem` so that
            // `gatsby-remark-copy-linked-files` can process the MDX files and copy files.
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'cms',
                path: `${__dirname}/src/cms`,
            },
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                importer: sassImporter,
            },
        },
        {
            resolve: 'gatsby-source-coda',
            options: {
                apiToken: process.env.CODA_API_TOKEN,
                docId: 'bXyUQb2tJW',
                tableIdOrName: 'Implementations',
                useColumnNames: true,
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                defaultLayouts: {
                    default: require.resolve('./src/components/mdx/index.jsx'),
                },
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: { ignoreFileExtensions: [] },
                    },
                    { resolve: 'gatsby-remark-smartypants', options: {} },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-compile-es6-packages',
            options: {
                modules: [
                    // These three packages are used by `react-live`, the dependency we use to
                    // render live component examples. Maintainer doesn't want to add IE 11
                    // support.
                    // https://github.com/mathiasbynens/regexpu-core/issues/15
                    'regexpu-core',
                    'unicode-match-property-ecmascript',
                    'unicode-match-property-value-ecmascript',
                ],
            },
        },
        {
            resolve: 'gatsby-transformer-json',
            options: {
                typeName: ({ node }) => {
                    if (
                        node.relativePath === 'thumbprint-scss/package.json' ||
                        node.relativePath === 'thumbprint-react/package.json'
                    ) {
                        return 'ThumbprintComponent';
                    }

                    return 'DefaultJson';
                },
            },
        },
        {
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'ThumbprintToken',
                fieldName: 'thumbprintToken',
                url: 'https://thumbprint-tokens.netlify.com/',
            },
        },
        'gatsby-transformer-thumbprint-atomic',
        {
            resolve: 'gatsby-transformer-react-docgen',
            options: {
                resolver: resolver.findAllExportedComponentDefinitions,
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-6981433-9',
            },
        },
        'gatsby-plugin-sitemap',
        'gatsby-plugin-lodash',
        'gatsby-plugin-netlify', // Netlify plugin must go last.
    ],
};
