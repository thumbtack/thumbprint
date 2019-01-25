const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');

const isUnreleasedHeading = node => toString(node) === 'Unreleased';

const isValidDate = node => {
    const date = toString(node).split('-');
    const len = date.length;

    const day = date[len - 1];
    const month = date[len - 2];
    const year = date[len - 3] && date[len - 3].trim();

    return (
        parseInt(day, 10) >= 0 &&
        parseInt(day, 10) <= 31 &&
        parseInt(month, 10) >= 1 &&
        parseInt(month, 10) <= 12 &&
        day.length === 2 &&
        month.length === 2 &&
        year.length === 4
    );
};

const validate = (ast, file) => {
    visit(
        ast,
        node => node.type === 'heading' && node.depth === 2,
        node => {
            if (!isUnreleasedHeading(node) && !isValidDate(node)) {
                file.message(
                    `“${toString(node)}“ does not end with a valid date in the format YYYY-MM-DD.`,
                    node,
                );
            }
        },
    );
};

module.exports = rule('remark-lint:changelog-heading-2-valid-date', validate);
