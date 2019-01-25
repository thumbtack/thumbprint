import React from 'react';
import PropTypes from 'prop-types';

const H3 = ({ id, children }) => (
    <h3 id={id} className="tp-title-5 mt4 mb2">
        {children}
    </h3>
);

H3.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string,
};

H3.defaultProps = {
    id: undefined,
};

export default H3;
