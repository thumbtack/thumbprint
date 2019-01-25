import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '@thumbtack/thumbprint-react';

const H2 = ({ id, children }) => (
    <Title headingLevel={2} size={2} id={id} className="mt6 mb3">
        {children}
    </Title>
);

H2.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string,
};

H2.defaultProps = {
    id: undefined,
};

export default H2;
