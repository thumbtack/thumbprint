import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { groupBy } from 'lodash-es';
import { ContentPage } from '../../../../components/mdx/mdx';
import { H2, H3, LI, P, UL } from '../../../../components/mdx/components';
import getLayoutProps from '../../../../utils/get-layout-props';
import ExampleBox from '../../../../components/example-box';
import UsageCategory from './usage-categories';
import ColorUsageNav from './color-usage-nav';
import { Usage, Image } from '../../../../utils/color-usage-types';

import intro from '../../../../images/pages/guide/product/color/usage/borders/intro.png';
import neutral from '../../../../images/pages/guide/product/color/usage/borders/neutral.png';
import guidance from '../../../../images/pages/guide/product/color/usage/borders/guidance.png';

const images: Image = {
    neutral: {
        src: neutral,
        alt: 'user interface example where neutral colors are applied to borders',
    },
    guidance: {
        src: guidance,
        alt: 'user interface example where guidance colors are applied to borders',
    },
};

export default function UsageBorders({
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

            <ColorUsageNav activeTab="borders" />

            <ExampleBox>
                <div className="tc" style={{ minWidth: '375px' }}>
                    <img src={intro.src} width="375px" alt="" />
                </div>
            </ExampleBox>

            <div>
                <H2>Border colors</H2>
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
    const filteredImplementations = usages.filter(item => item.values.usage === 'border');

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
