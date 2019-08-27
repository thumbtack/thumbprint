module.exports = {
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
    rules: {
        // Turned off due to false positives:
        // https://github.com/stylelint/stylelint/issues/2489
        'no-descending-specificity': null,
        // `:global` is used for CSS modules
        // https://github.com/stylelint/stylelint/issues/2208#issuecomment-269245751
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
    },
};
