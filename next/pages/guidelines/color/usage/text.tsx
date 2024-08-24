import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { groupBy } from 'lodash-es';
import { ContentPage } from '../../../../components/mdx/mdx';
import { H2, H3, LI, P, UL } from '../../../../components/mdx/components';
import getLayoutProps from '../../../../utils/get-layout-props';
import ExampleBox from '../../../../components/example-box';
import UsageCategory from './usage-categories';
import ColorUsageNav from './color-usage-nav';
import { Usage, Image } from '../utils';

import intro from '../../../../images/pages/guide/product/color/usage/text/intro.png';
import neutral from '../../../../images/pages/guide/product/color/usage/text/neutral.png';
import primary from '../../../../images/pages/guide/product/color/usage/text/primary.png';
import success from '../../../../images/pages/guide/product/color/usage/text/success.png';
import guidance from '../../../../images/pages/guide/product/color/usage/text/guidance.png';
import alert from '../../../../images/pages/guide/product/color/usage/text/alert.png';
import caution from '../../../../images/pages/guide/product/color/usage/text/caution.png';
import accent from '../../../../images/pages/guide/product/color/usage/text/accent.png';

const images: Image = {
    neutral: {
        src: neutral,
        alt: 'user interface example where neutral colors are applied to text',
    },
    primary: {
        src: primary,
        alt: 'user interface example where primary colors are applied to text',
    },
    success: {
        src: success,
        alt: 'user interface example where success colors are applied to text',
    },
    guidance: {
        src: guidance,
        alt: 'user interface example where guidance colors are applied to text',
    },
    alert: {
        src: alert,
        alt: 'user interface example where alert colors are applied to text',
    },
    caution: {
        src: caution,
        alt: 'user interface example where caution colors are applied to text',
    },
    accent: {
        src: accent,
        alt: 'user interface example where accent colors are applied to text',
    },
};

export default function UsageText({
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

            <ColorUsageNav activeTab="text" />

            <ExampleBox>
                <div className="tc" style={{ minWidth: '375px' }}>
                    <img src={intro.src} width="375px" alt="" />
                </div>
            </ExampleBox>

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
    const filteredImplementations = usages.filter(item => item.values.usage === 'text');

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
