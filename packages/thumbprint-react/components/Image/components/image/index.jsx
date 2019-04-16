import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, objectFit, style: styleProp, alt, innerRef, ...rest }) => {
    const { height, style: objectFitStyle } = objectFit;

    const style = Object.assign({}, styleProp, { width: '100%', height });

    const supportsObjectFit = 'objectFit' in document.documentElement.style === true;

    if (objectFitStyle && supportsObjectFit) {
        style.objectFit = objectFitStyle;
    } else if (objectFitStyle && height) {
        // This is for browsers that don't support the object-fit. A height is required in this
        // case because the `div` would otherwise take up no space.
        style.backgroundImage = `url(${src})`;
        style.backgroundSize = objectFit;
        style.backgroundPosition = 'center center';

        return <div style={style} aria-label={alt} {...rest} ref={innerRef} />;
    }

    return <img src={src} alt={alt} style={style} {...rest} ref={innerRef} />;
};

Image.propTypes = {
    objectFit: PropTypes.shape({
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        style: PropTypes.oneOf(['cover']),
    }),
};

Image.defaultProps = {
    objectFit: {},
};

export default forwardRef((props, ref) => <Image {...props} innerRef={ref} />);
