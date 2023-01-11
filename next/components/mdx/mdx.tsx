import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Title, Text, List, ListItem } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Language } from 'prism-react-renderer';
import cx from 'classnames';

import Wrap from '../wrap/wrap';
import PageHeader from '../page-header/page-header';
// import CodeBlock from './code-block/code-block';
import generateSlug from '../generate-slug/generate-slug';
import styles from './mdx.module.scss';
import Layout from '../layout/layout';
import getLayoutProps, { LayoutProps } from '../../utils/get-layout-props';

const HashAnchor = ({ children, id }: { children: React.ReactNode; id: string }): JSX.Element => (
    <div className={styles.hashAnchor}>
        <a href={`#${id}`} aria-hidden="true" className={styles.hashAnchorLink}>
            <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                height="16"
                width="16"
                fill={tokens.tpColorBlack300}
            >
                <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
            </svg>
        </a>
        {children}
    </div>
);

export function H2({
    children,
    ...rest
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
>): JSX.Element {
    const id = generateSlug({ level: 'section', children });

    const contents = (
        <Title {...rest} id={id} size={3} headingLevel={2} className="mt6 mb3">
            {children}
        </Title>
    );

    if (!id) {
        return contents;
    }

    return <HashAnchor id={id}>{contents}</HashAnchor>;
}

export function H3({
    children,
    ...rest
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
>): JSX.Element {
    const id = generateSlug({ level: 'example', children });

    const contents = (
        <Title {...rest} id={id} size={5} headingLevel={3} className="mt5 mb2">
            {children}
        </Title>
    );

    if (!id) {
        return contents;
    }

    return <HashAnchor id={id}>{contents}</HashAnchor>;
}

export function H4({
    children,
    ...rest
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
>): JSX.Element {
    const id = generateSlug({ level: 'example', children });

    return (
        <Title {...rest} id={id} size={6} headingLevel={4} className="mt5 mb1">
            {children}
        </Title>
    );
}

export function P(p: Parameters<typeof Text>[0]): JSX.Element {
    return <Text {...p} className={`mb3 black-300 ${styles.readingWidth}`} />;
}

export const InlineCode = ({
    shouldCopyToClipboard = false,
    children,
    theme = 'default',
}: {
    shouldCopyToClipboard?: boolean;
    children?: React.ReactNode;
    theme?: 'plain' | 'default';
}): JSX.Element => {
    const plainStyles = {
        fontFamily: tokens.tpFontFamilyMonospace,
        fontSize: '95%',
    };

    const extendedStyles = {
        background: '#f5f7f7',
        padding: '1px 4px',
        color: tokens.tpColorBlack,
        borderRadius: '5px',
    };

    let inlineStyles = plainStyles;

    if (theme !== 'plain') {
        inlineStyles = { ...plainStyles, ...extendedStyles };
    }

    return shouldCopyToClipboard ? (
        <CopyToClipboard text={children} className={styles.inlineCodeClipboard}>
            <code style={inlineStyles}>{children}</code>
        </CopyToClipboard>
    ) : (
        <code style={inlineStyles}>{children}</code>
    );
};

export function Pre(
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
): JSX.Element {
    return <pre {...p} />;
}

export function LI(p: Parameters<typeof Text>[0]): JSX.Element {
    return (
        <ListItem>
            <Text elementName="div" className={`black-300 ${styles.readingWidth}`} {...p} />
        </ListItem>
    );
}

export function OL(p: Parameters<typeof List>[0]): JSX.Element {
    return (
        <div className="mb3 ml4">
            <List theme="decimal" {...p} />
        </div>
    );
}

export function UL(p: Parameters<typeof List>[0]): JSX.Element {
    return (
        <div className="mb3 ml4">
            <List {...p} />
        </div>
    );
}

export function Code(
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
): JSX.Element {
    // const language = p.className
    //     ? ((p.className.replace('language-', '') as unknown) as Language)
    //     : undefined;

    return <code>{p.children}</code>;

    // return (
    //     <CodeBlock language={language} theme={p.theme} shouldRender={p.shouldRender !== 'false'}>
    //         {p.children}
    //     </CodeBlock>
    // );
}

export function Table(p: React.TableHTMLAttributes<HTMLTableElement>): JSX.Element {
    return <table {...p} className="mb5 w-100 black-300" />;
}

export function TH(
    p: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>,
): JSX.Element {
    return <th {...p} className="ph2 pb2 bb b-gray-300 tl" />;
}

export function TD(
    p: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>,
): JSX.Element {
    return <td {...p} className="pa2 bb b-gray-300" />;
}

export function Img(p: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    return (
        <img
            src={p.src}
            alt={p.alt}
            className={cx(p.className, styles.readingWidth)}
            width={p.width}
            height={p.height}
            style={{ display: 'block' }}
        />
    );
}

export function HR(p: React.HTMLAttributes<HTMLHRElement>): JSX.Element {
    return <hr {...p} className="bt b-gray-300 mv4" style={{ height: '0', border: '0' }} />;
}

export function Iframe(p: React.IframeHTMLAttributes<HTMLIFrameElement>): JSX.Element {
    return (
        <iframe
            {...p}
            className="pa1 mb1 ba bw-2 br2 b-gray-300"
            title="Image of component from Figma"
        />
    );
}

export const MDXRenderer = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <MDXProvider
            components={{
                h2: H2,
                h3: H3,
                h4: H4,
                p: P,
                inlineCode: InlineCode,
                pre: Pre,
                li: LI,
                ol: OL,
                ul: UL,
                img: Img,
                code: Code,
                table: Table,
                td: TD,
                th: TH,
                hr: HR,
                iframe: Iframe,
            }}
        >
            {children}
        </MDXProvider>
    );
};

export function getStaticProps(): { props: { layoutProps: LayoutProps } } {
    return {
        props: {
            layoutProps: getLayoutProps(),
        },
    };
}

interface ContentPageProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    layoutProps: LayoutProps;
}

export const ContentPage = ({
    children,
    title,
    description,
    layoutProps,
}: ContentPageProps): JSX.Element => {
    return (
        <Layout {...layoutProps}>
            <Wrap>
                <PageHeader pageTitle={title} metaTitle={title} description={description} />
                {children}
            </Wrap>
        </Layout>
    );
};

export default function MDX({
    children,
    title,
    description,
    layoutProps,
}: ContentPageProps): JSX.Element {
    return (
        <ContentPage title={title} description={description} layoutProps={layoutProps}>
            <MDXRenderer>{children}</MDXRenderer>
        </ContentPage>
    );
}
