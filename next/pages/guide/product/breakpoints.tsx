import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ThemedLink } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { Code, H2, P, Table, TD, TH } from '../../../components/mdx/components';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Breakpoints"
            description="Variables for visual consistency across platforms."
            layoutProps={layoutProps}
        >
            <P>
                Responsive design enables layouts that render well at any device width. Designers do
                this by providing layouts representing a component’s state at different widths.
                Developers do this by using media queries, commonly with predefined breakpoints in
                Sass.
            </P>
            <H2>Designing</H2>
            <P>
                In Thumbprint we have three breakpoints. Since designers can only provide static
                designs, each layout should be built to represent what the expected layout should be
                between the breakpoints, not at the breakpoint.
            </P>
            <P>
                <strong>Note:</strong> In rare cases a layout will need to change at a breakpoint
                other than three provided. Add them with caution and provide comments explaining why
                they are needed.
            </P>

            <Table>
                <thead>
                    <tr>
                        <TH>Size</TH>
                        <TH>Breakpoint</TH>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TD>Small</TD>
                        <TD>
                            <Code>375px</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>Medium</TD>
                        <TD>
                            <Code>600px</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>Large</TD>
                        <TD>
                            <Code>946px</Code>
                        </TD>
                    </tr>
                </tbody>
            </Table>

            <ThemedLink
                theme="primary"
                to="https://www.figma.com/file/ILP0YIrg8YsGJLeQChrZpsRi/Thumbprint-Web?node-id=1441%3A120"
            >
                View Figma resource
            </ThemedLink>

            <H2>Implementing breakpoints in code</H2>
            <P>
                Thumbprint provides Sass mixins that produce the needed code. In each of these
                examples we are using breakpoint variables, however custom pixel widths are valid if
                needed. Because we are &quot;small-first&quot; (aka &quot;mobile-first&quot;),
                styles will often be grouped as follows:
            </P>
            <Table>
                <thead>
                    <tr>
                        <TH>Size</TH>
                        <TH>Breakpoint</TH>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TD>Small</TD>
                        <TD>
                            <Code>481px</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>Medium</TD>
                        <TD>
                            <Code>700px</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>Large</TD>
                        <TD>
                            <Code>1025px</Code>
                        </TD>
                    </tr>
                </tbody>
            </Table>

            <Code language="scss">
                {`
.my-item {
    // styles for the &quot;small&quot; range at the root
    @include tp-respond-above($tp-breakpoint__small) {
        // styles above &quot;small&quot;
    }
    @include tp-respond-above($tp-breakpoint__medium) {
        // styles above &quot;medium&quot;
    }
    @include tp-respond-above($tp-breakpoint__large) {
        // styles above &quot;large&quot;
    }
}`}
            </Code>

            <P>Mixins are also provided to group code below a width…</P>
            <Code language="scss">{`
@include tp-respond-below($tp-breakpoint__medium) {
    // styles below &quot;medium&quot;
}
`}</Code>

            <P>…and between a range:</P>

            <Code language="scss">{`
@include tp-respond-between($tp-breakpoint__small, $tp-breakpoint__medium) {
    // only above &quot;small&quot; and below &quot;medium&quot;
}
`}</Code>
        </ContentPage>
    );
}
