const path = require('path');

exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: 'babel-plugin-inline-react-svg',
        options: {
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
    });
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
    });
};
