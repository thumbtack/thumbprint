const createPackageJsonNode = require('./create-package-json-node');

const isPackageJson = node =>
    node.internal.mediaType === 'application/json' &&
    node.name === 'package' &&
    node.extension === 'json' &&
    !node.relativePath.includes('/node_modules/');

exports.onCreateNode = async ({ node, loadNodeContent, actions }) => {
    const { createNode, createParentChildLink } = actions;

    let newNode;

    // We only care about Thumbprint Components `package.json` and "kit" files. All `package.json`
    // files point to a "Kit" Yaml file that contains platform-agnostic information about a
    // component. Two `package.json` files that point to the same kit file will be grouped together
    // in the documentation.
    if (isPackageJson(node)) {
        newNode = await createPackageJsonNode({ node, loadNodeContent });
    } else {
        return;
    }

    createNode(newNode);
    createParentChildLink({ parent: node, child: newNode });
};
