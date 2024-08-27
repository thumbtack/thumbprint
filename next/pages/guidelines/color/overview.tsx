import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { H2, H3, P } from '../../../components/mdx/components';
import usageContentMappings, {
    usageContent,
    emphasisContent,
    interactionContent,
    ContentMapping,
} from '../../../utils/color-usage-mappings';
import { Image } from '../../../utils/color-usage-types';
import ExampleBox from '../../../components/example-box';

import usage from '../../../images/pages/guide/product/color/overiew/usage.png';
import emphasis from '../../../images/pages/guide/product/color/overiew/emphasis.png';
import interaction from '../../../images/pages/guide/product/color/overiew/interaction.png';

const images: Image = {
    usage: {
        src: usage,
        alt: 'alt text',
    },
    emphasis: {
        src: emphasis,
        alt: 'alt text',
    },
    interaction: {
        src: interaction,
        alt: 'alt text',
    },
};

export const getStaticProps = getContentPageStaticProps;

function colorThemeTable({ type }: { type: string }): JSX.Element {
    return (
        <table className="collapse tp-body-2 mb3">
            <thead>
                <tr className="bb b-gray-300">
                    <th className="tl pb2">Value</th>
                    <th className="tl pb2">Description</th>
                </tr>
            </thead>
            <tbody>
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
                                <td className="v-top pt3 s_nowrap black-300">
                                    {usageContentMappings[key].description}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}

function OverviewTable({ list }: { list: ContentMapping }): JSX.Element {
    return (
        <table className="collapse tp-body-2 mb3">
            <thead>
                <tr className="bb b-gray-300">
                    <th className="tl pb2">Value</th>
                    <th className="tl pb2">Description</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(list).map(key => {
                    return (
                        <tr key={key}>
                            <td className="v-mid pt2 pr4 tl s_nowrap">
                                <span className="pv1 flex items-center br2 b">
                                    {list[key].title}
                                </span>
                            </td>
                            <td className="v-mid pt2 s_nowrap black-300">
                                {list[key].description}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default function Overview({ layoutProps }: InferGetStaticPropsType<typeof getStaticProps>) {
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

            <div className="mb5">
                <H3>Feedback colors</H3>
                <P>
                    These colors are used to help re-enforce important moments in the user journey
                    that suggest or require additional guidance, gather user input, and improve the
                    user experience.
                </P>
                {colorThemeTable({ type: 'feedback' })}
            </div>

            <Link href="/guidelines/color/palette/">See all colors</Link>

            <div className="mb5">
                <H2>Usage</H2>
                <P>
                    Color usage is arranged into four high-level categories background, border, text
                    and icon. Color usage patterns are represented by their intended use case.
                </P>
                <ExampleBox>
                    <div className="tc">
                        <img src={images.usage.src.src} width="375px" alt={images.usage.alt} />
                    </div>
                </ExampleBox>
                {OverviewTable({ list: usageContent })}
            </div>

            <Link href="/guidelines/color/usage/background/">Read more about color usage</Link>

            <div>
                <H2>Emphasis</H2>
                <P>
                    Not all experiences are treated equal. To provide varying levels of importance
                    in conjunction with the hue, we use levels of emphasis to draw the users
                    attention. A strong emphasis is high contrast in comparison to the surface the
                    component occupies.
                </P>
                <ExampleBox>
                    <div className="tc">
                        <img
                            src={images.emphasis.src.src}
                            width="375px"
                            alt={images.emphasis.alt}
                        />
                    </div>
                </ExampleBox>
                {OverviewTable({ list: emphasisContent })}
            </div>

            <div>
                <H2>Interaction</H2>
                <P>
                    Status such as hover, selected, disabled, and others describe how users engage
                    with content. Not all elements are interactive, but our{' '}
                    <Link href="/guidelines/color/usage/background/">color usage patterns </Link>{' '}
                    provide additional color definitions when applicable.
                </P>
                <ExampleBox>
                    <div className="tc">
                        <img
                            src={images.interaction.src.src}
                            width="375px"
                            alt={images.interaction.alt}
                        />
                    </div>
                </ExampleBox>
                {OverviewTable({ list: interactionContent })}
            </div>
        </ContentPage>
    );
}
