import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ContentPage } from '../../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../../utils/get-content-page-static-props';
import { CodeExperimental, H2, H3, LI, P, UL } from '../../../../components/mdx/components';
import SwatchUsage from '../../../../components/thumbprint-guide/swatch-usage';
import Swatch from '../../../../components/thumbprint-guide/swatch';
import TabNav, { TabNavItem } from '../../../../components/tab-nav/tab-nav';
import ExampleBox from '../../../../components/example-box';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Usage"
            description="Defining how we apply color to user interfaces"
            layoutProps={layoutProps}
        >
            <P>
                Color usage plays a key role in how we convey emotions, establishing brand identity,
                and guiding user interactions. Consistent and thoughtful color choices also improve
                usability, highlight important elements, and create a cohesive design language
                across the product.
            </P>

            <TabNav>
                <TabNavItem isActive={false} key={1} href="/guidelines/color/usage/background">
                    Background
                </TabNavItem>
                <TabNavItem isActive={false} key={1} href="/guidelines/color/usage/text">
                    Text
                </TabNavItem>
                <TabNavItem isActive={false} key={1} href="/guidelines/color/usage/borders">
                    Borders
                </TabNavItem>
                <TabNavItem isActive key={1} href="/guidelines/color/usage/icons">
                    Icons
                </TabNavItem>
            </TabNav>

            <ExampleBox>Image</ExampleBox>

            <div>
                <H2>Icons</H2>
                <P>
                    Icons provide visual cues in the user experience, and improve recognition by
                    conveying information in a compact and easily recognizable form. Color usage
                    patterns for icons should coordinated with the space they occupy and the pairing
                    with body copy.
                </P>
            </div>
            <div>
                <H3>General principles</H3>
                <UL>
                    <LI>Use neutral Black as default</LI>
                    <LI>
                        Color icons can be paired with text of same emphasis or neutral (strong)
                    </LI>
                    <LI>
                        Avoid pairing icon emphasis or colors with text or backgrounds of different
                        colors
                    </LI>
                    <LI>Icons should be singular solid color</LI>
                </UL>
            </div>

            <div>
                Repeat over icon colors. Group by:
                <OL>
                    <LI>"usage" (icons)</LI>
                    <LI>"theme" (succes, primary, etc..)</LI>
                </OL>
                {/* https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/grid-jzs5ByTkFj/rows?useColumnNames=true */}
            </div>
        </ContentPage>
    );
}
