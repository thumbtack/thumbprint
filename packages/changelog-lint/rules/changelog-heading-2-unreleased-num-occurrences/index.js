const rule = require('unified-lint-rule');
const select = require('unist-util-select');

const validate = (ast, file) => {
    const numberOfNodes = select(ast, 'heading[depth=2] > text[value="Unreleased"]').length;

    if (numberOfNodes !== 1) {
        file.message(
            `Changelog must contain one second level heading that says “Unreleased“ (${numberOfNodes} found).`,
        );
    }
};

module.exports = rule('remark-lint:changelog-heading-2-unreleased-num-occurrences', validate);
