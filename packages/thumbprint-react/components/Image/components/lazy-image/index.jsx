import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

const LazyImage = ({ children, aspectRatio, ...rest }) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    return (
        <>
            <Waypoint
                onEnter={() => setShouldLoadImage(true)}
                // Start loading slightly before the user scrolls to the image
                topOffset={-100}
                bottomOffset={-100}
            />
            {children(shouldLoadImage ? rest : {}, shouldLoadImage)}
        </>
    );
};

LazyImage.propTypes = {
    /**
     * A function that receives an object containing the properties `src` and `alt`. Using a
     * function gives the consumer greater control, allowing this to work with both CSS background
     * images as well as `img` tags.
     */
    children: PropTypes.func.isRequired,
};

export default LazyImage;
