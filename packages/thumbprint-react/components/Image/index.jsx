import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import Rect from '@reach/rect';

const srcSetToString = ({ jpeg, webp }) => {
    const jpegSizes = Object.keys(jpeg);
    const webpSizes = Object.keys(webp);

    return {
        jpeg: jpegSizes.map(size => `${jpeg[size]} ${size}w`).join(', '),
        webp: webpSizes.map(size => `${webp[size]} ${size}w`).join(', '),
    };
};

class ResponsiveImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.getClosestSrcBySize = this.getClosestSrcBySize.bind(this);
    }

    /**
     * Given the `width` of a DOM node, return the URL of an image from
     * `srcSet['jpeg']` that is equal to or one step larger than `width`. This
     * responsive images to work in IE 11.
     */
    getClosestSrcBySize(width) {
        const { srcSet } = this.props;

        // All of the sizes that can be used as a `src` for browsers that
        // don't support responsive images.
        const availableSizes = Object.keys(srcSet.jpeg);

        // Convert strings to numbers and sort them.
        const sortedAvailableSizes = availableSizes.sort(n => Number(n));

        // Given the width of the DOM element, choose the next biggest image
        // size. The `length` check handles the case where the DOM element is
        // larger than any of the image sizes in `srcSet['jpeg']`.
        let i = 0;
        while (width > sortedAvailableSizes[i] && i < sortedAvailableSizes.length - 1) {
            i += 1;
        }

        // The `width` of the image to serve.
        const selectedSize = sortedAvailableSizes[i];

        // The URL of the image that is equal to or one step larger than the
        // `width`.
        return srcSet.jpeg[selectedSize];
    }

    render() {
        const { srcSet, children } = this.props;

        return (
            <Rect observe>
                {({ rect, ref }) => {
                    const width = rect && Math.round(rect.width);

                    return children({
                        src: width ? this.getClosestSrcBySize(width) : undefined,
                        srcSet: width ? srcSetToString(srcSet) : undefined,
                        sizes: width ? `${width}px` : undefined,
                        className: 'db w-100',
                        ref,
                    });
                }}
            </Rect>
        );
    }
}

ResponsiveImage.propTypes = {
    srcSet: PropTypes.shape({
        webp: PropTypes.shape({}),
        jpeg: PropTypes.shape({}).isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
};

class LazyImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldLoadImage: false,
        };

        this.setShouldLoadImage = this.setShouldLoadImage.bind(this);
    }

    setShouldLoadImage(shouldLoadImage) {
        this.setState({
            shouldLoadImage,
        });
    }

    render() {
        const { children, src, alt } = this.props;
        const { shouldLoadImage } = this.state;

        return (
            <React.Fragment>
                <Waypoint
                    onEnter={() => this.setShouldLoadImage(true)}
                    // Start loading slightly before the user scrolls to the image
                    topOffset={-100}
                    bottomOffset={-100}
                >
                    {children({ src: shouldLoadImage ? src : undefined, alt })}
                </Waypoint>
                {/*
                    Using `noscript` allows Google to index the image.
                    Source: https://youtu.be/PFwUbgvpdaQ?t=2018 (Google I/O 2018)
                */}
                <noscript>
                    <img src={src} alt={alt} />
                </noscript>
            </React.Fragment>
        );
    }
}

LazyImage.propTypes = {
    /**
     * A function that receives an object containing the properties `src` and `alt`. Using a
     * function gives the consumer greater control, allowing this to work with both CSS background
     * images as well as `img` tags.
     */
    children: PropTypes.func.isRequired,
    /**
     * The URL to the image that should be lazy-loaded.
     */
    src: PropTypes.string.isRequired,
    /**
     * Text describing the image.
     */
    alt: PropTypes.string,
};

LazyImage.defaultProps = {
    alt: '',
};

// eslint-disable-next-line import/prefer-default-export
export { LazyImage, ResponsiveImage };
