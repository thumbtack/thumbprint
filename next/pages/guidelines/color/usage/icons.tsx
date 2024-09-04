import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { groupBy } from 'lodash-es';
import { ContentPage } from '../../../../components/mdx/mdx';
import { H2, H3, LI, P, UL } from '../../../../components/mdx/components';
import getLayoutProps from '../../../../utils/get-layout-props';
import ExampleBox from '../../../../components/example-box';
import UsageCategory from '../../../../utils/guidelines/color/color-usage-categories';
import ColorUsageNav from '../../../../utils/guidelines/color/color-usage-nav';
import { Usage, Image } from '../../../../utils/guidelines/color/color-usage-types';

import intro from '../../../../images/pages/guide/product/color/usage/icons/intro.png';
import neutral from '../../../../images/pages/guide/product/color/usage/icons/neutral.png';
import primary from '../../../../images/pages/guide/product/color/usage/icons/primary.png';
import success from '../../../../images/pages/guide/product/color/usage/icons/success.png';
import guidance from '../../../../images/pages/guide/product/color/usage/icons/guidance.png';
import alert from '../../../../images/pages/guide/product/color/usage/icons/alert.png';
import caution from '../../../../images/pages/guide/product/color/usage/icons/caution.png';
import accent from '../../../../images/pages/guide/product/color/usage/icons/accent.png';

const images: Image = {
    neutral: {
        src: neutral,
        alt: 'user interface example where neutral colors are applied to icons',
    },
    primary: {
        src: primary,
        alt: 'user interface example where primary colors are applied to icons',
    },
    success: {
        src: success,
        alt: 'user interface example where success colors are applied to icons',
    },
    guidance: {
        src: guidance,
        alt: 'user interface example where guidance colors are applied to icons',
    },
    alert: {
        src: alert,
        alt: 'user interface example where alert colors are applied to icons',
    },
    caution: {
        src: caution,
        alt: 'user interface example where caution colors are applied to icons',
    },
    accent: {
        src: accent,
        alt: 'user interface example where accent colors are applied to icons',
    },
};

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
                The use of color plays a key role in how we convey emotions, establish brand
                identity, and guide user interactions. Consistent and thoughtful color choices also
                improve usability, highlight important elements, and create a cohesive design
                language across the product.
            </P>

            <ColorUsageNav activeTab="icons" />

            <ExampleBox>
                <div className="tc" style={{ minWidth: '375px' }}>
                    <img src={intro.src} width="375px" alt="" />
                </div>
            </ExampleBox>

            <div>
                <H2>Icons</H2>
                <P>
                    Icons provide visual cues in the user experience and improve recognition by
                    conveying information in a compact and easily recognizable form. Use of color in
                    icons should coordinate with the space they occupy and any text.
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
