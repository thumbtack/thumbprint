import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { CodeExperimental, H2, H3, LI, P, UL } from '../../../components/mdx/components';
import SwatchUsage from '../../../components/thumbprint-guide/swatch-usage';
import Swatch from '../../../components/thumbprint-guide/swatch';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Palette"
            description="A simple system for interfaces and illustrations"
            layoutProps={layoutProps}
        >
            <P>
                Core colors are expanded into a range of values to support varying moments within
                the product. The usage patterns for each value below can be found in our usage page.
            </P>

            <div>
                <H2>Color system</H2>
                <P>
                    These colors should be used to drive the user experience depending on their
                    intended use case and should be used sparingly to drive focus to moments that
                    matter from a branded or feedback perspective.
                </P>
            </div>

            <div>color palette table</div>

            <div className="ba b-gray-300 pa5 br3">
                <H2>Neutral</H2>
                <P>
                    Express default and less-opinionated UI elements such as background colors,
                    icons, and text elements.
                </P>
            </div>
        </ContentPage>
    );
}
