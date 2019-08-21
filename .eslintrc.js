module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        // Prettier must come last
        'prettier',
        'prettier/react',
    ],
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

        // This was added in a newer version of ESLint, but we've disabled it since there are
        // already several instances of it. We may want to turn it back on in future as prop
        // spreading makes things harder to grep, debug, and reason about.
        'react/jsx-props-no-spreading': 'off',

        // Enforce the more explicit <React.Fragment> over <> since it's easier to grep for
        'react/jsx-fragments': ['error', 'element'],

        'react/no-array-index-key': 'off',
        'react/prop-types': 'off',

        // React hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
    overrides: [
        {
            files: ['packages/**/*'],
            rules: {
                // Disabled because rollup requires us to be explicit about the file extension.
                // https://github.com/rollup/rollup/issues/1052#issuecomment-260065475
                'import/extensions': 'off',

                // We may want to export multiple components from a single package
                'max-classes-per-file': 'off',
            },
        },
        {
            files: ['www/**/*.jsx'],
            rules: {
                // A lot of our internal components that power the docs don't have proper PropTypes.
                // Uncomment this if we ever want to go back in and clean them up.
                'react/prop-types': 'off',
            },
        },
        {
            files: 'packages/**/*test.jsx',
            rules: {
                // Don't enforce accessibility rules for unit tests, since no user ever sees them.
                'jsx-a11y/control-has-associated-label': 'off',
            },
        },
        {
            // Rules that should be applied only to code that gets bundled into our thumbprint-react
            // client library and shipped to browsers.
            // Since this code must run in IE11, it has stricter constraints than other parts of
            // this repo.
            files: ['packages/thumbprint-react/**/*'],
            excludedFiles: ['*test.jsx', '*.config.js'],
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
