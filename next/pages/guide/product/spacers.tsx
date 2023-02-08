import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPagteStaticProps from '../../../utils/get-content-page-static-props';
import { A, H2, H3, Img, LI, P, UL } from '../../../components/mdx/components';

import spacerLayout1 from '../../../images/pages/guide/product/spacers/spacer-layout-1.png';
import spacerLayout2 from '../../../images/pages/guide/product/spacers/spacer-layout-2.png';
import spacerLayout3 from '../../../images/pages/guide/product/spacers/spacer-layout-3.png';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Spacers"
            description="A simple system to encourage visual rhythm."
            layoutProps={layoutProps}
        >
            <P>
                Good spacing systems are based on simple mathematical principles with increments
                that are visually distinguishable. This toolkit gives designers and developers
                guidelines for effectively applying layout spacing, resulting in a more consistent
                application of space across our product.
            </P>
            <H2>16px = base increment</H2>
            <P>
                Our spacing system is built on a base increment of 16px, with factors of 4px and
                8px.
            </P>

            <div className="mb3">
                <Grid gutter="wide">
                    <GridColumn aboveSmall={6}>
                        <div className="pa3 bg-gray-200 h-100">
                            <div className="b mb3">Web</div>
                            <div className="flex items-center mb2">
                                <div className="h2" style={{ width: '4px', background: '#ffcdcf' }}>
                                    &nbsp;
                                </div>
                                <div className="ml2 b">4px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div className="h2" style={{ width: '8px', background: '#fed9b5' }}>
                                    &nbsp;
                                </div>
                                <div className="ml2 b">8px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '16px', background: '#feebb8' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">16px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '24px', background: '#c0e9d9' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">24px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '32px', background: '#b2e2f3' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">32px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '64px', background: '#e5d8fa' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">64px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '128px', background: '#eecbf7' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">128px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '256px', background: '#d1d3d4' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">256px</div>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={6}>
                        <div className="pa3 bg-gray-200 h-100">
                            <div className="b mb3">iOS and Android</div>
                            <div className="flex items-center mb2">
                                <div className="h2" style={{ width: '4px', background: '#ffcdcf' }}>
                                    &nbsp;
                                </div>
                                <div className="ml2 b">4px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div className="h2" style={{ width: '8px', background: '#fed9b5' }}>
                                    &nbsp;
                                </div>
                                <div className="ml2 b">8px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '16px', background: '#feebb8' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">16px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '24px', background: '#c0e9d9' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">24px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '32px', background: '#b2e2f3' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">32px</div>
                            </div>
                            <div className="flex items-center mb2">
                                <div
                                    className="h2"
                                    style={{ width: '48px', background: '#cce1ff' }}
                                >
                                    &nbsp;
                                </div>
                                <div className="ml2 b">48px</div>
                            </div>
                        </div>
                    </GridColumn>
                </Grid>
            </div>

            <H3>Platform specific</H3>
            <P>
                You’ll notice that our web and native spacing units are slightly different. This
                reflects the design needs of each platform. Please use these increments to maintain
                consistency.
            </P>
            <H3>What if I need to nudge something a few pixels?</H3>
            <P>
                If the implementation needs a subtle change, for example to tweak visual alignment,
                this can be done in web projects using the{' '}
                <A href="/atomic/#section-coordinates">Coordinates</A> classes. For native apps use
                custom code.
            </P>
            <H2>Spacing framework</H2>
            <P>
                To further our understanding and communication of space, we’ve broken down the types
                of space we apply in our system.
            </P>
            <P>We reference 2 types of space and apply them in 4 ways:</P>
            <UL>
                <LI>
                    <strong>basic (stack)</strong>
                </LI>
                <LI>
                    <strong>basic (inline)</strong>
                </LI>
                <LI>
                    <strong>inset-square</strong>
                </LI>
                <LI>
                    <strong>inset-asymmetrical</strong>
                </LI>
            </UL>
            <H3>Basic (stack and inline)</H3>
            <P>
                We use basic spacers for anywhere we need to apply horizontal or vertical space in
                our layouts. While we apply that space in the same way, we reference it’s
                application differently depending on if it’s horizontal or vertical space.
            </P>
            <UL>
                <LI>
                    <strong>Inline spacing</strong> refers to horizontally spaced objects.
                </LI>
                <LI>
                    <strong>Stack spacing</strong> refers to vertically stacked content.
                </LI>
            </UL>

            <div className="center pa3 mw8">
                <Img {...spacerLayout1} alt="Spacer layout" />
            </div>

            <H3>Inset (square and asymmetrical)</H3>
            <P>
                Inset spacing is used for UI components and containers. We apply that space either
                in an equal or asymmetrical way.
            </P>
            <UL>
                <LI>
                    <strong>Inset-square</strong> spacing is used to evenly apply spacing inside of
                    a container or component.
                </LI>
                <LI>
                    <strong>Inset-asymmetrical</strong> spacing is used to apply different
                    top/bottom and left/right values. We follow the box model in our classification
                    of asymmetrical values.
                </LI>
            </UL>

            <div className="mv5 tc center" style={{ maxWidth: '343px' }}>
                <Img {...spacerLayout2} alt="Spacer layout" />
                <div className="tp-body-3">Square inset of 16px.</div>
            </div>

            <div className="tc center" style={{ maxWidth: '343px' }}>
                <Img {...spacerLayout3} alt="Spacer layout" />
                <div className="tp-body-3">Asymmetrical inset of 24, 16px.</div>
            </div>
        </ContentPage>
    );
}
