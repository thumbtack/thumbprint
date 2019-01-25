const { map, isNumber, toString } = require('lodash');
const crypto = require('crypto');
const slugify = require('slugify');

const onCreateNode = async ({ node, actions, loadNodeContent }) => {
    const { createNode, createParentChildLink } = actions;

    // We only care about JSON content from Thumbprint Tokens.
    if (
        node.internal.mediaType !== 'application/json' ||
        node.relativePath.startsWith('thumbprint-tokens/src/tokens/') === false
    ) {
        return;
    }

    const content = await loadNodeContent(node);
    const parsedContent = JSON.parse(content);

    parsedContent.slug = slugify(parsedContent.name, { lower: true });

    // Convert the numerical token values to strings. This is needed because Gatsby isn't able
    // to handle values of different types. https://github.com/gatsbyjs/gatsby/issues/2404
    parsedContent.tokens = map(parsedContent.tokens, token => {
        const newToken = token;
        if (isNumber(token.value)) {
            newToken.value = toString(token.value);
        }
        return newToken;
    });

    const jsonNode = Object.assign({}, parsedContent, {
        id: `${node.id} >>> ThumbprintTokens`,
        children: [],
        parent: node.id,
        internal: {
            contentDigest: crypto
                .createHash('md5')
                .update(JSON.stringify(content))
                .digest('hex'),
            type: 'ThumbprintTokens',
        },
    });

    createNode(jsonNode);
    createParentChildLink({ parent: node, child: jsonNode });
};

exports.onCreateNode = onCreateNode;
