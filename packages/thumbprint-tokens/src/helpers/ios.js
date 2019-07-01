const handlebars = require('handlebars');
const { camelCase } = require('lodash');
const { toWords } = require('number-to-words');

module.exports = [
    { name: 'formatValue', value: ({ value }) => value.ios },
    {
        name: 'formatId',
        value: ({ id }) => {
            // Check if the `id` is a number
            if (parseInt(id, 10).toString() === id) {
                // Covert numerical strings to the written out word. "1", for example, becomes
                // "one".
                return toWords(parseInt(id, 10));
            }

            return camelCase(id);
        },
    },
    {
        name: 'formatSectionName',
        value: ({ name }) =>
            // Changes 'Border Radius' to 'BorderRadius'.
            name.replace(/\s/g, ''),
    },
    {
        name: 'eachSectionWithPlatformTokens',
        /**
         * Filters the sections so that we only loop over ones that have iOS tokens.
         */
        value(sections, options) {
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
    },
    {
        name: 'ifEquals',
        value(arg1, arg2, options) {
            return arg1 === arg2 ? options.fn(this) : options.inverse(this);
        },
    },
];
