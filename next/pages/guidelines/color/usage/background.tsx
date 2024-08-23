import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { StaticImageData } from 'next/image';
import { groupBy } from 'lodash-es';
import { ContentPage } from '../../../../components/mdx/mdx';
import Alert from '../../../../components/alert/alert';
import InlineCode from '../../../../components/inline-code/inline-code';
import getLayoutProps from '../../../../utils/get-layout-props';
import { H2, H3, LI, P, UL } from '../../../../components/mdx/components';
import TabNav, { TabNavItem } from '../../../../components/tab-nav/tab-nav';
import ExampleBox from '../../../../components/example-box';
import UsageCategory from './usage-categories';

import intro from '../../../../images/pages/guide/product/color/usage/background/intro.png';
import neutral from '../../../../images/pages/guide/product/color/usage/background/neutral.png';
import primary from '../../../../images/pages/guide/product/color/usage/background/primary.png';
import success from '../../../../images/pages/guide/product/color/usage/background/success.png';
import guidance from '../../../../images/pages/guide/product/color/usage/background/guidance.png';
import alert from '../../../../images/pages/guide/product/color/usage/background/alert.png';
import caution from '../../../../images/pages/guide/product/color/usage/background/caution.png';
import accent from '../../../../images/pages/guide/product/color/usage/background/accent.png';

interface Image {
    [key: string]: {
        src: StaticImageData;
        alt: string;
    };
}

const images: Image = {
    neutral: {
        src: neutral,
        alt: 'alt text',
    },
    primary: {
        src: primary,
        alt: 'alt text',
    },
    success: {
        src: success,
        alt: 'alt text',
    },
    guidance: {
        src: guidance,
        alt: 'alt text',
    },
    alert: {
        src: alert,
        alt: 'alt text',
    },
    caution: {
        src: caution,
        alt: 'alt text',
    },
    accent: {
        src: accent,
        alt: 'alt text',
    },
};

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

export default function UsageBackground({
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

            <ExampleBox>
                <div className="tc" style={{ minWidth: '375px' }}>
                    <img src={intro.src} width="375px" alt="" />
                </div>
            </ExampleBox>

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

            <UsageCategory usages={usages} images={images} />
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
