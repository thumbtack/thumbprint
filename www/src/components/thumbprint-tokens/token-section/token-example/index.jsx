import React from 'react';
import PropTypes from 'prop-types';
import Color from './color';
import { InlineCode } from '../../../mdx';

const TokenExample = ({ children, platform, type }) => {
    let value = <InlineCode theme="plain">{children}</InlineCode>;

    if (type === 'color') {
        value = <Color value={children} platform={platform} />;
    }

    return <div>{value}</div>;
};

TokenExample.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
    platform: PropTypes.string.isRequired,
};

TokenExample.defaultProps = {
    type: undefined,
};

export default TokenExample;
