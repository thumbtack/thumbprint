const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');

const validate = (ast, file) => {
    visit(
        ast,
        node => node.type === 'heading' && node.depth === 1,
        node => {
            const expected = 'Changelog';
            const actual = toString(node);

            if (actual !== expected) {
                file.message(`Top level heading must say “${expected}” (“${actual}” found).`, node);
            }
        },
    );
};

module.exports = rule('remark-lint:changelog-heading-1-text', validate);
