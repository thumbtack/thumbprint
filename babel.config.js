module.exports = api => {
    api.cache.forever();

    const presets = ['@babel/preset-env', '@babel/preset-react'];
    const plugins = [
        [
            'inline-react-svg',
            {
                svgo: {
                    plugins: [
                        {
                            removeAttrs: {
                                attrs: '(data-name)',
                            },
                        },
                    ],
                },
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
