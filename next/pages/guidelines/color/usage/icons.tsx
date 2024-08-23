import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { StaticImageData } from 'next/image';
import { groupBy } from 'lodash-es';
import { ContentPage } from '../../../../components/mdx/mdx';
import { H2, H3, LI, P, UL } from '../../../../components/mdx/components';
import getLayoutProps from '../../../../utils/get-layout-props';
import TabNav, { TabNavItem } from '../../../../components/tab-nav/tab-nav';
import ExampleBox from '../../../../components/example-box';
import UsageCategory from './usage-categories';

import intro from '../../../../images/pages/guide/product/color/usage/icons/intro.png';
import neutral from '../../../../images/pages/guide/product/color/usage/icons/neutral.png';
import primary from '../../../../images/pages/guide/product/color/usage/icons/primary.png';
import success from '../../../../images/pages/guide/product/color/usage/icons/success.png';
import guidance from '../../../../images/pages/guide/product/color/usage/icons/guidance.png';
import alert from '../../../../images/pages/guide/product/color/usage/icons/alert.png';
import caution from '../../../../images/pages/guide/product/color/usage/icons/caution.png';
import accent from '../../../../images/pages/guide/product/color/usage/icons/accent.png';

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

export default function UsageIcons({
    usages,
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

            <ExampleBox>
                <div className="tc" style={{ minWidth: '375px' }}>
                    <img src={intro.src} width="375px" alt="" />
                </div>
            </ExampleBox>

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
    const filteredImplementations = usages.filter(item => item.values.usage === 'icon');

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
