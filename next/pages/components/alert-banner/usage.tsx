import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Wrap } from '@thumbtack/thumbprint-react';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { A, CodeExperimental, H2, Img, P } from '../../../components/mdx/components';
import DoDont from '../../../components/dodont';

import alertBannerCtaDo from '../../../images/pages/components/alert-banner/usage/alertbanner-cta-do.png';
import alertBannerCtaDont from '../../../images/pages/components/alert-banner/usage/alertbanner-cta-dont.png';
import alertBannerDo from '../../../images/pages/components/alert-banner/usage/alertbanner-do.png';
import alertBannerDont from '../../../images/pages/components/alert-banner/usage/alertbanner-dont.png';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Alert Banner',
        description: 'Important account information displayed at the top of a screen',
        componentId: 'alert-banner',
        platformId: 'usage',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Usage</H2>
            <P>
                The <CodeExperimental>AlertBanner</CodeExperimental> should be used to notify the
                user that a product-related signal is of the utmost importance. These messages will
                thematically provide informational, cautionary, or warning messages based on the
                severity and importance level determined by the experience.
            </P>
            <P>
                To re-enforce the level of importance these messages offer, the AlterBanner should
                be placed at the top of the page, will not be dismissible, and will disappear once
                the appropriate action is taken.
            </P>
            <H2>Best practices</H2>
            <P>
                <CodeExperimental>AlertBanner</CodeExperimental> should be used as a banner at the
                very top of the page.
            </P>
            <P>
                Call-to-actions (e.g. <CodeExperimental>&lt;a&gt;</CodeExperimental> tags in the{' '}
                <CodeExperimental>children</CodeExperimental> prop) should be the last item in the{' '}
                <CodeExperimental>children</CodeExperimental>.
            </P>
            <P>
                You can use the <CodeExperimental>icon</CodeExperimental> prop to override the
                default icon.
            </P>

            <Wrap>
                <Grid gutter="wide">
                    <GridColumn aboveSmall={6}>
                        <DoDont type="do">
                            <Img {...alertBannerDo} alt="AlertBanner do" />
                        </DoDont>
                        <P>
                            Use icons that appropriately provide the visual accentuation paired with
                            the banner’s messaging. Also, it’s encouraged to use the filled version
                            of the icon when available.
                        </P>
                    </GridColumn>
                    <GridColumn aboveSmall={6}>
                        <DoDont type="dont">
                            <Img {...alertBannerDont} alt="AlertBanner don’t" />
                        </DoDont>
                        <P>
                            Do not use icons that are defaults for the provided themes. For example,
                            avoid using an <span className="b">info-filled</span> Icon when using
                            the <span className="b">Caution</span> theme.
                        </P>
                    </GridColumn>
                </Grid>
            </Wrap>
            <Wrap>
                <Grid gutter="wide">
                    <GridColumn aboveSmall={6}>
                        <DoDont type="do">
                            <Img {...alertBannerCtaDo} alt="AlertBanner call-to-action do" />
                        </DoDont>
                        <P>
                            Place the call-to-action as the last element in the component. These
                            actions are clear, concise, and should follow the principles of{' '}
                            <A href="/button/usage/#section-copy">Button Copy guidelines</A>.
                        </P>
                    </GridColumn>
                    <GridColumn aboveSmall={6}>
                        <DoDont type="dont">
                            <Img {...alertBannerCtaDont} alt="AlertBanner call-to-action don't" />
                        </DoDont>
                        <P>
                            The call-to-action should not appear before the message, be underlined,
                            bold, and should not receive the same as the Button component CTA.
                        </P>
                    </GridColumn>
                </Grid>
            </Wrap>
        </MDXComponentPage>
    );
}
