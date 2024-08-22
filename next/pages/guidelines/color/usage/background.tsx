import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { groupBy, keyBy } from 'lodash-es';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ContentPage } from '../../../../components/mdx/mdx';
import Alert from '../../../../components/alert/alert';
import getLayoutProps from '../../../../utils/get-layout-props';
import {
    CodeExperimental,
    H2,
    H3,
    LI,
    P,
    UL,
    OL,
    Img,
} from '../../../../components/mdx/components';
import SwatchUsage from '../../../../components/thumbprint-guide/swatch-usage';
import Swatch from '../../../../components/thumbprint-guide/swatch';
import TabNav, { TabNavItem } from '../../../../components/tab-nav/tab-nav';
import ExampleBox from '../../../../components/example-box';
import usageContentMappings from '../usage-mappings';

import custom from '../../../../images/pages/guide/product/aspect-ratio/avatar-customer.png';

interface Usage {
    browserLink: string;
    createdAt: string;
    href: string;
    id: string;
    index: number;
    name: string;
    type: string;
    updatedAt: string;
    values: {
        usage: string;
        // usage: string;
        theme: string;
        'light-hex': string;
        color: string;
        emphasis: string;
        interaction: string;
        description: string;
    };
}

export default function OverviewAbout({
    usages,
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Usage"
            description="Defining how we apply color to user interfaces"
            layoutProps={layoutProps}
        >
            {usages.length === 0 && (
                <Alert type="warning" title="Where are the components?">
                    You’ll need to add <InlineCode>CODA_API_TOKEN</InlineCode> environment variable
                    to a <InlineCode>www/.env</InlineCode> file in order to see the component
                    statuses while developing locally. Read the{' '}
                    <a
                        href="https://github.com/thumbtack/thumbprint/blob/master/CONTRIBUTING.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CONTRIBUTING.md
                    </a>{' '}
                    file for help.
                </Alert>
            )}

            <P>
                Color usage plays a key role in how we convey emotions, establishing brand identity,
                and guiding user interactions. Consistent and thoughtful color choices also improve
                usability, highlight important elements, and create a cohesive design language
                across the product.
            </P>

            <TabNav>
                <TabNavItem isActive key={1} href="/guidelines/color/usage/background">
                    Background
                </TabNavItem>
                <TabNavItem isActive={false} key={2} href="/guidelines/color/usage/text">
                    Text
                </TabNavItem>
                <TabNavItem isActive={false} key={3} href="/guidelines/color/usage/borders">
                    Borders
                </TabNavItem>
                <TabNavItem isActive={false} key={4} href="/guidelines/color/usage/icons">
                    Icons
                </TabNavItem>
            </TabNav>

            <ExampleBox>Image</ExampleBox>

            <div>
                <H2>Background colors</H2>
                <P>
                    Backgrounds foundational determine color usage hierarchically. Text, borders,
                    and icon color usage will vary depending on the background surface color.
                </P>

                <P>
                    To build a sense of elevation, backgrounds can also be layered on top of one
                    another. For example, a pill within a card can use color to build a visual
                    indexing importance that can be dictated by color.
                </P>

                <P>
                    Levels of emphasis can also be used to further accentuate the importance of
                    specific areas of the UI. By default, toasts use a high emphasis background to
                    drive impact to meaningful and timely moments.
                </P>
            </div>
            <div>
                <H3>General principles</H3>
                <UL>
                    <LI>Use neutral values for pages/views</LI>{' '}
                    <LI>
                        Core Primary color (Blue 400) is reserved for interactive elements (ex:
                        Button)
                    </LI>{' '}
                    <LI>Colors designated for feedback should be used sparingly</LI>
                    <LI>Avoid mixing color surfaces</LI>
                </UL>
            </div>

            <div>
                {Object.keys(usages).map(key => {
                    return (
                        <div key={key}>
                            <div className="mb4">
                                <H2>{usageContentMappings[key].title}</H2>
                                <P>{usageContentMappings[key].description}</P>
                            </div>
                            <table className="tp-body-2 black-300">
                                <tr className="bb b-gray-300">
                                    <th className="tl pv2 pr4">Color</th>
                                    <th className="tl pv2 pr4">Emphasis</th>
                                    <th className="tl pv2 pr4">Interaction</th>
                                    <th className="tl pv2 ">Description</th>
                                </tr>
                                {usages[key].map(component => {
                                    return (
                                        <tr className="bb b-gray-300" key={component}>
                                            <td className="v-top pv2 pr4 s_nowrap">
                                                <div>
                                                    <span
                                                        className="w1 h1 mr2 dib relative top-3 br2 b-gray-300 ba"
                                                        style={{
                                                            background: `${component.values['light-hex']}`,
                                                        }}
                                                    />
                                                    {component.values.color}
                                                </div>
                                            </td>
                                            <td className="v-top pv2 pr4">
                                                {component.values.emphasis}
                                            </td>
                                            <td className="v-top pv2 pr4">
                                                {component.values.interaction}
                                            </td>
                                            <td className="v-top pv2">
                                                {component.values.description}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </table>
                            <div className="pt3">
                                <span className="tp-body-3 black-300 ttu">Examples</span>
                                <ExampleBox>
                                    <div className="tc">
                                        <H3>{key}</H3>
                                    </div>
                                </ExampleBox>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ContentPage>
    );
}

export const getStaticProps = async () => {
    const listRowsRes = await fetch(
        // https://coda.io/developers/apis/v1#operation/listRows
        `https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/grid-jzs5ByTkFj/rows?useColumnNames=true`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CODA_API_TOKEN}`,
            },
        },
    );

    const data = listRowsRes.ok ? await listRowsRes.json() : null;
    const usages: Usage[] = data ? data.items : [];
    const filteredImplementations = usages.filter(item => item.values.usage === 'background');

    const groupedUsages = groupBy(filteredImplementations, usage => {
        return usage.values.theme;
    });

    return {
        props: {
            layoutProps: getLayoutProps(),
            usages: groupedUsages,
        },
    };
};
