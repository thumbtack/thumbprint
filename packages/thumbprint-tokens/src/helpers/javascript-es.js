const { camelCase, isNumber } = require('lodash');

module.exports = {
    formatValue: ({ value }) => {
        if (isNumber(value)) {
            return value;
        }

        return `"${value}"`;
    },
    formatId: ({ id }) => camelCase(`${id}`),
};
