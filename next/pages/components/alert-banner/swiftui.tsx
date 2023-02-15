import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { CodeExperimental, H2, H3, Img, LI, P, UL } from '../../../components/mdx/components';

import tpAlertBannerCaution from '../../../images/pages/components/alert-banner/swiftui/tpAlertBanner-caution.png';
import tpAlertBannerInfo from '../../../images/pages/components/alert-banner/swiftui/tpAlertBanner-info.png';
import tpAlertBannerWarning from '../../../images/pages/components/alert-banner/swiftui/tpAlertBanner-warning.png';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Alert Banner',
        description: 'Important account information displayed at the top of a screen',
        componentId: 'alert-banner',
        platformId: 'swiftui',
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
                <CodeExperimental>TPAlertBanner</CodeExperimental> should be implemented as a global
                banner that displays at the top of the application. It is recommended to wrap this
                view inside a scrollview as it will grow indefinitely based on the content.
            </P>
            <H2>Example</H2>

            <CodeExperimental language="swiftui">
                {`
TPAlertBanner(
    theme: .info,
    message: "This is some info",
    ctaText: "Learn more",
    ctaLink: URL(string: "https://thumbtack.com")
)
.environment(\\.openURL, OpenURLAction { url in
  openURL(url)
  return .handled
})`}
            </CodeExperimental>

            <H3>Content Guidelines</H3>
            <UL>
                <LI>should be non-dismissible until a required action is completed</LI>
                <LI>should have a link to resolve the required action</LI>
            </UL>
            <H2>Themes</H2>
            <H3>Caution</H3>
            <P>
                <Img {...tpAlertBannerCaution} alt="caution theme example" fill={false} />
            </P>
            <H3>Info</H3>
            <P>
                <Img {...tpAlertBannerInfo} alt="info theme example" fill={false} />
            </P>
            <H3>Warning</H3>
            <P>
                <Img {...tpAlertBannerWarning} alt="warning theme example" fill={false} />
            </P>
            <H2>Visibility</H2>
            <P>
                The global banner should always be visible at the top of the application other than
                exceptions where it may be intentionally hidden to provide the desired UX. Some
                situations where the global banner may not be visible could be:
            </P>
            <UL>
                <LI>pre-login / signup</LI>
                <LI>fullscreen presentations</LI>
            </UL>
            <H2>Refreshing</H2>
            <P>
                The global banner should refresh at predesignated triggers based on when the content
                may have changed, for example:
            </P>
            <UL>
                <LI>application did start</LI>
                <LI>application did enter foreground</LI>
                <LI>main tab bar selection changed</LI>
            </UL>
        </MDXComponentPage>
    );
}
