const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        providerImportSource: '@mdx-js/react',
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@thumbtack/thumbprint-react'],
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
        // We do this separately in CI.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // We do this separately in CI.
        ignoreBuildErrors: true,
    },
    // Match what we've already been doing with Gatsby to make the migration easier. We can remove
    // this once we've migrated all of the pages if we want to use the Next.js default.
    trailingSlash: true,
    async redirects() {
        return [
            {
                source: '/guide/product/:path*',
                destination: '/guidelines/:path*',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return {
            afterFiles: [
                // Proxy everything except the homepage to the Gatsby version of the site.
                // We will remove routes from this once they're ready to launch in Next.js.
                {
                    source: '/components/:path*',
                    destination: 'https://thumbprint-gatsby.netlify.app/components/:path*/',
                },
                {
                    source: '/updates/:path*',
                    destination: 'https://thumbprint-gatsby.netlify.app/updates/:path*/',
                },
                {
                    source: '/help/:path*',
                    destination: 'https://thumbprint-gatsby.netlify.app/help/:path*/',
                },
            ],
            fallback: [
                {
                    // This is a fallback for any route that might've been missed above.
                    source: '/:path*',
                    destination: 'https://thumbprint-gatsby.netlify.app/:path*',
                },
            ],
        };
    },
    webpack: config => {
        // This allows Thumbprint React to work. It's needed for a bug in `next-transpile-modules`
        // was was ported over to Next.js and still exists as a bug in `transpilePackages`.
        // https://github.com/martpie/next-transpile-modules/issues/117
        //
        // The param is reassigned since this is Next.js convention in their docs.
        // eslint-disable-next-line no-param-reassign
        config.resolve.alias['@thumbtack/thumbprint-react'] =
            '@thumbtack/thumbprint-react/dist/es/index.js';

        return config;
    },
};

module.exports = withMDX(nextConfig);
