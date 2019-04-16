import { useRef } from 'react';
import PropTypes from 'prop-types';
import useComponentSize from '@rehooks/component-size';

const EMPTY_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const srcSetToString = ({ jpeg, webp, png, gif }) => {
    const generateSrcSet = platform =>
        Object.keys(platform)
            .map(size => `${platform[size]} ${size}w`)
            .join(', ');

    const result = [];

    if (webp) {
        result.push({
            type: 'image/webp',
            srcSet: generateSrcSet(webp),
        });
    }

    if (jpeg) {
        result.push({
            type: 'image/jpeg',
            srcSet: generateSrcSet(jpeg),
        });
    }

    if (png) {
        result.push({
            type: 'image/png',
            srcSet: generateSrcSet(png),
        });
    }

    if (gif) {
        result.push({
            type: 'image/gif',
            srcSet: generateSrcSet(gif),
        });
    }

    return result;
};

/**
 * Given the `width` of a DOM node, return the URL of an image from
 * `srcSet['jpeg']` that is equal to or one step larger than `width`. This
 * responsive images to work in IE 11.
 */
const getClosestSrcBySize = (srcSet, width) => {
    let formatToUse;

    if (srcSet.jpeg) {
        formatToUse = 'jpeg';
    } else if (srcSet.png) {
        formatToUse = 'png';
    } else if (srcSet.gif) {
        formatToUse = 'gif';
    }

    if (!formatToUse) {
        return EMPTY_SRC;
    }

    // All of the sizes that can be used as a `src` for browsers that
    // don't support responsive images.
    const availableSizes = Object.keys(srcSet[formatToUse]);

    // Convert strings to numbers and sort them.
    const sortedAvailableSizes = availableSizes.sort(n => Number(n));

    // Given the width of the DOM element, choose the next biggest image
    // size. The `length` check handles the case where the DOM element is
    // larger than any of the image sizes in `srcSet[formatToUse]`.
    let i = 0;
    while (width > sortedAvailableSizes[i] && i < sortedAvailableSizes.length - 1) {
        i += 1;
    }

    // The `width` of the image to serve.
    const selectedSize = sortedAvailableSizes[i];

    // The URL of the image that is equal to or one step larger than the
    // `width`.
    return srcSet[formatToUse][selectedSize];
};

const checkBrowserSupport = () => {
    const img = document.createElement('img');
    return 'sizes' in img;
};

const ResponsiveImage = ({ srcSet, children }) => {
    const ref = useRef(null);

    // Width of the image.
    const { width } = useComponentSize(ref);

    const isSupported = checkBrowserSupport();

    return children({
        src: width && srcSet && !isSupported ? getClosestSrcBySize(srcSet, width) : EMPTY_SRC,
        srcSet: width && srcSet && isSupported ? srcSetToString(srcSet) : [],
        sizes: width && isSupported ? `${width}px` : undefined,
        style: { width: '100%', display: 'block' },
        ref,
    });
};

ResponsiveImage.propTypes = {
    srcSet: PropTypes.shape({
        webp: PropTypes.shape({}),
        jpeg: PropTypes.shape({}),
        png: PropTypes.shape({}),
        gif: PropTypes.shape({}),
    }).isRequired,
    children: PropTypes.func.isRequired,
};

export default ResponsiveImage;
