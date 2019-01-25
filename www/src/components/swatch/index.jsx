import React from 'react';
import PropTypes from 'prop-types';

const Swatch = ({ value }) => {
    const declaration = value;
    const styles = 'w1 h1 ml1 ml2 dib relative top-3';

    if (declaration.includes('#')) {
        const hex = declaration.match(/#[a-zA-Z0-9]+/);
        return <span className={styles} style={{ background: hex[0] }} />;
    }

    return null;
};

Swatch.propTypes = {
    value: PropTypes.string,
};

Swatch.defaultProps = {
    value: undefined,
};

export default Swatch;
