import React from 'react';
import { Title, Text, List, ListItem } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import classnames from 'classnames';
import { Language } from 'prism-react-renderer';
import Image from 'next/image';
import { ScrollMarkerSection } from 'react-scroll-marker';
import reactElementToJSXString from 'react-element-to-jsx-string';
// eslint-disable-next-line camelcase
import { Source_Code_Pro } from '@next/font/google';

import CodeBlock from './code-block/code-block';
import generateSlug from '../generate-slug/generate-slug';
import styles from './mdx.module.scss';
import InlineCode from '../inline-code/inline-code';

const sourceCodePro = Source_Code_Pro({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});

// TODO: apply atomicClasses to other headers once
// type definition error is resolved (see H2)
interface HeadingElement
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    atomicClasses?: string;
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

export function H2({ children, atomicClasses, ...rest }: HeadingElement): JSX.Element {
    const id = generateSlug({ level: 'section', children });
    const classes = classnames({ [`${atomicClasses}`]: atomicClasses, 'mt6 mb3': !atomicClasses });

    const contents = (
        <Title {...rest} id={id} size={3} headingLevel={2} className={classes}>
            {children}
        </Title>
    );

    if (!id) {
        return contents;
    }

    return (
        <ScrollMarkerSection id={id}>
            {(): JSX.Element => <HashAnchor id={id}>{contents}</HashAnchor>}
        </ScrollMarkerSection>
    );
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

export function Pre(
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
): JSX.Element {
    return <pre {...p} className={sourceCodePro.className} />;
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

export function CodeExperimental({
    children,
    language,
}: {
    children: React.ReactNode;
    language?: Language;
}): JSX.Element {
    const code = typeof children === 'string' ? children : reactElementToJSXString(children);

    if (code.includes('\n') === false) {
        return <InlineCode>{code}</InlineCode>;
    }

    return <CodeBlock language={language}>{code}</CodeBlock>;
}

export function Code(
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        language?: Language;
    },
): JSX.Element {
    if (typeof p.children !== 'string') {
        throw new Error('Expected code children to be a string.');
    }

    const isMultiLine = p.children.includes('\n');
    const shouldUseCodeBlock = isMultiLine || p.className?.includes('language-');

    if (!shouldUseCodeBlock) {
        return <InlineCode>{p.children}</InlineCode>;
    }

    const language = p.className
        ? ((p.className.replace('language-', '') as unknown) as Language)
        : p.language;

    return (
        <CodeBlock
            language={language}
            // TODO: Reimplement this
            // theme={p.theme}
            // shouldRender={p.shouldRender !== 'false'}
        >
            {p.children}
        </CodeBlock>
    );
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

export function B(
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
): JSX.Element {
    return <b {...props} />;
}

export function A(
    props: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    >,
): JSX.Element {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} />;
}

export function Img({
    src,
    width,
    height,
    alt,
    fill = true,
    className,
    style,
}: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }): JSX.Element {
    if (!width || !height || !src) {
        throw new Error('Expected image to have a width, height, and src.');
    }

    if (fill) {
        return (
            <div
                className={classnames('relative', styles.readingWidth, className)}
                style={{ aspectRatio: Number(width) / Number(height), ...style }}
            >
                <Image src={src} alt={alt || ''} fill />
            </div>
        );
    }

    return (
        <Image
            src={src}
            width={Number(width)}
            height={Number(height)}
            alt={alt || ''}
            className={className}
            style={style}
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
