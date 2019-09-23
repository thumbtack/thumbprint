module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        // Prettier must come last
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                directory: './tsconfig.json',
            },
        },
    },
    plugins: ['jest', 'react-hooks', 'compat', 'lodash'],
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

        // React hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // Typescript
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        // Upgrade from warning to error
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
    },
    overrides: [
        {
            files: ['**/*.js', '**/*.jsx'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
        {
            files: ['packages/**/*'],
            rules: {
                // Disabled because rollup requires us to be explicit about the file extension.
                // https://github.com/rollup/rollup/issues/1052#issuecomment-260065475
                'import/extensions': 'off',
            },
        },
        {
            // Rules that should be applied only to code that gets bundled into our thumbprint-react
            // client library and shipped to browsers.
            // Since this code must run in IE11, it has stricter constraints than other parts of
            // this repo.
            files: ['packages/thumbprint-react/**/*'],
            excludedFiles: ['*test.jsx', '*test.tsx', '*.config.js'],
            rules: {
                // Check for uses of browser/DOM APIs that are not available in our supported browsers.
                'compat/compat': 'error',

                // Enable rules that check for erroneous uses of Lodash APIs
                'lodash/callback-binding': 'error',
                'lodash/collection-method-value': 'error',
                'lodash/collection-return': 'error',
                'lodash/no-double-unwrap': 'error',
                'lodash/no-extra-args': 'error',
                'lodash/no-unbound-this': 'error',
                'lodash/unwrap': 'error',

                // Only allow importing lodash methods like `import map from 'lodash/map'`.
                // This prevents accidentally importing the full library which would bloat our distributed bundles.
                'lodash/import-scope': ['error', 'method'],

                // Prefer Lodash methods to the native ones. This prevents using methods like
                // `Object.entries()` or `Array.find()` which will break in IE11.
                // We allow using common methods like Array.map which are available in all supported browsers.
                'lodash/prefer-lodash-method': [
                    2,
                    { ignoreMethods: ['map', 'filter', 'reduce', 'keys'] },
                ],
            },
        },
    ],
};
