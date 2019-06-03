const handlebars = require('handlebars/dist/cjs/handlebars');
const { camelCase } = require('lodash');
const { toWords } = require('number-to-words');
// The path in the handlebars import allows us to use this file with webpack:
// https://github.com/wycats/handlebars.js/issues/1174

module.exports = {
    formatId: ({ id }) => {
        // Check if the `id` is a number
        if (parseInt(id, 10).toString() === id) {
            // Covert numerical strings to the written out word. "1", for example, becomes
            // "one".
            return toWords(parseInt(id, 10));
        }

        return camelCase(id);
    },
    formatValue: ({ value }) => value.ios,
    formatSectionName: ({ name }) => {
        // Changes 'Border Radius' to 'BorderRadius'.
        return name.replace(/\s/g, '');
    },
    eachSectionWithPlatformTokens: function eachSectionWithPlatformTokens(sections, options) {
        if (!sections || sections.length === 0) {
            return options.inverse(this);
        }

        const data = options.data ? handlebars.createFrame(options.data) : undefined;
        const result = [];

        const filteredSections = sections.filter(s => s.tokens.some(t => t.value.ios));

        for (let i = 0; i < filteredSections.length; i += 1) {
            data.index = i;
            data.last = i === filteredSections.length - 1;
            result.push(options.fn(filteredSections[i], { data }));
        }

        return result.join('');
    },
};
