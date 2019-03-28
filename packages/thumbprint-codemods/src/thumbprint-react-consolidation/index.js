const recast = require('recast');
const parser = require('./parser');
const defaultExports = require('./default-exports');

const { builders, visit, namedTypes: types } = recast.types;

function buildImportSpecifiers(specifiers, packageName) {
    const specifierAsts = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const specifier of specifiers) {
        let exportName = specifier.local.name;
        const asName = specifier.local.name;

        if (types.ImportDefaultSpecifier.check(specifier)) {
            // Handle mismatched default specifiers
            // (e.g: `textInput` becomes `TextInput as textInput`)
            if (defaultExports[packageName]) {
                exportName = defaultExports[packageName];
            }
        } else {
            // Only non-default specifiers have `imported`
            exportName = specifier.imported.name;
        }

        // Only use `as` specifier if the names are different
        if (exportName === asName) {
            specifierAsts.push(builders.importSpecifier(builders.identifier(asName)));
        } else {
            specifierAsts.push(
                builders.importSpecifier(
                    builders.identifier(exportName),
                    builders.identifier(asName),
                ),
            );
        }
    }

    return specifierAsts;
}

module.exports = contents => {
    const ast = recast.parse(contents, { parser });
    let firstThumbprintImportIndex = null;
    let importSpecifierAsts = [];

    // Loop over all the import statements
    visit(ast, {
        visitImportDeclaration(path) {
            const { specifiers, source } = path.node;
            const packageName = source.value;
            this.traverse(path);

            // Ignore irrelevant imports
            if (!packageName.startsWith('@thumbtack/tp-ui-react')) {
                return;
            }

            // Save location of the first Thumbprint import
            if (firstThumbprintImportIndex === null) {
                firstThumbprintImportIndex = path.name;
            }

            importSpecifierAsts = importSpecifierAsts.concat(
                buildImportSpecifiers(specifiers, packageName),
            );

            // Remove import
            path.prune();
        },
    });

    // Do nothing if there was no Thumbprint imports
    if (importSpecifierAsts.length === 0) {
        return false;
    }

    // Build thumbprint-react import
    const importAst = builders.importDeclaration(
        importSpecifierAsts,
        builders.literal('@thumbtack/thumbprint-react'),
    );
    // Insert new import at the location of the first Thumbprint import
    ast.program.body.splice(firstThumbprintImportIndex, 0, importAst);
    return recast.print(ast).code;
};
