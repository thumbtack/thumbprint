import React from 'react';
import PropTypes from 'prop-types';
import Color from './color';
import { InlineCode } from '../../mdx';

const TokenExample = props => {
    let children;

    switch (props.type) {
        case 'color':
            children = <Color value={props.children} />;
            break;
        default:
            children = <InlineCode theme="plain">{props.children}</InlineCode>;
            break;
    }

    return <div>{children}</div>;
};

TokenExample.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
};

TokenExample.defaultProps = {
    type: undefined,
};

export default TokenExample;
