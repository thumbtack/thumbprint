import React from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { ThemedLink } from '@thumbtack/thumbprint-react';
import { ContentModifierLockedSmall } from '@thumbtack/thumbprint-icons';
import { ContentPage } from '../components/mdx/mdx';
import getLayoutProps from '../utils/get-layout-props';
import { H2, Img, P } from '../components/mdx/components';
import iconHeroImage from '../images/pages/icons/icon-hero.png';

export default function Icons({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return (
        <ContentPage
            title="Icons"
            description="Assets for multiple platforms."
            layoutProps={layoutProps}
        >
            <H2>Icon library</H2>

            <Img {...iconHeroImage} className="mw-100" />

            <P>
                For legal reasons we require authentication to download Thumbprint icons. If you’re
                not already logged into Okta you’ll be asked to enter your credentials before you
                proceed.
            </P>

            <ThemedLink
                to="https://thumbprint.thumbtack.io/icons"
                icon={<ContentModifierLockedSmall />}
            >
                Open Thumbprint Icons
            </ThemedLink>
        </ContentPage>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            layoutProps: getLayoutProps(),
        },
    };
};
