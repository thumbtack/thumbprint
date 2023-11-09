import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Title, Text, List, ListItem } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ScrollMarkerSection } from 'react-scroll-marker';
import InternalMDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { isString } from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import invariant from 'invariant';
import { Language } from 'prism-react-renderer';

import Wrap from '../wrap';
import PageHeader from '../page-header';
import Container from '../container';
import CodeBlock from './code-block';
import generateSlug from '../generate-slug';
import styles from './index.module.scss';

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

export function H2(p: Parameters<typeof Title>[0]): JSX.Element {
    return (
        <ScrollMarkerSection id={generateSlug({ level: 'section', children: p.children }) || ''}>
            {({ id }: { id: string }): JSX.Element => (
                <HashAnchor id={id}>
                    <Title {...p} id={id} size={3} headingLevel={2} className="mt6 mb3" />
                </HashAnchor>
            )}
        </ScrollMarkerSection>
    );
}

export function H3(p: Parameters<typeof Title>[0]): JSX.Element {
    const id = generateSlug({ level: 'example', children: p.children }) || '';

    return (
        <HashAnchor id={id}>
            <Title {...p} id={id} size={5} headingLevel={3} className="mt5 mb2" />
        </HashAnchor>
    );
}

export function H4(p: Parameters<typeof Title>[0]): JSX.Element {
    return (
        <Title
            {...p}
            id={generateSlug({ level: 'example', children: p.children })}
            size={6}
            headingLevel={4}
            className="mt5 mb1"
        />
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

export function Pre(p: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return <div {...p} />;
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

export function Code(p: {
    className: string;
    theme: 'white' | 'dark' | 'light';
    shouldRender: 'true' | 'false';
    children: string;
}): JSX.Element {
    const language = p.className
        ? ((p.className.replace('language-', '') as unknown) as Language)
        : undefined;

    return (
        <CodeBlock language={language} theme={p.theme} shouldRender={p.shouldRender !== 'false'}>
            {p.children}
        </CodeBlock>
    );
}

export function Table(p: React.TableHTMLAttributes<HTMLTableElement>): JSX.Element {
    return <table {...p} className="mb5 w-100 black-300" />;
}

export function TH(p: React.TableHTMLAttributes<HTMLTableHeaderCellElement>): JSX.Element {
    return <th {...p} className="ph2 pb2 bb b-gray-300 tl" />;
}

export function TD(p: React.TableHTMLAttributes<HTMLTableDataCellElement>): JSX.Element {
    return <td {...p} className="pa2 bb b-gray-300" />;
}

export function Img(p: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    return (
        <img
            src={p.src}
            alt={p.alt}
            className={p.className}
            width={p.width}
            height={p.height}
            style={{ display: 'block', maxWidth: '100%' }}
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
    let renderedChildren = children;

    if (isString(renderedChildren)) {
        renderedChildren = <InternalMDXRenderer>{children}</InternalMDXRenderer>;
    }

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
                // eslint-disable-next-line react/no-unstable-nested-components
                code: (p): JSX.Element => <Code {...p} />,
                table: Table,
                td: TD,
                th: TH,
                hr: HR,
                iframe: Iframe,
            }}
        >
            {renderedChildren}
        </MDXProvider>
    );
};

type Platform = 'React' | 'JavaScript' | 'SCSS' | 'Usage' | 'iOS' | 'Android';

const getPlatformByPathname = (pathname: string): Platform => {
    const mappings: Record<string, Platform> = {
        react: 'React',
        javascript: 'JavaScript',
        scss: 'SCSS',
        usage: 'Usage',
        ios: 'iOS',
        android: 'Android',
    };

    const splitPathname = pathname.split('/');

    // If input is `/components/button/react/`, this gets the word `react`.
    const platformSlug = splitPathname[splitPathname.length - 2];

    // Fail loudly so developers know they need to update the mapping.
    invariant(
        platformSlug,
        `The first part of the pathname \`${pathname}\` does not have a platform name mapped to it. Add one to the \`mappings\` object in this function.`,
    );

    return mappings[platformSlug];
};

type Section =
    | 'Overview'
    | 'Guidelines'
    | 'Components'
    | 'Atomic'
    | 'Tokens'
    | 'Icons'
    | 'Updates'
    | 'Help';

const getSectionByPathname = (pathname: string): Section => {
    // This needs to be updated if a new section is added or a section is renamed.
    const mappings: Record<string, Section> = {
        overview: 'Overview',
        guide: 'Guidelines',
        components: 'Components',
        atomic: 'Atomic',
        tokens: 'Tokens',
        icons: 'Icons',
        updates: 'Updates',
        help: 'Help',
    };

    // If input is `/guide/product/brand-assets/`, this gets the word `guide`.
    const firstPartOfPathname = pathname.split('/')[1];

    const displayName = mappings[firstPartOfPathname];

    // Fail loudly so developers know they need to update the mapping.
    invariant(
        displayName,
        `The first part of the pathname \`${pathname}\` does not have a display name mapped to it. Add one to the \`mappings\` object in this function.`,
    );

    return displayName;
};

interface MdxPropTypes {
    children: React.ReactNode;
    location: Location;
    pageContext: {
        frontmatter: {
            title: string;
            description: string;
        };
    };
    header?: React.ReactNode;
}

export default function MDX({
    children,
    location,
    pageContext,
    header,
}: MdxPropTypes): JSX.Element {
    // Add the platform name to the page title when on a page within `components/` that has a
    // platform.
    const isComponentOrTokensPage =
        (location.pathname.startsWith('/components/') ||
            location.pathname.startsWith('/tokens/')) &&
        getPlatformByPathname(location.pathname);

    const pageTitle = isComponentOrTokensPage ? (
        <span>
            {pageContext.frontmatter.title}
            <span className="visually-hidden">
                {`(${getPlatformByPathname(location.pathname)})`}
            </span>
        </span>
    ) : (
        pageContext.frontmatter.title
    );

    const metaTitle = isComponentOrTokensPage
        ? `${pageContext.frontmatter.title} (${getPlatformByPathname(location.pathname)})`
        : pageContext.frontmatter.title;

    return (
        <Container location={location} activeSection={getSectionByPathname(location.pathname)}>
            <Wrap>
                {pageContext.frontmatter && (
                    <React.Fragment>
                        <PageHeader
                            pageTitle={pageTitle}
                            metaTitle={metaTitle}
                            description={pageContext.frontmatter.description}
                        />
                        {header}
                        <MDXRenderer>{children}</MDXRenderer>
                    </React.Fragment>
                )}
            </Wrap>
        </Container>
    );
}
