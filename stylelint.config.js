module.exports = {
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
    rules: {
        // Turned off due to false positives:
        // https://github.com/stylelint/stylelint/issues/2489
        'no-descending-specificity': null,
    },
};
