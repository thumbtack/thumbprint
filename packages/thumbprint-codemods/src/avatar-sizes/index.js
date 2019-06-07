/* eslint-disable no-console */

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

    const specifier = thumbprintReactImport
        .get()
        .value.specifiers.find(node => node.imported.name === 'Avatar');

    // Skip file if a `Avatar` is not imported
    if (!specifier) {
        return null;
    }

    // Get the variable name used for the `Avatar`
    const localSpecifier = specifier.local.name;

    // Get all of the `Avatar`s in the file.
    const avatars = root.find(j.JSXElement, {
        openingElement: { name: { name: localSpecifier } },
    });

    // Check to see if any use the "xlarge" size. If so, show an error and skip the file.
    if (usesXLargeSize(avatars, j)) {
        console.error(
            `⚠️  Could not automatically convert an \`Avatar\` that uses the "xlarge" size. Please manually update the \`Avatar\` at:\n${
                file.path
            }\n to use either "xlarge" or "large" based on your design requirements`,
        );
    }

    return avatars
        .forEach(path => {
            const { node } = path;

            node.openingElement.attributes = node.openingElement.attributes.map(attr => {
                if (attr.name && attr.name.name && attr.name.name === 'size') {
                    const attribute = attr;
                    const { value } = attribute.value;

                    if (value === 'large') {
                        attribute.value.value = 'medium';
                        return attribute;
                    }

                    if (value === 'medium') {
                        attribute.value.value = 'small';
                        return attribute;
                    }

                    if (value === 'small') {
                        attribute.value.value = 'xsmall';
                        return attribute;
                    }
                }
                return attr;
            });

            j(path).replaceWith(node);
        })
        .toSource();
};
