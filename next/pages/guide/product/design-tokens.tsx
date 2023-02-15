import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { Code, Img, LI, P, UL } from '../../../components/mdx/components';

import tokensImage from '../../../images/pages/guide/product/design-tokens/tokens.png';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Design tokens"
            description="Variables for visual consistency across platforms."
            layoutProps={layoutProps}
        >
            <P>
                Design tokens power the visual building blocks of Thumbprint. Values for colors,
                type, and breakpoints, among many others, are stored in a simple format that are
                converted and distributed to specific programming languages.
            </P>

            <P>
                <Img {...tokensImage} alt="Screenshot showing how tokens work" />
            </P>

            <P>
                Because tokens are our &quot;single source of truth&quot;, changes are only made in
                one place. Project maintainers update their version of the tokens to receive
                updates, easing coordination and reducing human error.
            </P>
            <h2>Code example</h2>
            <P>Our color blue, like all other tokens, is stored as an object.</P>
            <Code language="javascript">
                {`
{
    "name": "Blue",
    "id": "tp-color__blue",
    "value": "#009fd9",
    "type": "color"
}
`}
            </Code>
            <P>
                In this case the <Code>id</Code> is transformed into different languages.
            </P>
            <UL>
                <LI>
                    In Sass the variable becomes <Code>$tp-color__blue</Code>.
                </LI>
                <LI>
                    In React the variable becomes <Code>tpColorBlue</Code>.
                </LI>
            </UL>
            <P>
                In each case the resulting value is the hex color <Code>#009fd9</Code>.
            </P>
        </ContentPage>
    );
}
