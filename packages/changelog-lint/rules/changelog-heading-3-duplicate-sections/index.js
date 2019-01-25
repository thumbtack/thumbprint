const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');

const isHeading2 = node => node.type === 'heading' && node.depth === 2;
const isHeading3 = node => node.type === 'heading' && node.depth === 3;

const validate = (ast, file) => {
    visit(ast, isHeading2, (node, index) => {
        const heading3List = {};
        let visitingIndex = index + 1;
        let nodeToVisit = ast.children[visitingIndex];

        while (nodeToVisit && !isHeading2(nodeToVisit)) {
            if (isHeading3(nodeToVisit)) {
                if (heading3List[toString(nodeToVisit)]) {
                    file.message(
                        `Third-level heading “${toString(
                            nodeToVisit,
                        )}” appears twice within “${toString(node)}”.`,
                        nodeToVisit,
                    );
                } else {
                    heading3List[toString(nodeToVisit)] = true;
                }
            }

            visitingIndex += 1;
            nodeToVisit = ast.children[visitingIndex];
        }
    });
};

module.exports = rule('remark-lint:changelog-heading-3-duplicate-sections', validate);
