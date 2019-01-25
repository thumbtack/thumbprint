import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@thumbtack/thumbprint-react';
import { InlineCode } from '../mdx';

const GraveyardEntry = ({ title, date, docsLink, children }) => (
    <div className="bb b-gray-300 pb3 mb3">
        <Text className="b mb1">{title}</Text>
        <div className="black-300 mb1">{children}</div>
        <Text size={2} className="black-300">
            <InlineCode theme="plain">{date}</InlineCode> •{' '}
            <a href={docsLink}>View documentation</a>
        </Text>
    </div>
);

GraveyardEntry.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    docsLink: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default GraveyardEntry;
