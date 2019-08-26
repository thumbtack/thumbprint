/* eslint-disable no-console */
const changePropValues = require('../../lib/change-prop-values');

const usesXLargeSize = (collection, j) =>
    collection.some(
        node =>
            j(node)
                .find(j.JSXAttribute, {
                    name: { name: 'size' },
                    value: { type: 'Literal', value: 'xlarge' },
                })
                .size() > 0,
    );

const checkXLargeSize = (avatars, j, file) => {
    // Check to see if any use the "xlarge" size. If so, show an error and skip this instance of Avatar.
    if (usesXLargeSize(avatars, j)) {
        console.error(
            `⚠️  Could not automatically convert an \`Avatar\` or \`EntityAvatar\` that uses the "xlarge" size. Please manually update the component at:\n${file.path}\n to use either "xlarge" or "large" based on your design requirements`,
        );
    }
};

const propsMap = [
    {
        oldValue: 'large',
        newValue: 'medium',
    },
    {
        oldValue: 'medium',
        newValue: 'small',
    },
    {
        oldValue: 'small',
        newValue: 'xsmall',
    },
];

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const ast = j(file.source);

    const res1 = changePropValues(file, api, ast, 'Avatar', 'size', propsMap, [checkXLargeSize]);
    const res2 = changePropValues(file, api, ast, 'EntityAvatar', 'size', propsMap, [
        checkXLargeSize,
    ]);

    // Skip the file if neither transformation did anything
    if (res1 === null && res2 === null) {
        return null;
    }

    return ast.toSource();
};
