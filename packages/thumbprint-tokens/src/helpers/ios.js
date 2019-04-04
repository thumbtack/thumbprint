const { camelCase } = require('lodash');

module.exports = {
    formatValue: ({ value }) => value.ios,
    formatId: ({ id }) => camelCase(id),
};
