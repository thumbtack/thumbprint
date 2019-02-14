module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
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
    ],
};
