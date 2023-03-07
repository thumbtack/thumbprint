import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Title } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import pluginContrast from '../../images/pages/overview/product-design/plugin-contrast.png';
import { P, H2, H3, A, B, Img, LI, OL } from '../../components/mdx/components';
import Alert from '../../components/alert/alert';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Product Design"
            description="Getting started as a designer at Thumbtack."
            layoutProps={layoutProps}
        >
            <Alert type="note" title="Note">
                This page includes documentation and information that is pertinent to the internal
                design team at Thumbtack.
            </Alert>

            <H2>Getting started</H2>

            <H3>Design libraries</H3>

            <P>
                As a product designer, you will automatically have access to all of Thumbprint
                design libraries. If you would like to exclude any libraries from your designs and
                you prefer to work with files that are platform specific, you will need to deselect
                the unwanted libraries for each file you create.
            </P>

            <H3>Download and install fonts</H3>

            <P>
                Mark For Thumbtack, our primary font, is used for 100% of our product. All of the
                weights can be found here:
            </P>

            <P>
                <B>Important!</B> You will need to reach out to the design systems team to request
                our custom in-house font.
            </P>

            <P>
                Our design files also include some uses of system fonts for native apps, so it’s a
                good idea to also have them installed too:
            </P>

            <OL>
                <LI>
                    <A href="https://developer.apple.com/fonts/">SF UI</A>
                </LI>
                <LI>
                    <A href="https://fonts.google.com/specimen/Roboto">Roboto</A>
                </LI>
            </OL>

            <H3>Change your nudge settings</H3>

            <P>
                Thumbprint has a specific vertical rhythm and defined spacing units that make
                applying and managing space easy for all parties.
            </P>

            <P>
                By changing your nudge settings to align with our vertical rhythm, you’ll find
                bumping and aligning elements in the frame much easier.
            </P>

            <P>It’s recommend keeping Small Nudge at 1 and changing Big Nudge to 8.</P>

            <H2>Best Practices</H2>

            <H3>Always use global styles</H3>

            <P>
                Always use the global styles for color and type that can be found in the inspector.
            </P>

            <P>The icon for global styling is 4 dots.</P>

            <P>
                Using document styles or colors doesn’t attach the style name to the code, meaning
                your developer won’t have access to important information that is necessary for
                him/her to implement the right style.
            </P>

            <H3>Leverage auto layout</H3>

            <P>
                Constraints are an important part of the process with Figma. When used in
                conjunction with a layout grid, they become an easy way to save time as you iterate
                or need to communicate how something scales.
            </P>

            <P>
                Sometimes frames have both Scale options selected, and this is generally not good
                for resizing your artboard. We recommend checking them often, as it saves time over
                the long haul.
            </P>

            <H3>Keep your libraries up to date</H3>

            <P>
                When DS has an update or new component to share, we’ll publish it to the rest of the
                team through Figma.
            </P>

            <P>
                You’ll see a blue dot in the team library section or a message in the lower right
                asking you to review the updates to an existing component.
            </P>

            <H2>Suggested Plugins</H2>

            <P>
                To support our design practices better, we occasionally adopt and leverage design
                resources from the wider Figma design community. One example is the usage of Figma
                plugins. Below is a list of recommended plugins that are beneficial to supporting
                our design processes.
            </P>

            <div className="flex pt4">
                <A href="https://www.figma.com/community/plugin/748533339900865323" target="_blank">
                    <Img
                        {...pluginContrast}
                        alt="Shows interface and description for Figma Contrast plugin"
                        fill={false}
                    />
                </A>
                <div className="pl4">
                    <Title size={4} className="mb2">
                        Contrast
                    </Title>

                    <P>
                        Evaluates foreground and background colors against Web Content Accessibility
                        Guidelines (WCAG). Scan entire pages to see all text-layer color issues at
                        once.
                    </P>

                    <A href="https://www.figma.com/community/plugin/748533339900865323">
                        Get the plugin
                    </A>
                </div>
            </div>

            <H2>Support</H2>

            <H3>Making requests</H3>

            <P>
                Submissions are sent through our Coda request form. Issues later get triaged and go
                through the design to development process.
            </P>

            <P>
                <A href="https://coda.io/form/Thumbprint-Request-Form_d956rC5_SYe">
                    Coda request form
                </A>
            </P>

            <H3>Slack channels</H3>

            <P>
                Resources for more inlilne conversations and discussions. Ask and answer questions.
            </P>

            <A href="https://thumbtack.slack.com/archives/C7FLM0ZGU">#design-systems</A>

            <H3>Office hours</H3>

            <P>
                The design systems team holds a weekly hour (held over Zoom) session set aside
                exclusively for more qualitative insights about how to use the system.
            </P>

            <H3>Office hours</H3>

            <P>Tuesdays @ 11am PST</P>
        </ContentPage>
    );
}
