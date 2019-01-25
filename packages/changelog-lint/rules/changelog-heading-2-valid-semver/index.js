const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');
const isSemVer = require('is-semver');

const isUnreleasedHeading = node => toString(node) === 'Unreleased';

const getSemVerRange = node =>
    toString(node)
        .split('-')[0]
        .trim();

const validate = (ast, file) => {
    visit(
        ast,
        node => node.type === 'heading' && node.depth === 2,
        node => {
            if (!isUnreleasedHeading(node) && !isSemVer(getSemVerRange(node))) {
                file.message(`“${getSemVerRange(node)}“ is not a valid SemVer version.`, node);
            }
        },
    );
};

module.exports = rule('remark-lint:changelog-heading-2-valid-semver', validate);
