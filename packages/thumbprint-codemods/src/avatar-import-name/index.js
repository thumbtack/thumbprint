const renameImports = require('../../lib/rename-imports');

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const ast = j(file.source);

    renameImports(ast, j, '@thumbtack/thumbprint-react', {
        Avatar: 'UserAvatar',
    });

    return ast.toSource();
};
