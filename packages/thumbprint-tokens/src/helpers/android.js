const getTag = type => {
    // This is a helper because it's hard to do complicated conditionals within
    // `.handlebars` files. This function is similar to:
    // https://github.com/amzn/style-dictionary/blob/master/examples/advanced/custom-formats-with-templates/templates/android-xml.template
    if (type === 'color') {
        return 'color';
    }

    if (type === 'size') {
        return 'dimen';
    }

    return 'item';
};

module.exports = {
    formatValue: ({ value }) => value.android,

    formatId: (section, token) => {
        const formattedSection = section.name.replace(/\s+/g, '_').toLowerCase();
        const formattedToken = token.id.replace(/-/g, '_');

        // This conditional ensures that `<color name="red_300">#ffb0b0</color>` doesn't get
        // printed as `<color name="color_red_300">#ffb0b0</color>` since including the type
        // in the name is redundant in such a case.
        if (token.type === getTag(token.type)) {
            return formattedToken;
        }

        return `${formattedSection}_${formattedToken}`;
    },

    getTag,
};
