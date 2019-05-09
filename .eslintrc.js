module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        // Prettier must come last
        'prettier',
        'prettier/react',
    ],
    plugins: ['jest', 'react-hooks'],
    env: {
        browser: true,
        node: true,
        'jest/globals': true,
    },
    rules: {
        // Has many false positives in monorepos
        'import/no-extraneous-dependencies': 'off',
        // Disabled because some packages contain subcomponents. Our documentation system currently
        // requires that they be defined in one file.
        'react/no-multi-comp': 'off',
    },
    overrides: [
        {
            files: ['packages/**/*'],
            rules: {
                // Disabled because rollup requires us to be explicit about the file extension.
                // https://github.com/rollup/rollup/issues/1052#issuecomment-260065475
                'import/extensions': 'off',
            },
        },
    ],
};
