module.exports = {
    formatValue: value => value.web,
    formatId: (section, token) => {
        const sectionName = section.name.replace(/\s+/g, '-').toLowerCase();
        return `$tp-${sectionName}__${token.id}`;
    },
};
