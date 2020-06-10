const gonzales = require('gonzales-pe');
const prettier = require('prettier');
const { flatten } = require('lodash');

/**
 * Ensures that the `atrule` node is for a media query.
 */
const isAtRuleAMediaQuery = atruleNode =>
    atruleNode.first('atkeyword').first('ident').content === 'media';

/**
 * Returns an array of rules such as `[ 'background-color: red !important;' ]`.
 */
const getBlockContent = blockNode => {
    const declarations = [];

    blockNode.traverseByType('declaration', n => {
        // Run through prettier to unminify the source CSS.
        // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#declaration
        declarations.push(prettier.format(n.toString(), { parser: 'css' }).replace('\n', ''));
    });

    return declarations;
};

const getRulesetContent = rulesetNode => {
    const data = {
        selectors: [],
        declarations: [],
    };

    // A ruleset contains a class (`.foo`) and `block` contains the rules.
    rulesetNode.traverse(n => {
        switch (n.type) {
            case 'selector':
                // Regex changes `.s\:bg-right` to `.s:bg-right`.
                // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#class
                data.selectors.push(n.toString().replace(/\\/g, ''));
                break;
            case 'block':
                // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#block
                data.declarations = getBlockContent(n);
                break;
            default:
                break;
        }
    });

    return data;
};

/**
 * `atrule` nodes are used for media queries (among other things). There are usually `ruleset`
 * nodes within them.
 *
 * Returns an array of objects.
 */
const getAtruleContent = atruleNode => {
    const classesWithinMediaQueries = [];

    if (isAtRuleAMediaQuery(atruleNode)) {
        atruleNode.traverse(node => {
            if (node.is('ruleset')) {
                classesWithinMediaQueries.push({
                    media: atruleNode.first('parentheses').toString(),
                    // Since this is a ruleset, we can reuse the function that is run for nodes
                    // that aren't within media queries.
                    ...getRulesetContent(node),
                });
            }
        });
    }

    return classesWithinMediaQueries;
};

/**
 * Returns an array of objects that look like this:
 *
 * ```
 * {
 *   media: '(min-width: 701px)',
 *   selectors: ['.m:br-bottom'],
 *   declarations: [
 *     'border-top-left-radius: 0 !important;',
 *     'border-top-right-radius: 0 !important;'
 *   ]
 * }
 * ```
 */
module.exports = css => {
    const classes = [];
    const parseTree = gonzales.parse(css, { syntax: 'css' });

    // Starting at the top node, we only care about `ruleset` and `atrule` nodes. These will give
    // us a list of classes as well as information about media queries.
    parseTree.forEach(node => {
        if (node.is('ruleset')) {
            // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#ruleset
            classes.push(getRulesetContent(node));
        } else if (node.is('atrule')) {
            // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#atrule
            classes.push(getAtruleContent(node));
        }
    });

    return flatten(classes);
};
