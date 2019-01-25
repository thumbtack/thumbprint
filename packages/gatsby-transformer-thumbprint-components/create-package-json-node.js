const crypto = require('crypto');

module.exports = async ({ node, loadNodeContent }) => {
    const content = await loadNodeContent(node);
    const parsedContent = JSON.parse(content);

    const jsonNode = Object.assign({}, parsedContent, {
        id: `${node.id} >>> ThumbprintComponentPackageJson`,
        _dir: node.dir,
        children: [],
        parent: node.id,
        internal: {
            contentDigest: crypto
                .createHash('md5')
                .update(JSON.stringify(parsedContent))
                .digest('hex'),
            type: 'ThumbprintComponentPackageJson',
        },
    });

    return jsonNode;
};
