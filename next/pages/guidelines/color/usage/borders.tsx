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
                <TabNavItem isActive key={1} href="/guidelines/color/usage/borders">
                    Borders
                </TabNavItem>
                <TabNavItem isActive={false} key={1} href="/guidelines/color/usage/icons">
                    Icons
                </TabNavItem>
            </TabNav>

            <ExampleBox>Image</ExampleBox>

            <div>
                <H2>Borders</H2>
                <P>
                    Borders are used in product design to visually separate or delineate elements,
                    create hierarchy, and provide structure to the overall layout.
                </P>
            </div>
            <div>
                <H3>General principles</H3>
                <UL>
                    <LI>Use neutral values on non-interactive moments</LI>
                    <LI>
                        Borders are not used with colored backgrounds to accentuate separation or
                        elevation (excludes map overlays)
                    </LI>
                    <LI>Default border is Gray 300</LI>
                </UL>
            </div>

            <div>
                Repeat over border colors. Group by:
                <OL>
                    <LI>"usage" (borders)</LI>
                    <LI>"theme" (succes, primary, etc..)</LI>
                </OL>
                {/* https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/grid-jzs5ByTkFj/rows?useColumnNames=true */}
            </div>
        </ContentPage>
    );
}
