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
            `⚠️  Could not automatically convert an \`Avatar\` that uses the "xlarge" size. Please manually update the \`Avatar\` at:\n${
                file.path
            }\n to use either "xlarge" or "large" based on your design requirements`,
        );
    }
};

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const ast = j(file.source);

    changePropValues(
        file,
        api,
        ast,
        'Avatar',
        'size',
        [
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
        ],
        [checkXLargeSize],
    );

    return ast.toSource();
};
