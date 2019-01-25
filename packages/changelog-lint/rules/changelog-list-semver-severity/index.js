const rule = require('unified-lint-rule');
const select = require('unist-util-select');
const toString = require('nlcst-to-string');

const includesSquareBrackets = node => select(node, 'linkReference').length > 0;

const startsWithSemVer = node => {
    const actual = toString(node);
    return (
        actual.startsWith('Major ') || actual.startsWith('Minor ') || actual.startsWith('Patch ')
    );
};

const validate = (ast, file) => {
    const headings = select(ast, 'listItem');

    headings.forEach(node => {
        if (!includesSquareBrackets(node) || !startsWithSemVer(node)) {
            file.message(
                'List items must start with `[Major]`, `[Minor]`, or `[Patch]`. There must be a space after the severity.',
                node,
            );
        }
    });
};

module.exports = rule('remark-lint:changelog-list-semver-severity', validate);
