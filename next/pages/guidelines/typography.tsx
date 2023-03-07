import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { ContentActionsCheckSmall } from '@thumbtack/thumbprint-icons';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import { Code, H2, P, Table, TD, TH } from '../../components/mdx/components';

import Alert from '../../components/alert/alert';
import InlineCode from '../../components/inline-code/inline-code';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Typography"
            description="A small number of text options."
            layoutProps={layoutProps}
        >
            <P>
                Our brand font is Mark and comes in two weights, 400 and 700. We have five
                &quot;title&quot; variations used for headings and three &quot;body&quot; sizes used
                for body copy.
            </P>
            <H2>Type values</H2>
            <Table>
                <thead>
                    <tr>
                        <TH>Component</TH>
                        <TH>Responsive</TH>
                        <TH>Font Size</TH>
                        <TH>Line Height</TH>
                        <TH>Font Weight</TH>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TD>
                            <Code>{`<Title size={1} />`}</Code>
                        </TD>
                        <TD>
                            <ContentActionsCheckSmall aria-label="Yes" />
                        </TD>
                        <TD>
                            <Code>28px/40px</Code>
                        </TD>
                        <TD>
                            <Code>32px/44px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={2} />`}</Code>
                        </TD>
                        <TD>
                            <ContentActionsCheckSmall aria-label="Yes" />
                        </TD>
                        <TD>
                            <Code>24px/32px</Code>
                        </TD>
                        <TD>
                            <Code>28px/40px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={3} />`}</Code>
                        </TD>
                        <TD>
                            <ContentActionsCheckSmall aria-label="Yes" />
                        </TD>
                        <TD>
                            <Code>22px/24px</Code>
                        </TD>
                        <TD>
                            <Code>28px/32px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={4} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>20px</Code>
                        </TD>
                        <TD>
                            <Code>28px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={5} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>18px</Code>
                        </TD>
                        <TD>
                            <Code>24px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={6} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>16px</Code>
                        </TD>
                        <TD>
                            <Code>24px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={7} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>14px</Code>
                        </TD>
                        <TD>
                            <Code>20px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Title size={8} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>12px</Code>
                        </TD>
                        <TD>
                            <Code>18px</Code>
                        </TD>
                        <TD>
                            <Code>700</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Text size={1} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>16px</Code>
                        </TD>
                        <TD>
                            <Code>24px</Code>
                        </TD>
                        <TD>
                            <Code>400</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Text size={2} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>14px</Code>
                        </TD>
                        <TD>
                            <Code>20px</Code>
                        </TD>
                        <TD>
                            <Code>400</Code>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Code>{`<Text size={3} />`}</Code>
                        </TD>
                        <TD />
                        <TD>
                            <Code>12px</Code>
                        </TD>
                        <TD>
                            <Code>18px</Code>
                        </TD>
                        <TD>
                            <Code>400</Code>
                        </TD>
                    </tr>
                </tbody>
            </Table>
            <Alert type="note" title="HTML headings">
                Though numbered 1 though 8, our <InlineCode>Title</InlineCode> components are
                independent of the HTML heading elements
                <InlineCode>h1</InlineCode>-<InlineCode>h6</InlineCode>. Use the{' '}
                <InlineCode>size</InlineCode> required by the design with the appropriate
                <InlineCode>headlingLevel</InlineCode> prop for SEO and semantics.
            </Alert>
            <H2>Type examples</H2>
            <P>
                <code>&lt;Title size={1} /&gt;</code> is used for page headlines. It will be the
                largest text on the page.
            </P>
            <Code language="jsx">{`
<Title size={1}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={2} />`}</Code>
            <Code language="jsx">{`
<Title size={2}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={3} />`}</Code>
            <Code language="jsx">{`
<Title size={3}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={4} />`}</Code>
            <Code language="jsx">{`
<Title size={4}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={5} />`}</Code>
            <Code language="jsx">{`
<Title size={5}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={6} />`}</Code>
            <Code language="jsx">{`\
<Title size={6}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={7} />`}</Code>
            <Code language="jsx">{`
<Title size={7}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Title size={8} />`}</Code>
            <Code language="jsx">{`
<Title size={8}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Title>
`}</Code>
            <Code>{`<Text size={1} />`}</Code> is for body text.
            <Code language="jsx">{`
<Text size={1}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Text>
`}</Code>
            <Code>{`<Text size={2} />`}</Code>
            <Code language="jsx">{`
<Text size={2}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Text>
`}</Code>
            <Code>{`<Text size={3} />`}</Code>
            <Code language="jsx">{`
<Text size={3}>
    When you need to hire someone – a landscaper, a DJ, anyone – Thumbtack finds them for you for
    free.
</Text>
`}</Code>
        </ContentPage>
    );
}
