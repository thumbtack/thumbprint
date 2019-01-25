const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');

const isUnreleasedHeading = node => toString(node) === 'Unreleased';

const hasDash = node => {
    const splitString = toString(node).split(' - ');

    const hasDashWithOneSpace = splitString.length === 2;
    const version = splitString[0];
    const date = splitString[1];

    return hasDashWithOneSpace && !version.endsWith(' ') && !date.startsWith(' ');
};

const validate = (ast, file) => {
    visit(
        ast,
        node => node.type === 'heading' && node.depth === 2,
        node => {
            if (!isUnreleasedHeading(node) && !hasDash(node)) {
                file.message(
                    'Second level heading contains a dash “-“ separated by one space on each side.',
                    node,
                );
            }
        },
    );
};

module.exports = rule('remark-lint:changelog-heading-2-dash', validate);
