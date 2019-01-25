const rule = require('unified-lint-rule');
const { get } = require('lodash');

const validate = (ast, file) => {
    if (get(ast, 'children[0].type' !== 'heading') || get(ast, 'children[0].depth') !== 1) {
        file.message('Changelog must start with a top level heading named “# Changelog”');
    }
};

module.exports = rule('remark-lint:changelog-heading-1-first', validate);
