import React from 'react';
import fs from 'node:fs';
import sass, { LegacyImporter } from 'sass';
import nodeSassImporter from 'node-sass-tilde-importer';
import gonzales from 'gonzales-pe';
import prettier from 'prettier';
import { GetStaticProps } from 'next';
import Wrap from '../../components/wrap/wrap';
import PageHeader from '../../components/page-header/page-header';
import { H2, H3, UL, LI, P } from '../../components/mdx/components';
import InlineCode from '../../components/inline-code/inline-code';
import Table from '../../components/thumbprint-atomic/table/table';
import getClasses, {
    CSSClass,
    File,
} from '../../components/thumbprint-atomic/get-classes/get-classes';
import CodeBlock from '../../components/mdx/code-block/code-block';
import Layout from '../../components/layout/layout';
import getLayoutProps, { LayoutProps } from '../../utils/get-layout-props';

interface AtomicProps {
    files: File[];
    layoutProps: LayoutProps;
}

export default function Atomic({ files, layoutProps }: AtomicProps): React.ReactNode {
    return (
        <Layout {...layoutProps}>
            <Wrap>
                <PageHeader
                    pageTitle="Atomic"
                    metaTitle="Atomic"
                    description="CSS classes for composing layouts"
                />

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
                        Also for fluid media embedded from third party sites like YouTube, Vimeo,
                        etc.
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
                    When using <InlineCode>aspect-ratio-object</InlineCode> be sure the embedded
                    content does not have conflicting <InlineCode>height</InlineCode> or{' '}
                    <InlineCode>width</InlineCode> values.
                </P>

                <Table atomicClasses={getClasses(files, 'aspect-ratio').classes} />
            </Wrap>
        </Layout>
    );
}

type Node = {
    type: string;
    content: Node[] | string;
    syntax: 'css';
    start: { line: number; column: number };
    end: { line: number; column: number };
    traverseByType: (type: string, arg1: unknown) => void;
    traverse: (arg0: unknown) => void;
    first: (arg0: string) => Node;
    is: (type: string) => boolean;
};

/**
 * Ensures that the `atrule` node is for a media query.
 */
const isAtRuleAMediaQuery = (atruleNode: Node): boolean =>
    atruleNode.first('atkeyword').first('ident').content === 'media';

/**
 * Returns an array of rules such as `[ 'background-color: red !important;' ]`.
 */
const getBlockContent = (blockNode: Node): string[] => {
    const declarations: string[] = [];

    blockNode.traverseByType('declaration', (n: Node) => {
        // Run through prettier to unminify the source CSS.
        // https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md#declaration
        declarations.push(prettier.format(n.toString(), { parser: 'css' }).replace('\n', ''));
    });

    return declarations;
};

const getRulesetContent = (rulesetNode: Node): CSSClass => {
    const data: { selectors: string[]; declarations: string[] } = {
        selectors: [],
        declarations: [],
    };

    // A ruleset contains a class (`.foo`) and `block` contains the rules.
    rulesetNode.traverse((n: Node) => {
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
const getAtruleContent = (atruleNode: Node): CSSClass[] => {
    const classesWithinMediaQueries: CSSClass[] = [];

    if (isAtRuleAMediaQuery(atruleNode)) {
        atruleNode.traverse((node: Node) => {
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
    const classes: Array<CSSClass[] | CSSClass> = [];
    const parseTree = gonzales.parse(css, { syntax: 'css' });

    // Starting at the top node, we only care about `ruleset` and `atrule` nodes. These will give
    // us a list of classes as well as information about media queries.
    parseTree.forEach((node: Node) => {
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
    const files = fs.readdirSync(directoryPath);

    const data = files.map(file => {
        const { css } = sass.renderSync({
            file: `${atomicSassFilesPath}/${file}`,
            // The only difference is in the return type, which doesn't make a difference in practice,
            // so we're safe to typecast here.
            importer: nodeSassImporter as LegacyImporter<'sync'>,
        });

        return {
            file,
            classes: parseAST(css.toString()),
        };
    });

    return {
        props: {
            layoutProps: getLayoutProps(),
            files: data,
        },
    };
};
