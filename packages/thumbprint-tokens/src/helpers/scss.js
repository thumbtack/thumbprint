module.exports = [
    {
        name: 'formatId',
        value: (section, token) => {
            const sectionName = section.name.replace(/\s+/g, '-').toLowerCase();
            return `$tp-${sectionName}__${token.id}`;
        },
    },
    { name: 'formatValue', value: ({ value }) => value.web },
];
