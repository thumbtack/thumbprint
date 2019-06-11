const some = require('lodash/some');

function memberExpression(j, ident, ...members) {
    return members.reduce(
        (expr, member) => j.memberExpression(expr, j.identifier(member)),
        j.identifier(ident),
    );
}

/**
 * @param api the JSCodeShift api object
 * @param ast the JSCodeShift AST to transform, as obtained by calling api.jscodeshift(file.source)
 * @param importMap an object mapping old component names to new component names
 *
 * @returns null if the file was not modified, or the modified AST if it was
 */
module.exports = function renameImports(api, ast, importMap) {
    const j = api.jscodeshift;

    const thumbprintReactImport = ast.find(j.ImportDeclaration, {
        source: { value: '@thumbtack/thumbprint-react' },
    });
    const importsByName = {};

    // Skip file if there is no Thumbprint React import
    if (thumbprintReactImport.size() === 0) {
        return null;
    }

    const doesImportComponent = some(
        importMap,
        (newName, oldName) =>
            !!thumbprintReactImport
                .get()
                .value.specifiers.find(node => node.imported.name === oldName),
    );

    // Skip file none of the components are imported
    if (!doesImportComponent) {
        return null;
    }

    function rewriteImport(from, to, members) {
        thumbprintReactImport.forEach(decl => {
            j(decl)
                .find(j.ImportSpecifier, { imported: { name: from } })
                .forEach(spec => {
                    if (importsByName[to] && members.length) {
                        // if the destination import already exists and there are members
                        // in this identifier, then this one is a dupe
                        j(spec).remove();
                    } else {
                        // otherwise, we can safely rename this one to the new identifier
                        // eslint-disable-next-line no-param-reassign
                        spec.node.imported.name = to;
                        importsByName[to] = spec;
                    }
                });
        });

        // replace all of the rewritten identifiers with member expressions
        ast.find(j.Identifier, { name: from })
            .filter(id => id.parent.node.type !== 'ImportSpecifier')
            .replaceWith(memberExpression(j, to, ...members));
    }

    thumbprintReactImport.forEach(decl => {
        j(decl)
            .find(j.ImportSpecifier)
            .forEach(spec => {
                importsByName[spec.node.imported.name] = spec;
            });
    });

    Object.entries(importMap).forEach(([from, to]) => {
        const idents = to.split('.');
        rewriteImport(from, idents[0], idents.slice(1));
    });

    return ast;
};
