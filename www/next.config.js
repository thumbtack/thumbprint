const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@thumbtack/thumbprint-react']);
const withImages = require('next-images');
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

module.exports = withPlugins(
    [[withMDX, { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'] }], withTM, withImages],
    {
        webpack: config => {
            // Note: we provide webpack above so you should not `require` it
            // Perform customizations to webpack config
            // eslint-disable-next-line no-param-reassign
            config.resolve.alias['@thumbtack/thumbprint-react'] =
                '@thumbtack/thumbprint-react/dist/es/index';

            return config;
        },
    },
);
