/* eslint-disable no-console */
const usesSpreadProps = (instances, j) =>
    instances.some(
        node =>
            j(node)
                .find(j.JSXSpreadAttribute)
                .size() > 0,
    );

const usesExpressionAsPropValue = (instances, j, propName) =>
    instances.some(
        node =>
            j(node)
                .find(j.JSXAttribute, {
                    name: { name: propName },
                    value: { type: 'JSXExpressionContainer' },
                })
                .size() > 0,
    );

/**
 * @param file the JSCodeShift file object
 * @param api the JSCodeShift api object
 * @param ast the JSCodeShift AST to transform, as obtained by calling api.jscodeshift(file.source)
 * @param componentName the string name of the component to transform, eg. "Avatar"
 * @param propName the string name of the prop to transform, eg. "theme"
 * @param valuesMap an array of { oldValue, newValue } pairs to update values of the given prop
 * @param extraChecks an optional array of functions to run to perform extra checks on the file
 *
 * @returns null if the file was not modified, or the modified AST if it was
 */
module.exports = (file, api, ast, componentName, propName, valuesMap, extraChecks = []) => {
    const j = api.jscodeshift;

    const thumbprintReactImport = ast.find(j.ImportDeclaration, {
        source: { value: '@thumbtack/thumbprint-react' },
    });

    // Skip file if there is no Thumbprint React import
    if (thumbprintReactImport.size() === 0) {
        return null;
    }

    const specifier = thumbprintReactImport
        .get()
        .value.specifiers.find(node => node.imported.name === componentName);

    // Skip file if the component is not imported
    if (!specifier) {
        return null;
    }

    // Get the variable name used for the component
    const localSpecifier = specifier.local.name;

    // Get all of the instances of the component in the file.
    const instances = ast.find(j.JSXElement, {
        openingElement: { name: { name: localSpecifier } },
    });

    // Check to see if any use the spread props. If so, show an error and skip this instance.
    if (usesSpreadProps(instances, j)) {
        console.error(
            `⚠️  Could not automatically convert a \`${componentName}\` that spreads its props. Please manually update the \`${componentName}\` at:\n${file.path}`,
        );
    }

    // We can't convert a component automatically if the props are expression like `foo={bar}`.
    if (usesExpressionAsPropValue(instances, j, propName)) {
        console.error(
            `⚠️  Could not automatically convert a \`${componentName}\` that uses expressions in its props. Please update:\n${file.path}`,
        );
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const check of extraChecks) {
        const result = check(instances, j, file);

        if (result === false) {
            return null;
        }
    }

    instances.forEach(path => {
        const { node } = path;

        node.openingElement.attributes.forEach(attr => {
            if (attr.name && attr.name.name && attr.name.name === propName) {
                const attribute = attr;
                const { value } = attribute.value;

                valuesMap.forEach(({ oldValue, newValue }) => {
                    if (value === oldValue) {
                        attribute.value.value = newValue;
                    }
                });
            }
        });

        j(path).replaceWith(node);
    });

    return ast;
};
