module.exports = [
    { name: 'formatId', value: ({ id }) => `$tp-${id}` },
    { name: 'formatValue', value: ({ value }) => value.web },
];
