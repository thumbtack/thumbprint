const renameImports = require('../../lib/rename-imports');

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const ast = j(file.source);

    const res = renameImports(api, ast, { Avatar: 'UserAvatar' });

    if (res === null) {
        return null;
    }

    return ast.toSource();
};
