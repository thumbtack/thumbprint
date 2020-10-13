import React from 'react';
import Head from 'next/head';
import fse from 'fs-extra';
import sass from 'sass';
import nodeSassImporter from 'node-sass-tilde-importer';
import gonzales from 'gonzales-pe';
import prettier from 'prettier';
import { GetStaticProps } from 'next';
import Layout from '../../components/layout';

export default function Components(): React.ReactNode {
    return (
        <Layout>
            <Head>
                <title>Atomic / Thumbprint</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Thumbprint Atomic</h1>
            </main>
        </Layout>
    );
}

/**
 * Ensures that the `atrule` node is for a media query.
 */
const isAtRuleAMediaQuery = (atruleNode): boolean =>
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

const parseAST = (css: string) => {
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

    return classes.flat();
};

export const getStaticProps: GetStaticProps = async () => {
    const atomicSassFilesPath = '../packages/thumbprint-atomic/src/packages';
    const directoryPath = atomicSassFilesPath;
    const files = await fse.readdir(directoryPath);

    const classes = files.map(file => {
        const css = sass
            .renderSync({ file: `${atomicSassFilesPath}/${file}`, importer: nodeSassImporter })
            .css.toString();
    });

    return {
        props: {},
    };
};
