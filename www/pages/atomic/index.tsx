import React from 'react';
import fse from 'fs-extra';
import sass from 'sass';
import nodeSassImporter from 'node-sass-tilde-importer';
import gonzales from 'gonzales-pe';
import prettier from 'prettier';
import { GetStaticProps } from 'next';
import Wrap from '../../components/wrap';
import PageHeader from '../../components/page-header';
import { H2, H3, UL, LI, InlineCode, P } from '../../components/mdx';
import Table from '../../components/thumbprint-atomic/table';
import getClasses from '../../components/thumbprint-atomic/get-classes';
import CodeBlock from '../../components/mdx/code-block';

interface CSSClass {
    media?: string;
    selectors: string[];
    declarations: string[];
}

interface File {
    file: string;
    classes: CSSClass[];
}

interface AtomicProps {
    files: File[];
}

export default function Atomic({ files }: AtomicProps): React.ReactNode {
    return (
        <Wrap>
            <PageHeader pageTitle="Atomic" metaTitle="Atomic" />

            <H2>Aspect Ratio</H2>

            <UL>
                <LI>
                    Available ratios are <InlineCode>16:9</InlineCode>,{' '}
                    <InlineCode>10:13</InlineCode>, <InlineCode>8:5</InlineCode>,{' '}
                    <InlineCode>7:3</InlineCode>, and <InlineCode>1:1</InlineCode>.
                </LI>
                <LI>
                    Used primarily to lock elements with background images in into a desired
                    proportion.
                </LI>
                <LI>
                    Also for fluid media embedded from third party sites like YouTube, Vimeo, etc.
                </LI>
            </UL>

            <div className="pa3 ba b-gray-300 mb4 tp-body-2">
                <div className="grid">
                    <div className="s_col-4 mb2 s_mb0">
                        <div
                            className="aspect-ratio aspect-ratio-1x1 bg-center mb1"
                            style={{ backgroundImage: 'url(https://picsum.photos/400/400)' }}
                        />
                        <InlineCode theme="plain">1:1</InlineCode>
                        <div
                            className="aspect-ratio aspect-ratio-7x3 bg-center mv2"
                            style={{ backgroundImage: 'url(https://picsum.photos/400/200)' }}
                        />
                        <InlineCode theme="plain">7:3</InlineCode>
                    </div>
                    <div className="s_col-4 mb2 s_mb0">
                        <div
                            className="aspect-ratio aspect-ratio-10x13 bg-center mb1"
                            style={{ backgroundImage: 'url(https://picsum.photos/400/600)' }}
                        />
                        <InlineCode theme="plain">10:13</InlineCode>
                    </div>
                    <div className="s_col-4">
                        <div
                            className="aspect-ratio aspect-ratio-8x5 bg-center mb1"
                            style={{ backgroundImage: 'url(https://picsum.photos/400/350)' }}
                        />
                        <InlineCode theme="plain">8:5</InlineCode>
                        <div
                            className="aspect-ratio aspect-ratio-16x9 bg-center mv2"
                            style={{ backgroundImage: 'url(https://picsum.photos/400/300)' }}
                        />
                        <InlineCode theme="plain">16:9</InlineCode>
                    </div>
                </div>
            </div>

            <H3>Block-level elements</H3>

            <CodeBlock
                language="html"
                shouldRender={false}
            >{`<div className="aspect-ratio aspect-ratio-8x5" style="background-image:url(...)"></div>`}</CodeBlock>

            <P>
                Don’t use any additional CSS on the element that changes{' '}
                <InlineCode>height</InlineCode> or <InlineCode>padding</InlineCode>.
            </P>

            <H3>Video embeds and iframes</H3>

            <CodeBlock language="html" shouldRender={false}>
                {`<div className="aspect-ratio aspect-ratio-16x9">
    <iframe className="aspect-ratio-object" src="https://player.vimeo.com/..."></iframe>
</div>`}
            </CodeBlock>

            <P>
                When using <InlineCode>aspect-ratio-object</InlineCode> be sure the embedded content
                does not have conflicting <InlineCode>height</InlineCode> or{' '}
                <InlineCode>width</InlineCode> values.
            </P>

            <Table atomicClasses={getClasses(files, 'aspect-ratio').classes} />
        </Wrap>
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
const getBlockContent = (blockNode): string[] => {
    const declarations = [];

    blockNode.traverseByType('declaration', n => {
        // Run through prettier to unminify the source CSS.
        // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#declaration
        declarations.push(prettier.format(n.toString(), { parser: 'css' }).replace('\n', ''));
    });

    return declarations;
};

const getRulesetContent = (
    rulesetNode,
): {
    selectors: string[];
    declarations: string[];
} => {
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
 */
const getAtruleContent = (atruleNode): CSSClass[] => {
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
 * Parses a CSS file into an array of classes.
 */
const parseAST = (css: string): CSSClass[] => {
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
    const files: string[] = await fse.readdir(directoryPath);

    const data = files.map(file => {
        const css = sass
            .renderSync({ file: `${atomicSassFilesPath}/${file}`, importer: nodeSassImporter })
            .css.toString();

        return {
            file,
            classes: parseAST(css),
        };
    });

    return {
        props: {
            files: data,
        },
    };
};
