module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        tsconfigRootDir: __dirname,
    },
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        // Prettier must come last
        'prettier',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                project: __dirname,
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
        '@typescript-eslint/no-explicit-any': 'error',

        // We use noop functions in many places, for example as default values for props.
        '@typescript-eslint/no-empty-function': 'off',

        // Not worth fixing. Just finish converting everything to TS instead.
        'react/prop-types': 'off',

        // Prop spreading is safe in TS
        'react/jsx-props-no-spreading': 'off',

        'import/extensions': 'off',

        // Disabled to make upgrading easier. TODO(giles): re-enable
        'react/function-component-definition': 'off',
        'react/jsx-fragments': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'no-use-before-define': 'off',
        'arrow-body-style': 'off',
        'react/destructuring-assignment': 'off',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                // Import plugin is not really needed for TS files, the TS compiler will throw an
                // error for missing imports
                'import/named': 'off',
                'import/export': 'off',

                // PropTypes are not needed for TS files
                'react/require-default-props': 'off',
            },
        },
        {
            files: ['**/*.js', '**/*.jsx'],
            rules: {
                // TypeScript rules don't apply in JS files
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
        {
            files: ['next/pages/**/*.tsx'],
            rules: {
                // We can use Next.js's `InferGetStaticPropsType` rather than specifying the return
                // type manually.
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
    ],
};
