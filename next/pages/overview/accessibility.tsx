import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import accessibilityIllustration from '../../images/pages/overview/accessibility/accessibility-illustration.svg';
import { P, A, H2, H3, Code, LI, UL, Img } from '../../components/mdx/components';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Accessibility"
            description="Building for the widest audience possible."
            layoutProps={layoutProps}
        >
            <P>
                The openness of the Web means it’s easy to build any website you want. This also
                means it’s easy to inadvertently build one that’s difficult for people to use. While
                common problems like small font sizes are easy to spot, building a truly accessible
                website goes well beyond that.
            </P>
            <P>
                Though by no means an exhaustive list, the following are concepts we take into
                consideration when creating our <a href="/guide/product/toolkits/">Toolkits</a>. By
                baking them into the Design System’s process our designers and developers can be
                confident that our tools and components will function for a broad range of
                customers.
            </P>

            <Img {...accessibilityIllustration} />

            <H2>Design</H2>

            <H3>Color</H3>

            <P>
                Prior to Thumbprint there were few usage rules for colors, many did not have
                sufficient contrast for text, and there were simply too many of them. For text, we
                now have two options, black for headings and a dark gray for body copy (no more{' '}
                <A href="https://www.wired.com/2016/10/how-the-web-became-unreadable/">
                    light gray text
                </A>
                ) and our colors have clear guidelines.
            </P>

            <H3>Type</H3>

            <P>
                Similar to the process with color, we significantly reduced the number of type
                sizes, removed the smallest sizes to improve readability, and divided them into
                “Title” and “Text” categories with options to output the appropriate heading level
                or element.
            </P>

            <H3>Size & space</H3>

            <P>
                For users with poor vision, hand tremors, or simply big fingers it’s important that
                target sizes for buttons and other interactive elements are large enough to use
                efficiently.
            </P>

            <H2>Code</H2>

            <H3>HTML</H3>

            <P>
                By using semantic HTML elements we enable alternative ways to navigate our content.
                We also add important attributes where appropriate, for example, <Code>alt</Code>{' '}
                text for images and <Code>aria-label</Code> when a visible label is not available.
            </P>

            <H3>Keyboard navigation</H3>

            <P>
                Interactive components should be navigable from the keyboard. This means paying
                attention to `tabindex` values and listening for key commands to perform an action,
                for example, closing a modal with the “escape” key.
            </P>

            <H3>Documentation</H3>

            <P>
                In addition to building accessibility into our components we also provide notes in
                our documentation to alert developers to potential issues and console warnings when
                they are used in inaccessible ways.
            </P>

            <H2>Resources</H2>

            <P>
                The good news is that there are an abundance of tools and resources to help evaluate
                and implement accessibility. Here are a few we recommend:
            </P>

            <UL>
                <LI>
                    <A href="https://webaim.org/">WebAIM</A>. Articles and training to help
                    developers make their content accessible.
                </LI>
                <LI>
                    <A href="https://itunes.apple.com/us/app/contrast-color-accessibility/id1254981365?mt=12">
                        Contrast
                    </A>
                    . A MacOS app to test on-screen colors for accessible contrast.
                </LI>
                <LI>
                    <A href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</A>.
                    Now built into Chrome’s DevTools this tool will run a variety of tests, among
                    them an accessibility audit with suggested fixes.
                </LI>
            </UL>
        </ContentPage>
    );
}
