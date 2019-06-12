/* eslint-disable no-console */

const changePropValues = require('../../lib/change-prop-values');

const usesSecondaryButtons = (collection, j) =>
    collection.some(
        node =>
            j(node)
                .find(j.JSXAttribute, {
                    name: { name: 'theme' },
                    value: { type: 'Literal', value: 'secondary' },
                })
                .size() > 0,
    );

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const ast = j(file.source);

    const res = changePropValues(
        file,
        api,
        ast,
        'Button',
        'theme',
        [
            {
                oldValue: 'secondary',
                newValue: 'tertiary',
            },
        ],
        [usesSecondaryButtons],
    );

    if (res === null) {
        return null;
    }

    return ast.toSource();
};
