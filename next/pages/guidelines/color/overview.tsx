import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { H2, H3, P } from '../../../components/mdx/components';
import SwatchUsage from '../../../components/thumbprint-guide/swatch-usage';
import Swatch from '../../../components/thumbprint-guide/swatch';
import usageContentMappings, {
    usageContent,
    emphasisContent,
    interactionContent,
    ContentMapping,
} from './usage-mappings';

export const getStaticProps = getContentPageStaticProps;

function ExampleBox({ children }: { children: React.ReactNode }): JSX.Element {
    return <div className="pa4 ba b-gray-300 mb4 tp-body-2 bg-gray-200 br3">{children}</div>;
}

function colorThemeTable({ type }: { type: string }): JSX.Element {
    return (
        <table className="collapse tp-body-2 mb3">
            <tbody>
                <tr className="bb b-gray-300">
                    <th className="tl pb2">Value</th>
                    <th className="tl pb2">Description</th>
                </tr>
                {Object.keys(usageContentMappings)
                    .filter(key => usageContentMappings[key].type === type)
                    .map(key => {
                        return (
                            <tr key={key}>
                                <td className="v-mid pt3 pr3 tl s_nowrap">
                                    <span className="ba b-gray-300 ph2 pv1 flex items-center br2">
                                        <span
                                            className="w1 h1 mr2 dib br2 ba b-gray-300"
                                            style={{ background: usageContentMappings[key].color }}
                                        />
                                        {key}
                                    </span>
                                </td>
                                <td className="v-top pt3 s_nowrap">
                                    {usageContentMappings[key].description}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}

function overviewTable({ list }: { list: ContentMapping }): JSX.Element {
    return (
        <table className="collapse tp-body-2 mb3">
            <tbody>
                <tr className="bb b-gray-300">
                    <th className="tl pb2">Value</th>
                    <th className="tl pb2">Description</th>
                </tr>
                {Object.keys(list).map(key => {
                    return (
                        <tr key={key}>
                            <td className="v-mid pt2 pr4 tl s_nowrap">
                                <span className="pv1 flex items-center br2 b">
                                    {list[key].title}
                                </span>
                            </td>
                            <td className="v-mid pt2 s_nowrap">{list[key].description}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Overview"
            description="A simple system for interfaces and illustrations"
            layoutProps={layoutProps}
        >
            <P>
                Colors play a crucial role in communicating status, guidance, and providing visual
                cues. Color should be used sparingly to drive focus to moments that matter. Color
                should not be used to add personality or flair.
            </P>
            {/* <div>
                <H2>Naming</H2>
                <P>
                    Color names are unambiguous and direct. "Blue" means blue. We do this to avoid
                    unneeded abstractions. Extended color names, like black-300 are variations that,
                    like font-weight values, denote increasingly darker (500, 600) and increasingly
                    lighter shades (300, 200).
                </P>
            </div> */}

            <div>
                <H2>Color themes</H2>
                <P>
                    Our use of color can be defined in two major types classified as brand and
                    feedback colors.
                </P>
            </div>

            <div>
                <H3>Brand colors</H3>
                <P>
                    These colors are used to create a consistent visual identity and evoke specific
                    emotions or associations within a design system.
                </P>
                {colorThemeTable({ type: 'brand' })}
            </div>

            <div>
                <H3>Feedback colors</H3>
                <P>
                    These colors are used to help re-enforce important moments in the user journey
                    that suggest or require additional guidance, gather user input, and improve the
                    user experience.
                </P>
                {colorThemeTable({ type: 'feedback' })}
            </div>

            <div>
                <H2>Usage</H2>
                <P>
                    Color usage is arranged into four high-level categories background, border, text
                    and icon. Color usage patterns are represented by their intended use case.
                </P>
                <ExampleBox>Image</ExampleBox>
                {overviewTable({ list: usageContent })}
            </div>

            <div>
                <H2>Emphasis</H2>
                <P>
                    Not all experiences are treated equal. To provide varying levels of importance
                    in conjunction with the hue, we use levels of emphasis to draw the user’s
                    attention. A strong emphasis is high contrast in comparison to the surface the
                    component occupies.
                </P>
                <ExampleBox>Image</ExampleBox>
                {overviewTable({ list: emphasisContent })}
            </div>

            <div>
                <H2>Interaction</H2>
                {/* <P className="b">Moments of user engagement.</P> */}
                <P>
                    Status such as hover, selected, disabled, and others describe how users engage
                    with content. Not all elements are interactive, but our color usage patterns
                    provide additional color definitions when applicable.
                </P>
                <ExampleBox>Image</ExampleBox>
                {overviewTable({ list: interactionContent })}
            </div>
        </ContentPage>
    );
}
