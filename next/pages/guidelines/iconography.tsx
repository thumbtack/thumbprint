import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import {
    ContentActionsAttachMedium,
    ContentActionsAttachSmall,
    ContentActionsAttachTiny,
} from '@thumbtack/thumbprint-icons';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import { H2, P, Table, TD, TH } from '../../components/mdx/components';
import Alert from '../../components/alert/alert';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Iconography"
            description="Consistently styled visuals for our products."
            layoutProps={layoutProps}
        >
            <P>
                Used sparingly, <a href="/icons/">Thumbprint icons</a> provide increased meaning and
                visual importance to sections of content and user actions. Our published set
                consists of about 100 custom-drawn icons divided into nine categories, with a back
                catalog of another 400 that can be added as needed.
            </P>

            <H2>Sizes</H2>

            <P>
                Each icon comes in at least two sizes, &quot;medium&quot; and &quot;small&quot;,
                with a smaller number in a &quot;tiny&quot; size, and each is available for React,
                HTML, Android, PNGs for iOS, and the SVG itself.
            </P>

            <Table>
                <thead>
                    <tr>
                        <TH>Size</TH>
                        <TH>Dimensions</TH>
                        <TH>Example</TH>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TD>Medium</TD>
                        <TD>28x28</TD>
                        <TD>
                            <ContentActionsAttachMedium />
                        </TD>
                    </tr>
                    <tr>
                        <TD>Small</TD>
                        <TD>18x18</TD>
                        <TD>
                            <ContentActionsAttachSmall />
                        </TD>
                    </tr>
                    <tr>
                        <TD>Tiny</TD>
                        <TD>14x14</TD>
                        <TD>
                            <ContentActionsAttachTiny />
                        </TD>
                    </tr>
                </tbody>
            </Table>

            <Alert type="warning" title="Don’t resize icons">
                Although SVGs are resolution independent these icons were pixel-aligned to be
                rendered only at the dimensions provided. If you have a special case please contact
                the Design Systems team.
            </Alert>
        </ContentPage>
    );
}
