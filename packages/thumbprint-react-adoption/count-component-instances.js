const fs = require('fs');
const babel = require('@babel/parser');
const traverse = require('@babel/traverse');

const countComponentInstances = (component, file) => {
    const fileContents = fs.readFileSync(file, 'utf-8');
    const ast = babel.parse(fileContents, {
        sourceType: 'module',
        plugins: ['jsx', 'classProperties'],
    });

    let componentLocalName = component;
    let count = 0;

    // Check to see if the import is renamed. Store the new name if it is.
    traverse.default(ast, {
        ImportSpecifier: ({ node }) => {
            if (node.imported.name === component && node.local.name !== component) {
                componentLocalName = node.local.name;
            }
        },
    });

    traverse.default(ast, {
        JSXElement: ({ node }) => {
            if (node.openingElement.name.name === componentLocalName) {
                count += 1;
            }
        },
    });

    return count;
};

module.exports = countComponentInstances;
