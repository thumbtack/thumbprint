import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Title, Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import { ActiveSectionContext } from '../container';

interface PropTypes {
    metaTitle: string;
    pageTitle: React.ReactNode;
    description?: string;
    isOpen?: boolean;
}

export default function PageHeader({ metaTitle, description, pageTitle }: PropTypes): JSX.Element {
    return (
        <div className="mb5">
            <Helmet>
                {metaTitle && <title>{metaTitle} / Thumbprint</title>}
                {metaTitle && <meta property="og:title" content={`${metaTitle} / Thumbprint`} />}
                {metaTitle && <meta name="twitter:title" content={`${metaTitle} / Thumbprint`} />}

                {description && <meta name="twitter:description" content={description} />}
                {description && <meta name="description" content={description} />}
                {description && <meta property="og:description" content={description} />}
            </Helmet>

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
