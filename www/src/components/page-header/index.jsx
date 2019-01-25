import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Title, Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import { ActiveSectionContext } from '../container';

const PageHeader = ({ metaTitle, description, pageTitle }) => (
    <div className="mb5">
        <Helmet>
            {metaTitle && <title>{metaTitle} / Thumbprint</title>}
            {description && <meta name="description" content={description} />}
        </Helmet>

        <ActiveSectionContext.Consumer>
            {activeSection => (
                <Text
                    className={classNames({
                        // Hide the section name visually if it is the same as the page title. We
                        // still render it in the DOM so Algolia can use it for their search index.
                        'visually-hidden': pageTitle === activeSection,
                        'black-300 mb1 ttu': true,
                    })}
                    size={3}
                >
                    <span data-algolia="lvl0" style={{ letterSpacing: '1px' }}>
                        {activeSection}
                    </span>
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

PageHeader.propTypes = {
    metaTitle: PropTypes.string.isRequired,
    pageTitle: PropTypes.node.isRequired,
    description: PropTypes.string,
};

PageHeader.defaultProps = {
    description: undefined,
};

export default PageHeader;
