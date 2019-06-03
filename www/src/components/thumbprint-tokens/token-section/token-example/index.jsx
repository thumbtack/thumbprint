import React from 'react';
import PropTypes from 'prop-types';
import Color from './color';
import { InlineCode } from '../../../mdx';

const TokenExample = props => {
    let children;

    switch (props.type) {
        case 'color':
            children = <Color hex={props.value.web}>{props.children}</Color>;
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
    value: PropTypes.shape({
        web: PropTypes.string,
        ios: PropTypes.string,
        android: PropTypes.string,
    }),
};

TokenExample.defaultProps = {
    type: undefined,
    value: undefined,
};

export default TokenExample;
