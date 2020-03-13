module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript'],
    plugins: [
        // Needed until `dynamic-import` becomes stage 4:
        // https://github.com/tc39/proposal-dynamic-import
        '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
        test: {
            // Allow async functions to work with tests.
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
            plugins: [
                // Allows Jest to understand dynamic imports. This won't be
                // needed once we're on Node v10.
                'babel-plugin-dynamic-import-node',
            ],
        },
    },
};
