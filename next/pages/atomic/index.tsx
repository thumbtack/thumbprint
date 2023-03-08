import React from 'react';
import fs from 'node:fs';
import sass, { LegacyImporter } from 'sass';
import nodeSassImporter from 'node-sass-tilde-importer';
import gonzales from 'gonzales-pe';
import prettier from 'prettier';
import { GetStaticProps } from 'next';
import Link from 'next/link';
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
import PackageTable from '../../components/package-table/package-table';

interface AtomicProps {
    files: File[];
    layoutProps: LayoutProps;
    version: string;
}

function ExampleBox({ children }: { children: React.ReactNode }): JSX.Element {
    return <div className="pa3 ba b-gray-300 mb4 tp-body-2">{children}</div>;
}

export default function Atomic({ files, layoutProps, version }: AtomicProps): JSX.Element {
    return (
        <Layout {...layoutProps}>
            <Wrap>
                <PageHeader
                    pageTitle="Atomic"
                    metaTitle="Atomic"
                    description="CSS classes for composing layouts"
                />

                <PackageTable
                    version={version}
                    deprecated={false}
                    packageName="@thumbtack/thumbprint-atomic"
                    ecosystem="web"
                    sourceDirectory="https://github.com/thumbtack/thumbprint/tree/master/packages/thumbprint-atomic"
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

                <ExampleBox>
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
                </ExampleBox>

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
                    {`
<div className="aspect-ratio aspect-ratio-16x9">
    <iframe className="aspect-ratio-object" src="https://player.vimeo.com/..."></iframe>
</div>`}
                </CodeBlock>

                <P>
                    When using <InlineCode>aspect-ratio-object</InlineCode> be sure the embedded
                    content does not have conflicting <InlineCode>height</InlineCode> or{' '}
                    <InlineCode>width</InlineCode> values.
                </P>

                <Table atomicClasses={getClasses(files, 'aspect-ratio').classes} />

                <H2>Background Position</H2>

                <P>Sets location of a background image.</P>

                <Table atomicClasses={getClasses(files, 'background-position').classes} />

                <H2>Background Size</H2>

                <UL>
                    <LI>Determines how an background image will fill the container.</LI>
                    <LI>
                        Use with{' '}
                        <Link href="#section-background-position">background-position</Link> classes
                        to set image location.
                    </LI>
                </UL>

                <ExampleBox>
                    <div className="grid">
                        <div className="s_col-6 mb3 s_mb0">
                            <div
                                className="h5 contain ba b-gray"
                                style={{
                                    background:
                                        'url(https://placebear.com/420/320?image=2) no-repeat',
                                }}
                            />
                            <div className="tp-body-2">
                                <InlineCode>contain</InlineCode> will ensure that the entire image
                                is displayed within the element, regardless of the elements
                                dimensions.
                            </div>
                        </div>
                        <div className="s_col-6">
                            <div
                                className="h5 cover ba b-gray"
                                style={{
                                    background:
                                        'url(https://placebear.com/420/320?image=2) no-repeat',
                                }}
                            />
                            <div className="tp-body-2">
                                <InlineCode>cover</InlineCode> will ensure the entire element is
                                covered but won’t guarantee that the entire image will be shown.
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'background-size').classes} />

                <H2>Border</H2>

                <UL>
                    <LI>Set border on all sides or individual sides.</LI>
                    <LI>
                        Use with <Link href="#section-border-colors">border-colors</Link> classes.
                    </LI>
                </UL>

                <ExampleBox>
                    <div className="grid">
                        <div className="col-4">
                            <div>
                                <div className="h3 ba b-blue" />
                                <InlineCode theme="plain">ba b-blue</InlineCode>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="h3 bt b-blue" />
                                <InlineCode theme="plain">bt b-blue</InlineCode>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="h3 bb b-blue" />
                                <InlineCode theme="plain">bb b-blue</InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'border').classes} />

                <H2>Border Color</H2>

                <P>Applies border color to any active border.</P>

                <ExampleBox>
                    <div className="grid mb3">
                        <div className="col-4">
                            <div>
                                <div className="pv3 ba b-gray" />
                                <InlineCode theme="plain">ba b-gray</InlineCode>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="pv3 ba b-black" />
                                <InlineCode theme="plain">ba b-black</InlineCode>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="pv3 ba b-blue" />
                                <InlineCode theme="plain">ba b-blue</InlineCode>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="s_col-4">
                            <div className="mb3 s_mb0">
                                <div className="bg-gray-300 pv3 bb b-red" />
                                <InlineCode theme="plain">bb b-red</InlineCode>
                            </div>
                        </div>
                        <div className="s_col-4">
                            <div className="mb3 s_mb0">
                                <div className="bg-gray-300 pv3 bl b-red" />
                                <InlineCode theme="plain">bl b-red</InlineCode>
                            </div>
                        </div>
                        <div className="s_col-4">
                            <div>
                                <div className="bg-gray-300 pv3 bt b-red" />
                                <InlineCode theme="plain">bt b-red</InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'border-color').classes} />

                <H2>Border Radius</H2>

                <P>Add rounded corners.</P>

                <ExampleBox>
                    <div className="grid">
                        <div className="s_col-4">
                            <div className="mb3 s_mb0">
                                <div className="ba b-blue h4 br2" />
                                <InlineCode theme="plain">br2</InlineCode>
                            </div>
                        </div>
                        <div className="s_col-4">
                            <div className="mb3 s_mb0">
                                <div className="ba b-blue h4 br3" />
                                <InlineCode theme="plain">br3</InlineCode>
                            </div>
                        </div>
                        <div className="s_col-4">
                            <div>
                                <div className="ba b-blue h4 br3 br-top" />
                                <InlineCode theme="plain">br3 br-top</InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'border-radius').classes} />

                <H2>Border Style</H2>

                <P>Sets the style of the border.</P>

                <UL>
                    <LI>By default this sets the border style for all sides.</LI>
                    <LI>
                        Due to the way the CSS spec works if you want it to apply to only certain
                        sides, you’ll need to disable the sides you don’t want.
                    </LI>
                </UL>

                <ExampleBox>
                    <div className="grid">
                        <div className="s_col-4">
                            <div className="mb3 s_mb0">
                                <div className="ba b-blue b-dotted h3" />
                                <InlineCode theme="plain">ba b-blue b-dotted</InlineCode>
                            </div>
                        </div>
                        <div className="s_col-8">
                            <div>
                                <div className="bt b-blue b-dashed br-0 bb-0 bl-0 h3" />
                                <InlineCode theme="plain">
                                    ba b-blue b-dashed br-0 bb-0 bl-0
                                </InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'border-style').classes} />

                <H2>Border Width</H2>

                <P>
                    Border widths are set to <InlineCode>1px</InlineCode> by default, these classes
                    increase border width.
                </P>

                <ExampleBox>
                    <div className="grid">
                        <div className="col-4">
                            <div>
                                <div className="h3 ba b-gray bw-2" />
                                <InlineCode theme="plain">ba b-gray bw-2</InlineCode>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="h3 ba b-gray bw-3" />
                                <InlineCode theme="plain">ba b-gray bw-3</InlineCode>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="h3 ba b-gray bw-4" />
                                <InlineCode theme="plain">ba b-gray bw-4</InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'border-width').classes} />

                <H2>Box Shadow</H2>

                <ExampleBox>
                    <div className="grid">
                        <div className="m_col-3 mb3 m_mb0">
                            <div className="h5 mb1 shadow-100" />
                            <InlineCode theme="plain">shadow-100</InlineCode>
                        </div>
                        <div className="m_col-3 mb3 m_mb0">
                            <div className="h5 mb1 shadow-200" />
                            <InlineCode theme="plain">shadow-200</InlineCode>
                        </div>
                        <div className="m_col-3 mb3 m_mb0">
                            <div className="h5 mb1 shadow-300" />
                            <InlineCode theme="plain">shadow-300</InlineCode>
                        </div>
                        <div className="m_col-3">
                            <div className="h5 mb1 shadow-400" />
                            <InlineCode theme="plain">shadow-400</InlineCode>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'box-shadow').classes} />

                <H2>Color</H2>

                <UL>
                    <LI>Colors for text, links, and backgrounds.</LI>
                    <LI>Be sure to follow color usage guidelines.</LI>
                </UL>

                <ExampleBox>
                    <div className="grid mb3">
                        <div className="col-6">
                            <div className="pa2 ba b-gray black">This is copy.</div>
                            <InlineCode theme="plain">black</InlineCode>
                        </div>
                        <div className="col-6">
                            <div className="pa2 ba b-gray black-300">This is copy</div>
                            <InlineCode theme="plain">black-300</InlineCode>
                        </div>
                    </div>
                    <div className="grid mb3">
                        <div className="col-6">
                            <div className="pa2 bg-black">&nbsp;</div>
                            <InlineCode theme="plain">bg-black</InlineCode>
                        </div>
                        <div className="col-6">
                            <div className="pa2 bg-gray-200">&nbsp;</div>
                            <InlineCode theme="plain">bg-gray-200</InlineCode>
                        </div>
                    </div>
                    <div className="grid">
                        <div>
                            <div className="pa2 pa2 ba b-gray">
                                <a href="https://example.com" className="color-inherit flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        data-thumbprint-id="content-actions-check"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M21.5994,6.2001 C21.1604,5.8681 20.5324,5.9591 20.2014,6.4001 L11.8204,17.5751 L7.6244,14.2191 C7.1944,13.8741 6.5654,13.9451 6.2184,14.3751 C5.8734,14.8061 5.9454,15.4361 6.3744,15.7811 L12.1804,20.4251 L21.7994,7.6001 C22.1314,7.1581 22.0414,6.5311 21.5994,6.2001"
                                        />
                                    </svg>
                                    <div className="ml2">
                                        The svg icon and this text are inside an anchor element but
                                        they are not colored blue because they are inheriting their
                                        color from a parent.
                                    </div>
                                </a>
                            </div>
                            <InlineCode theme="plain">color-inherit</InlineCode>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'color').classes} />

                <H2>Coordinates</H2>

                <P>
                    Use in combination with the <Link href="#section-position">position</Link>{' '}
                    module.
                </P>

                <Table atomicClasses={getClasses(files, 'coordinates').classes} />

                <H2>Cursor</H2>

                <P>Use to change the mouse cursor style.</P>

                <Table atomicClasses={getClasses(files, 'cursor').classes} />

                <H2>Display</H2>

                <P>Options for block, inline, and tables elements.</P>

                <Table atomicClasses={getClasses(files, 'display').classes} />

                <H2>Flexbox</H2>

                <Table atomicClasses={getClasses(files, 'flexbox').classes} />

                <H2>Gap</H2>

                <Table atomicClasses={getClasses(files, 'gap').classes} />

                <H2>Font Weight</H2>

                <UL>
                    <LI>
                        Our Mark font only supports two weights: <InlineCode>400</InlineCode> and{' '}
                        <InlineCode>700</InlineCode>.
                    </LI>
                    <LI>
                        Use only when <Link href="/components/type/react/">Type</Link>
                        components are not adequate.
                    </LI>
                </UL>

                <ExampleBox>
                    <div className="grid">
                        <div className="col-6">
                            <div>
                                <div className="normal">I am the default weight.</div>
                                <InlineCode theme="plain">normal</InlineCode>
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <div className="b">I am the bold weight.</div>
                                <InlineCode theme="plain">b</InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'font-weight').classes} />

                <H2>Grid</H2>

                <P>
                    These classes should be used in place of the{' '}
                    <Link href="/components/grid/scss/">
                        SCSS
                        <InlineCode>grid</InlineCode>
                    </Link>
                    . That has been deprecated.
                </P>

                <UL>
                    <LI>Columns should be divisible by 12.</LI>
                    <LI>
                        The immediate child of a <InlineCode>grid</InlineCode> will default to 100%
                        width, which is common for mobile.
                    </LI>
                    <LI>
                        Use <InlineCode>col-*</InlineCode> classes to declare width of column.
                    </LI>
                    <LI>
                        A <InlineCode>grid</InlineCode> must wrap <InlineCode>col</InlineCode> as
                        immediate children.
                    </LI>
                </UL>

                <div className="pa3 ba b-gray mb4">
                    <InlineCode theme="plain">grid</InlineCode>
                    <div className="grid mb3">
                        <div className="s_col-3 mb3 s_mb0">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                        <div className="s_col-3 mb3 s_mb0">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                        <div className="s_col-6">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                    </div>
                    <InlineCode theme="plain">grid grid-wide</InlineCode>
                    <div className="grid grid-wide mb3">
                        <div className="s_col-3 mb3 s_mb0">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                        <div className="s_col-3 mb3 s_mb0">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                        <div className="s_col-6">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                    </div>
                    <InlineCode theme="plain">grid grid-flush</InlineCode>
                    <div className="grid grid-flush mb2">
                        <div className="s_col-3 mb3 s_mb0">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                        <div className="s_col-3 mb3 s_mb0">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                        <div className="s_col-6">
                            <div className="bg-gray-200 ba b-gray h3" />
                        </div>
                    </div>
                </div>

                <UL>
                    <LI>
                        In the examples the columns default to stacked, then side-by-side above the
                        small breakpoint based on col widths.
                    </LI>
                    <LI>
                        Note the margin-bottom classes that apply only below the small breakpoint
                        when columns are stacked.
                    </LI>
                </UL>

                <CodeBlock language="html" shouldRender={false}>
                    {`
<div className="grid">
    <div className="s_col-3 mb3 s_mb0">...content...</div>
    <div className="s_col-3 mb3 s_mb0">...content...</div>
    <div className="s_col-6">...content...</div>
</div>
<div className="grid grid-wide">
    <div className="s_col-3 mb3 s_mb0">...content...</div>
    <div className="s_col-3 mb3 s_mb0">...content...</div>
    <div className="s_col-6">...content...</div>
</div>
<div className="grid grid-flush">
    <div className="s_col-3 mb3 s_mb0">...content...</div>
    <div className="s_col-3 mb3 s_mb0">...content...</div>
    <div className="s_col-6">...content...</div>
</div>`}
                </CodeBlock>

                <H2>Multi-row</H2>

                <P>
                    Using multiple columns with a combined width that exceeds `12` will
                    automatically wrap into new rows. In this example the columns are stacked by
                    default, two per row above the small breakpoint, and three per row above the
                    medium breakpoint.
                </P>

                <CodeBlock language="html">
                    {`
<div class="grid">
    <div class="s_col-6 m_col-4"><div class="bg-gray-200 ba b-gray h3 mb3"></div></div>
    <div class="s_col-6 m_col-4"><div class="bg-gray-200 ba b-gray h3 mb3"></div></div>
    <div class="s_col-6 m_col-4"><div class="bg-gray-200 ba b-gray h3 mb3"></div></div>
    <div class="s_col-6 m_col-4"><div class="bg-gray-200 ba b-gray h3 mb3 m_mb0"></div></div>
    <div class="s_col-6 m_col-4"><div class="bg-gray-200 ba b-gray h3 mb3 s_mb0"></div></div>
    <div class="s_col-6 m_col-4"><div class="bg-gray-200 ba b-gray h3"></div></div>
</div>`}
                </CodeBlock>

                <H2>Centered grid</H2>

                <P>
                    Though this design pattern is often built using grid classes, it is more easily
                    solved by using <InlineCode>mw7 center tc</InlineCode>.
                </P>

                <CodeBlock language="html">
                    {`
<div class="mw7 center tc">
    <div class="ba b-green">
        “In our industry, you hear a lot of talk about the future of work. What I’ve come to believe
        — because I see it every day — is that the entrepreneurial spirit of independent
        professionals is the most precious resource we have as a society.”
    </div>
</div>`}
                </CodeBlock>

                <Table atomicClasses={getClasses(files, 'grid').classes} />

                <H2>Height</H2>

                <P>Options for setting fixed heights.</P>

                <ExampleBox>
                    <div className="grid">
                        <div className="col-2">
                            <div>
                                <div className="h1 bg-gray bb b-blue" />
                                <InlineCode theme="plain">h1</InlineCode>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="h2 bg-gray bb b-blue" />
                                <InlineCode theme="plain">h2</InlineCode>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="h3 bg-gray bb b-blue" />
                                <InlineCode theme="plain">h3</InlineCode>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="h4 bg-gray bb b-blue" />
                                <InlineCode theme="plain">h4</InlineCode>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="h5 bg-gray bb b-blue" />
                                <InlineCode theme="plain">h5</InlineCode>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="h6 bg-gray bb b-blue" />
                                <InlineCode theme="plain">h6</InlineCode>
                            </div>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'height').classes} />

                <H2>Margin</H2>

                <UL>
                    <LI>For setting positive, negative, and auto margins.</LI>
                    <LI>
                        Spacing can be applied to individual sides, vertical, horizontal, or all
                        sides.
                    </LI>
                </UL>

                <Table atomicClasses={getClasses(files, 'margin').classes} />

                <H2>Max Width</H2>

                <ExampleBox>
                    <div className="mb3">
                        <div className="h1 bg-gray br b-blue mw1" />
                        <InlineCode theme="plain">mw1</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray br b-blue mw2" />
                        <InlineCode theme="plain">mw2</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray br b-blue mw3" />
                        <InlineCode theme="plain">mw3</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray br b-blue mw4" />
                        <InlineCode theme="plain">mw4</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray br b-blue mw5" />
                        <InlineCode theme="plain">mw5</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray br b-blue mw6" />
                        <InlineCode theme="plain">mw6</InlineCode>
                    </div>
                    <div>
                        <div className="h1 bg-gray br b-blue mw7" />
                        <InlineCode theme="plain">mw7</InlineCode>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'max-width').classes} />

                <H2>Overflow</H2>

                <Table atomicClasses={getClasses(files, 'overflow').classes} />

                <H2>Padding</H2>

                <UL>
                    <LI>For setting padding.</LI>
                    <LI>
                        Spacing can be applied to individual sides, vertical, horizontal, or all
                        sides.
                    </LI>
                </UL>

                <Table atomicClasses={getClasses(files, 'padding').classes} />

                <H2>Position</H2>

                <Table atomicClasses={getClasses(files, 'position').classes} />

                <H2>Text Align</H2>

                <ExampleBox>
                    <div className="grid">
                        <div className="m_col-4 mb3 m_mb0">
                            <div className="bg-gray-200 pa2 tl">I’m aligned left</div>
                            <InlineCode theme="plain">tl</InlineCode>
                        </div>
                        <div className="m_col-4 mb3 m_mb0">
                            <div className="bg-gray-200 pa2 tc">I’m aligned center</div>
                            <InlineCode theme="plain">tc</InlineCode>
                        </div>
                        <div className="m_col-4">
                            <div className="bg-gray-200 pa2 tr">I’m aligned right</div>
                            <InlineCode theme="plain">tr</InlineCode>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'text-align').classes} />

                <H2>Text Decoration</H2>

                <ExampleBox>
                    <div className="grid">
                        <div className="m_col-6 mb3 m_mb0">
                            <div className="bg-gray-200 pa2 strike">Strikethrough</div>
                            <InlineCode theme="plain">strike</InlineCode>
                        </div>
                        <div className="m_col-6">
                            <div className="bg-gray-200 pa2 underline">Underlined</div>
                            <InlineCode theme="plain">underline</InlineCode>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'text-decoration').classes} />

                <H2>Text Transform</H2>

                <P>Manipulate case of text.</P>

                <ExampleBox>
                    <div className="grid">
                        <div className="col-4 mb3 m_mb0">
                            <div className="bg-gray-200 pa2 ttc">capitalize</div>
                            <InlineCode theme="plain">ttc</InlineCode>
                        </div>
                        <div className="col-4 mb3 m_mb0">
                            <div className="bg-gray-200 pa2 ttl">Lowercase</div>
                            <InlineCode theme="plain">ttl</InlineCode>
                        </div>
                        <div className="col-4">
                            <div className="bg-gray-200 pa2 ttu">uppercase</div>
                            <InlineCode theme="plain">ttu</InlineCode>
                        </div>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'text-transform').classes} />

                <H2>Truncate</H2>

                <P>Single-line truncation.</P>

                <UL>
                    <LI>An ellipsis will show only on Webkit browsers, like Safari and Chrome.</LI>
                    <LI>Truncating to two or more lines requires custom CSS.</LI>
                </UL>

                <CodeBlock language="html">
                    {`
<div class="truncate mb3 b">
    In the era of instant-everything, it’s crazy that you still have to waste an entire afternoon
    researching, calling and comparing local pros whenever you need one.
</div>

<div class="flex">
    <div class="truncate flex-auto">
        Hi, good to meet you. When do you think we could set up the meeting to decide the needs of
        the conference?
    </div>
    <div class="nowrap b ml2">Jun 21</div>
</div>`}
                </CodeBlock>

                <P>
                    In the second example the we use a flex container and a{' '}
                    <InlineCode>nowrap</InlineCode> to prevent the date from wrapping.
                </P>

                <Table atomicClasses={getClasses(files, 'truncate').classes} />

                <H2>Vertical Align</H2>

                <Table atomicClasses={getClasses(files, 'vertical-align').classes} />

                <H2>Visually Hidden</H2>

                <P>Text that is hidden but accessible.</P>

                <Table atomicClasses={getClasses(files, 'visually-hidden').classes} />

                <H2>White Space</H2>

                <P>Control how text wraps.</P>

                <UL>
                    <LI>
                        <InlineCode>nowrap</InlineCode>: Sequences of whitespace will collapse into
                        a single whitespace. Text will never wrap to the next line. The text
                        continues on the same line until a <InlineCode>&lt;br&rt;</InlineCode> tag
                        is encountered.
                    </LI>
                    <LI>
                        <InlineCode>pre</InlineCode>: Whitespace is preserved by the browser. Text
                        will only wrap on line breaks. Acts like the{' '}
                        <InlineCode>&lt;pre&rt;</InlineCode> tag in HTML.
                    </LI>
                </UL>

                <Table atomicClasses={getClasses(files, 'white-space').classes} />

                <H2>Width</H2>

                <UL>
                    <LI>Fixed and percentage widths.</LI>
                </UL>

                <ExampleBox>
                    <div className="mb3">
                        <div className="h1 bg-gray w1 br b-blue" />
                        <InlineCode theme="plain">w1</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray w2 br b-blue" />
                        <InlineCode theme="plain">w2</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray w3 br b-blue" />
                        <InlineCode theme="plain">w3</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray w4 br b-blue" />
                        <InlineCode theme="plain">w4</InlineCode>
                    </div>
                    <div className="mb3">
                        <div className="h1 bg-gray w5 br b-blue" />
                        <InlineCode theme="plain">w5</InlineCode>
                    </div>
                    <div>
                        <div className="h1 bg-gray w6 br b-blue" />
                        <InlineCode theme="plain">w6</InlineCode>
                    </div>
                </ExampleBox>

                <Table atomicClasses={getClasses(files, 'width').classes} />

                <H2>Word Break</H2>

                <UL>
                    <LI>
                        <InlineCode>word-wrap</InlineCode>: To prevent overflow, word may be broken
                        at any character.
                    </LI>
                    <LI>
                        <InlineCode>word-nowrap</InlineCode>: Word breaks should not be used for
                        Chinese/Japanese/Korean (CJK) text. Non-CJK text behavior is the same as
                        value “normal”.
                    </LI>
                </UL>

                <Table atomicClasses={getClasses(files, 'word-break').classes} />

                <H2>Z-Index</H2>

                <P>Use only in rare situations to change stacking order within components.</P>

                <Table atomicClasses={getClasses(files, 'z-index').classes} />
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
    const pathToAtomicSource = '../packages/thumbprint-atomic';
    const thumbprintAtomicPackageJsonPath = `${pathToAtomicSource}/package.json`;
    const atomicSassFilesPath = `${pathToAtomicSource}/src/packages`;
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

    const version = JSON.parse(fs.readFileSync(thumbprintAtomicPackageJsonPath, 'utf8'))?.version;

    if (!version) {
        throw new Error('Could not get version number from package.json');
    }

    return {
        props: {
            layoutProps: getLayoutProps(),
            files: data,
            version,
        },
    };
};
