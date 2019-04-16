import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

/**
 * Converts '16:9' into 1.77, the value of 16/9.
 */
const normalizeAspectRatio = aspectRatio => {
    const [width, height] = aspectRatio.split(':');
    return parseInt(width, 10) / parseInt(height, 10);
};

const getPlaceholderSrc = aspectRatio => {
    // These numbers are arbitrary. They just have to be wider (in pixels) than all monitors that
    // visit our site.
    const height = 10000;
    const width = height * normalizeAspectRatio(aspectRatio);

    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
};

const LazyImage = ({ children, aspectRatio, ...rest }) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    // This placeholder currently is used to render an empty SVG that maintains the aspect ratio
    // of the image so that the page doesn't jump when the image loads.
    // https://css-tricks.com/preventing-content-reflow-from-lazy-loaded-images/
    const placeholderSrc =
        typeof aspectRatio === 'string' ? getPlaceholderSrc(aspectRatio) : undefined;

    return (
        <>
            <Waypoint
                onEnter={() => setShouldLoadImage(true)}
                // Start loading slightly before the user scrolls to the image
                topOffset={-100}
                bottomOffset={-100}
            />
            {children(shouldLoadImage ? rest : { src: placeholderSrc }, shouldLoadImage)}
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
