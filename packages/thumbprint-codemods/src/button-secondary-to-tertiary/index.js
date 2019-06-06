/* eslint-disable no-console */
const usesSpreadProps = (collection, j) =>
    collection.some(
        node =>
            j(node)
                .find(j.JSXSpreadAttribute)
                .size() > 0,
    );

const usesExpressionAsPropValue = (collection, j) =>
    collection.some(
        node =>
            j(node)
                .find(j.JSXAttribute, {
                    name: { name: 'theme' },
                    value: { type: 'JSXExpressionContainer' },
                })
                .size() > 0,
    );

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
    const root = j(file.source);

    const thumbprintReactImport = root.find(j.ImportDeclaration, {
        source: { value: '@thumbtack/thumbprint-react' },
    });

    // Skip file if there is no Thumbprint React import
    if (thumbprintReactImport.size() === 0) {
        return null;
    }

    const buttonSpecifier = thumbprintReactImport
        .get()
        .value.specifiers.find(node => node.imported.name === 'Button');

    // Skip file if a `Button` is not imported
    if (!buttonSpecifier) {
        return null;
    }

    // Get the variable name used for the `Button`
    const localSpecifier = buttonSpecifier.local.name;

    // Get all of the `Button`s in the file.
    const buttons = root.find(j.JSXElement, {
        openingElement: { name: { name: localSpecifier } },
    });

    // Check to see if any use the spread props. If so, show an error and skip the file.
    if (usesSpreadProps(buttons, j)) {
        console.error(
            `⚠️  Could not automatically convert a \`Button\` that spreads its props. Please manually update the \`Button\` at:\n${
                file.path
            }`,
        );
    }

    // We can't convert a `Button` automatically if the `theme` is an
    // expression like `theme={theme}`.
    if (usesExpressionAsPropValue(buttons, j)) {
        console.error(
            `⚠️  Could not automatically convert \`Button\`s that use expressions in \`theme\`. Please update:\n${
                file.path
            }`,
        );
    }

    // Skip file if all of the buttons are non-secondary.
    if (!usesSecondaryButtons(buttons, j)) {
        return null;
    }

    return buttons
        .forEach(path => {
            const { node } = path;

            node.openingElement.attributes = node.openingElement.attributes.map(attr => {
                if (attr.name && attr.name.name && attr.name.name === 'theme') {
                    const attribute = attr;
                    const { value } = attribute.value;

                    if (value === 'secondary') {
                        attribute.value.value = 'tertiary';
                        return attribute;
                    }
                }
                return attr;
            });

            j(path).replaceWith(node);
        })
        .toSource();
};
