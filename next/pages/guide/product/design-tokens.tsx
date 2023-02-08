import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPagteStaticProps from '../../../utils/get-content-page-static-props';
import { CodeExperimental, Img, LI, P, UL } from '../../../components/mdx/components';

import tokensImage from '../../../images/pages/guide/product/design-tokens/tokens.png';

export const getStaticProps = getContentPagteStaticProps;

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
            <CodeExperimental language="javascript">
                {`
{
    "name": "Blue",
    "id": "tp-color__blue",
    "value": "#009fd9",
    "type": "color"
}
`}
            </CodeExperimental>
            <P>
                In this case the <CodeExperimental>id</CodeExperimental> is transformed into
                different languages.
            </P>
            <UL>
                <LI>
                    In Sass the variable becomes{' '}
                    <CodeExperimental>$tp-color__blue</CodeExperimental>.
                </LI>
                <LI>
                    In React the variable becomes <CodeExperimental>tpColorBlue</CodeExperimental>.
                </LI>
            </UL>
            <P>
                In each case the resulting value is the hex color{' '}
                <CodeExperimental>#009fd9</CodeExperimental>.
            </P>
        </ContentPage>
    );
}
