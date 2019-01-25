const _ = require('lodash');

const generateComment = (description, isDeprecated) => {
    const comments = [];

    if (description) {
        comments.push(`// ${description}`);
    }

    if (isDeprecated) {
        comments.push('// @deprecated');
    }

    if (comments.length > 0) {
        return `\n${comments.join('\n')}`;
    }

    return '';
};

const toCJS = (memo, { id, value, description, deprecated }) => {
    if (!id) {
        throw new Error('An `id` must be provided.');
    }

    if (!value) {
        throw new Error('A `value` must be provided.');
    }

    const formattedName = _.camelCase(id);
    const formattedValue = _.isNumber(value) ? value : `"${value}"`;
    const comment = generateComment(description, deprecated);

    return `${memo}${comment}\nexports.${formattedName} = ${formattedValue};`;
};

module.exports = toCJS;
