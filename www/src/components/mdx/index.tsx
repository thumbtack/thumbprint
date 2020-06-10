/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React, { useRef, useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
    Title,
    Text,
    List,
    ListItem,
    Button,
    ButtonRow,
    TextArea,
} from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { ScrollMarkerSection } from 'react-scroll-marker';
import InternalMDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { isString } from 'lodash';
import uuid from 'uuid';
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

type FeedbackStep = 'feedback-score' | 'feedback-comment' | 'feedback-complete';

const FEEDBACK_STEPS: Record<FeedbackStep, FeedbackStep> = {
    'feedback-score': 'feedback-score',
    'feedback-comment': 'feedback-comment',
    'feedback-complete': 'feedback-complete',
};

const FeedbackForm = ({ page }: { page: string }): JSX.Element => {
    // Track the current step in the feedback flow.
    const [feedbackStep, setFeedbackStep] = useState<FeedbackStep>(
        FEEDBACK_STEPS['feedback-score'],
    );
    // "Yes" or "No" values
    const [feedbackScore, setFeedbackScore] = useState<string>('');
    // Freeform comment box for additional feedback
    const [feedbackComment, setFeedbackComment] = useState<string>('');
    const feebackScoreFormEl = useRef<HTMLFormElement>(null);
    // We send the feedback to Netlify in two steps because we want to record a
    // "Yes" or "No" even if the user doesn't leave a comment. Netlify doesn't
    // allow us to update an existing form response, so we generate a UUID
    // that we can later use to associate a score ("Yes"/"No") with a
    // free-form comment. Storing it with `useRef` prevents the value from
    // changing if the component re-renders.
    const feedbackResponseId = useRef(uuid.v1());

    // Submit the feedback programatically here instead of the form's
    // `onSubmit`. This is because the "Yes" and "No" buttons are
    // `<Button>` components. When clicked, they update an
    // `input[hidden]` value. Putting the value in the hidden input
    // allows us to easily include it in the form submission.
    useEffect(() => {
        if (feedbackScore) {
            const form = feebackScoreFormEl.current;
            if (!form) {
                return;
            }

            // Unfortunately TypeScript's DOM types do not yet recognise FormData as a valid
            // argument to URLSearchParams. Cast here to avoid an error
            // See: https://github.com/Microsoft/TypeScript/issues/30584
            const data = new URLSearchParams((new FormData(form) as unknown) as string).toString();

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(() => {
                setFeedbackStep(FEEDBACK_STEPS['feedback-comment']);
            });
        }
    }, [feedbackScore]);

    // This helps prevent spam submissions:
    // https://docs.netlify.com/forms/spam-filters/#honeypot-field
    const honeypotInputName = 'netlify-trickyness';

    return (
        <>
            <form
                name="feedback-scores"
                method="POST"
                data-netlify="true"
                netlify-honeypot={honeypotInputName}
                ref={feebackScoreFormEl}
                hidden={feedbackStep !== FEEDBACK_STEPS['feedback-score']}
            >
                <div className={`flex items-center flex-column m_flex-row ${styles.readingWidth}`}>
                    <div className="mb3 m_mb0 m_mr4">
                        <Title size={5} className="mb2">
                            Was this page helpful?
                        </Title>
                        <Text className="black-300 mw7">
                            We use this feedback to improve the quality of our documentation.
                        </Text>
                    </div>
                    <ButtonRow>
                        <Button
                            size="small"
                            theme="tertiary"
                            onClick={(): void => setFeedbackScore('yes')}
                        >
                            Yes
                        </Button>
                        <Button
                            size="small"
                            theme="tertiary"
                            onClick={(): void => setFeedbackScore('no')}
                        >
                            No
                        </Button>
                    </ButtonRow>
                </div>

                <input type="hidden" name="page" value={page} />
                <input type="hidden" name="response-id" value={feedbackResponseId.current} />
                <input type="text" className="visually-hidden" name={honeypotInputName} />
                <input type="hidden" name="helpful" value={feedbackScore} />
                <input type="hidden" name="form-name" value="feedback-scores" />
            </form>
            <form
                name="feedback-comments"
                method="POST"
                data-netlify="true"
                onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
                    // Show a success message (but don't send data to Netlify)
                    // if the user clicks on "Send" with an empty text area.
                    // The user may hit send without adding comments because they
                    // may not have realized that their answer to the first step
                    // of this two step form was already recorded.
                    if (feedbackComment === '') {
                        setFeedbackStep(FEEDBACK_STEPS['feedback-complete']);
                        return;
                    }

                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const data = new URLSearchParams(
                        (new FormData(form) as unknown) as string,
                    ).toString();

                    fetch(form.action, {
                        method: 'POST',
                        body: data,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(() => {
                        setFeedbackStep(FEEDBACK_STEPS['feedback-complete']);
                    });
                }}
                hidden={feedbackStep !== FEEDBACK_STEPS['feedback-comment']}
            >
                <div className={`mb3 ${styles.readingWidth}`}>
                    <Title size={5} className="mb2">
                        Was this page helpful?
                    </Title>
                    <label htmlFor="feedback-comments">
                        <Text className="black-300 mw7">
                            {feedbackScore === 'yes' &&
                                'Thanks! We’re glad you found it helpful. You can optionally let us know what you liked about this page.'}
                            {feedbackScore === 'no' &&
                                'Sorry to hear that! How can we improve this page?'}{' '}
                        </Text>
                    </label>
                </div>
                <div className="mb3 mw7">
                    <TextArea
                        onChange={(v): void => setFeedbackComment(v)}
                        value={feedbackComment}
                        name="comment"
                        id="feedback-comments"
                    />
                </div>
                <input type="hidden" name="page" value={page} />
                <input type="hidden" name="form-name" value="feedback-comments" />
                <input type="hidden" name="response-id" value={feedbackResponseId.current} />
                <Button theme="primary" size="small" type="submit">
                    Send
                </Button>
            </form>

            {feedbackStep === FEEDBACK_STEPS['feedback-complete'] && (
                <div className={`mb3 ${styles.readingWidth}`}>
                    <Title size={5} className="mb2">
                        Was this page helpful?
                    </Title>

                    <Text className="black-300 mw7">
                        Thanks! We’ve submitted your feedback.{' '}
                        <span role="img" aria-label="">
                            🎉
                        </span>
                    </Text>
                </div>
            )}
        </>
    );
};

interface MdxPropTypes {
    children: React.ReactNode;
    location: { pathname: string };
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
                        <div className="pt5 mt5 bt bw-2 b-gray-300">
                            <FeedbackForm page={location.pathname} />
                        </div>
                    </React.Fragment>
                )}
            </Wrap>
        </Container>
    );
}
