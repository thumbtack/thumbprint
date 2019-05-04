const sassImporter = require('node-sass-tilde-importer');

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                importer: sassImporter,
            },
        },
    ],
};
