const sass = require('node-sass');
const crypto = require('crypto');
const importer = require('node-sass-tilde-importer');
const parseAst = require('./parse-ast');

const createCssNode = ({ node, actions }) => {
    const { createNode, createParentChildLink } = actions;

    // We convert to CSS first since we prefer the real values over tokens.
    const css = sass
        .renderSync({
            file: node.absolutePath,
            importer,
        })
        .css.toString();

    const cssNode = {
        id: `${node.absolutePath} >>> ThumbprintAtomicClasses`,
        parent: node.id,
        atomicFileName: node.name,
        atomicClasses: parseAst(css),
        children: [],
        internal: {
            contentDigest: crypto
                .createHash('md5')
                .update(css)
                .digest('hex'),
            type: 'ThumbprintAtomicClasses',
        },
    };

    createNode(cssNode);
    createParentChildLink({ parent: node, child: cssNode });
};

exports.onCreateNode = ({ node, actions }) => {
    // We only care about files within Thumbprint Atomic.
    if (
        !node.extension ||
        !node.relativePath ||
        node.relativePath.startsWith('thumbprint-atomic/src/packages/') === false
    ) {
        return;
    }

    // We only create nodes for the SCSS files because the Markdown files are handled by
    // `gatsby-plugin-remark`.
    if (node.extension === 'scss') {
        createCssNode({ node, actions });
    }
};
