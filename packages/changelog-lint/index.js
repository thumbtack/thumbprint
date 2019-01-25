/* eslint-disable global-require */
const rules = [
    require('./rules/changelog-heading-1-first'),
    require('./rules/changelog-heading-1-num-occurrences'),
    require('./rules/changelog-heading-1-text'),
    require('./rules/changelog-heading-2-dash'),
    require('./rules/changelog-heading-2-unreleased-num-occurrences'),
    require('./rules/changelog-heading-2-valid-date'),
    require('./rules/changelog-heading-2-valid-semver'),
    require('./rules/changelog-heading-3-duplicate-sections'),
    require('./rules/changelog-heading-3-text-contents'),
    require('./rules/changelog-list-semver-severity'),
];

module.exports.plugins = [require('remark-lint'), ...rules];
