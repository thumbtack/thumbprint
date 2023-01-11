import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Title, Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import { ActiveSectionContext } from '../layout/layout';

interface PropTypes {
    metaTitle: string;
    pageTitle: React.ReactNode;
    description?: string;
}

export default function PageHeader({ metaTitle, description, pageTitle }: PropTypes): JSX.Element {
    const title = `${metaTitle} / Thumbprint`;

    return (
        <div className="mb5">
            <Head>
                {metaTitle && <title>{title}</title>}
                {metaTitle && <meta property="og:title" content={title} />}
                {metaTitle && <meta name="twitter:title" content={title} />}

                {description && <meta name="twitter:description" content={description} />}
                {description && <meta name="description" content={description} />}
                {description && <meta property="og:description" content={description} />}
            </Head>

            <ActiveSectionContext.Consumer>
                {(activeSection): JSX.Element => (
                    <Text
                        className={classNames({
                            // Hide the section name visually if it is the same as the page title. We
                            // still render it in the DOM so Algolia can use it for their search index.
                            'visually-hidden': pageTitle === activeSection,
                            'black-300 mb1': true,
                        })}
                        size={2}
                    >
                        <span data-algolia="lvl0">{activeSection}</span>
                    </Text>
                )}
            </ActiveSectionContext.Consumer>

            <Title headingLevel={1} size={1} className="flex justify-between items-baseline">
                {pageTitle}
            </Title>

            {description && (
                <p className="black-300 mt3" style={{ fontSize: '20px' }}>
                    {description}
                </p>
            )}
        </div>
    );
}
