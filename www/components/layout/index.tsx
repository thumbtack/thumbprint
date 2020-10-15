import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { List, ListItem, Text, Title } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import Wrap from '../wrap';
import PageHeader from '../page-header';
import styles from './index.module.scss';
import generateSlug from './generate-slug';

interface LayoutPropTypes {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

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
    const id = generateSlug({ level: 'section', children: p.children });

    return (
        <HashAnchor id={id}>
            <Title {...p} id={id} size={3} headingLevel={2} className="mt6 mb3" />
        </HashAnchor>
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

const mdComponents = {
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    ul: UL,
    ol: OL,
    li: LI,
};

export default function Layout({
    children,
    title,
    description,
}: LayoutPropTypes): React.ReactElement {
    return (
        <Wrap>
            <MDXProvider components={mdComponents}>
                <PageHeader pageTitle={title} description={description} metaTitle={title} />
                {children}
            </MDXProvider>
        </Wrap>
    );
}
