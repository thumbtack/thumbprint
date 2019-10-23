const { camelCase, isNumber } = require('lodash');

module.exports = {
    formatValue: value => {
        const { web: webValue } = value;

        if (isNumber(webValue)) {
            return webValue;
        }

        return `"${webValue}"`;
    },
    formatId: (section, token) => camelCase(`tp-${section.name}-${token.id}`),
};
