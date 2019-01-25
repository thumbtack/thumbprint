const rule = require('unified-lint-rule');
const select = require('unist-util-select');
const toString = require('nlcst-to-string');

const validate = (ast, file) => {
    const headings = select(ast, 'heading[depth=3]');

    headings.forEach(node => {
        const expected = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];
        const actual = toString(node);

        if (!expected.includes(actual)) {
            file.message(
                `Third level heading must say one of the following: “${expected.join(
                    ', ',
                )}” (“${actual}” found).`,
                node,
            );
        }
    });
};

module.exports = rule('remark-lint:changelog-heading-3-text-contents', validate);
