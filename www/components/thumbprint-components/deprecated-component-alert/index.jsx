import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../../alert';

const DeprecatedComponentAlert = ({ children }) => (
    <Alert type="warning" title="Deprecated">
        {children}
    </Alert>
);

DeprecatedComponentAlert.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DeprecatedComponentAlert;
