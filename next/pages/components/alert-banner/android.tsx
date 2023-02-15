import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { CodeExperimental, H2, H3, Img, LI, P, UL } from '../../../components/mdx/components';

import alertBannerThemeCaution from '../../../images/pages/components/alert-banner/android/alert-banner-theme-caution.png';
import alertBannerThemeInfo from '../../../images/pages/components/alert-banner/android/alert-banner-theme-info.png';
import alertBannerThemeWarning from '../../../images/pages/components/alert-banner/android/alert-banner-theme-warning.png';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Alert Banner',
        description: 'Important account information displayed at the top of a screen',
        componentId: 'alert-banner',
        platformId: 'android',
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
                <CodeExperimental>AlertBanner</CodeExperimental> should be implemented as a global
                banner that displays at the top of the application. It is recommended to enforce a
                max height constraint to guard from the banner growing infinitely.
            </P>
            <H3>Content Guidelines</H3>
            <UL>
                <LI>should be non-dismissible until a required action is completed</LI>
                <LI>should have a link to resolve the required action</LI>
                <LI>
                    should have a reasonable character count to avoid being partially shown with
                    ellipsis
                </LI>
            </UL>
            <H2>Themes</H2>
            <H3>Caution</H3>
            <P>
                <Img {...alertBannerThemeCaution} alt="caution theme example" fill={false} />
            </P>
            <H3>Info</H3>
            <P>
                <Img {...alertBannerThemeInfo} alt="info theme example" fill={false} />
            </P>
            <H3>Warning</H3>
            <P>
                <Img {...alertBannerThemeWarning} alt="warning theme example" fill={false} />
            </P>
            <H2>Implementation</H2>
            <P>
                The name of the component is <CodeExperimental>ThumbprintBanner</CodeExperimental>.{' '}
                <CodeExperimental>ThumbprintBanner</CodeExperimental> contains three configurable
                attributes:
            </P>
            <UL>
                <LI>
                    <CodeExperimental>text</CodeExperimental> : String. The main text to display in
                    the banner. Configurable via properties or via{' '}
                    <CodeExperimental>android:text</CodeExperimental> in xml.
                </LI>
                <LI>
                    <CodeExperimental>linkText</CodeExperimental> : String. Additional link text to
                    display in the banner. Configurable via properties or via{' '}
                    <CodeExperimental>app:linkText</CodeExperimental> in xml.
                </LI>
                <LI>
                    <CodeExperimental>bannerTheme</CodeExperimental> : Enum. This is one of three
                    themes: INFO, WARNING, or CAUTION. This is configurable via properties by
                    setting an enum of type{' '}
                    <CodeExperimental>ThumbprintBannerType</CodeExperimental> or via xml using one
                    of three options:{' '}
                    <CodeExperimental>app:bannerTheme=&quot;info&quot;</CodeExperimental>,{' '}
                    <CodeExperimental>app:bannerTheme=&quot;warning&quot;</CodeExperimental> or{' '}
                    <CodeExperimental>app:bannerTheme=&quot;caution&quot;</CodeExperimental>.
                </LI>
            </UL>
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
            <H2>Accessibility</H2>
            <P>
                <CodeExperimental>AlertBanner</CodeExperimental> responds to the device text size
                setting by omitting the icon when using the extra large text size. In the event that
                constraints limit the size of the banner, ellipsis are used in the middle of the
                text so that the action link is always visible at the end.
            </P>
        </MDXComponentPage>
    );
}
