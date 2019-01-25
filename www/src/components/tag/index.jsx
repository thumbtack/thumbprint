import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const tagStyles = {
    letterSpacing: '0.5px',
    fontSize: '10px',
    textShadow: '1px 1px rgba(0,0,0,.2)',
};

const Tag = ({ type, className }) => (
    <span
        className={classNames(`b ba bw-2 br2 ttu ph1 br1 white ${className}`, {
            'b-yellow bg-yellow': type === 'deprecated',
            'b-red bg-red': type === 'required',
        })}
        style={tagStyles}
    >
        {type}
    </span>
);

Tag.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['deprecated', 'required']).isRequired,
};

Tag.defaultProps = {
    className: undefined,
};

export default Tag;
