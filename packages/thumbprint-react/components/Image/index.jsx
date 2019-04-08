import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import useComponentSize from '@rehooks/component-size';

const getImageServiceSrc = ({ id, format, width }) =>
    `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}.${format}`;

const getImageServiceSrcSet = (id, formats) => {
    const o = {};

    formats.forEach(format => {
        o[format] = {
            120: getImageServiceSrc({ id, format, width: 120 }),
            320: getImageServiceSrc({ id, format, width: 320 }),
            400: getImageServiceSrc({ id, format, width: 400 }),
            640: getImageServiceSrc({ id, format, width: 640 }),
            768: getImageServiceSrc({ id, format, width: 768 }),
            1024: getImageServiceSrc({ id, format, width: 1024 }),
            1366: getImageServiceSrc({ id, format, width: 1366 }),
            1600: getImageServiceSrc({ id, format, width: 1600 }),
            1920: getImageServiceSrc({ id, format, width: 1920 }),
            2200: getImageServiceSrc({ id, format, width: 2200 }),
            2350: getImageServiceSrc({ id, format, width: 2350 }),
            2560: getImageServiceSrc({ id, format, width: 2560 }),
        };
    });

    return o;
};

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
};

const ResponsiveImage = ({ srcSet, children }) => {
    const ref = useRef(null);

    // Width of the image.
    const { width } = useComponentSize(ref);

    return children({
        src: width ? getClosestSrcBySize(srcSet, width) : undefined,
        srcSet: width ? srcSetToString(srcSet) : undefined,
        sizes: width ? `${width}px` : undefined,
        className: 'db w-100',
        ref,
    });
};

ResponsiveImage.propTypes = {
    srcSet: PropTypes.shape({
        webp: PropTypes.shape({}),
        jpeg: PropTypes.shape({}).isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
    // isFullWidth: PropTypes.bool,
};

ResponsiveImage.defaultProps = {
    // isFullWidth: false,
};

const LazyImage = ({ children, ...rest }) => {
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

const MagicImage = ({ id, format, alt, width, isLazyLoaded, ...rest }) => {
    // The image is responsive if no width is passed in.
    const isResponsive = !!width;

    // We use the fancy `ResponsiveImage` component if the image is responsive.
    const Component = isResponsive ? 'img' : ResponsiveImage;

    let children;
    let childProps;

    if (isResponsive) {
        childProps = {
            srcSet: getImageServiceSrcSet(id, [format]),
            // Responsive images
            children: ({ ref, sizes, src, srcSet, className }) => (
                <picture ref={ref} className={className} {...rest}>
                    {srcSet &&
                        srcSet.map(s => (
                            <source type={s.type} sizes={sizes} srcSet={s.srcSet} key={s.type} />
                        ))}
                    <img src={src} sizes={sizes} alt={alt} />
                </picture>
            ),
        };
    } else {
        childProps = { src: getImageServiceSrc({ id, format, width }), alt, ...rest };
    }

    if (isLazyLoaded) {
        const { children: c, ...r } = childProps;
        children = (
            <LazyImage {...r}>
                {(p, shouldLoadImage) => shouldLoadImage && <Component children={c} {...p} />}
            </LazyImage>
        );
    } else {
        children = <Component {...childProps} />;
    }

    return children;
};

// eslint-disable-next-line import/prefer-default-export
export { MagicImage, LazyImage, ResponsiveImage, getImageServiceSrc, getImageServiceSrcSet };
