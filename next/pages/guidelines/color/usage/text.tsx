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
                <TabNavItem isActive key={1} href="/guidelines/color/usage/text">
                    Text
                </TabNavItem>
                <TabNavItem isActive={false} key={1} href="/guidelines/color/usage/borders">
                    Borders
                </TabNavItem>
                <TabNavItem isActive={false} key={1} href="/guidelines/color/usage/icons">
                    Icons
                </TabNavItem>
            </TabNav>

            <ExampleBox>Image</ExampleBox>

            <div>
                <H2>Text</H2>
                <P>
                    Text color can vary depending on the background surface. By default text, but
                    not exclusively, color should be neutral when on a neutral background (see
                    Accessibility for more information WCAG color contrast ratio requirements().
                </P>
            </div>
            <div>
                <H3>General principles</H3>
                <UL>
                    <LI>Use neutral values for general heading (strong) and body copy (default)</LI>
                    <LI>Primary (Blue 400) is reserved for link color</LI>
                    <LI>
                        When using color:
                        <UL>
                            <LI>Use sparingly</LI>
                            <LI>Refer to color themes for brand or feedback color guidelines</LI>
                            <LI>
                                Bold text should be at least 18.5px and 24px for non-bold copy on
                                core values.
                            </LI>
                        </UL>
                    </LI>
                </UL>
            </div>

            <div>
                Repeat over text colors. Group by:
                <OL>
                    <LI>"usage" (text)</LI>
                    <LI>"theme" (succes, primary, etc..)</LI>
                </OL>
                {/* https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/grid-jzs5ByTkFj/rows?useColumnNames=true */}
            </div>
        </ContentPage>
    );
}
