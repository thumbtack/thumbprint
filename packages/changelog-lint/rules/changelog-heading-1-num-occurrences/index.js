const rule = require('unified-lint-rule');
const select = require('unist-util-select');

const validate = (ast, file) => {
    const numberOfNodes = select(ast, 'heading[depth=1]').length;

    if (numberOfNodes > 1) {
        file.message(`Change log must contain one top level heading (${numberOfNodes} found).`);
    }
};

module.exports = rule('remark-lint:changelog-heading-1-num-occurrences', validate);
