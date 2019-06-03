import React, { useState, forwardRef, useEffect } from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import scrollparent from 'scrollparent';
import Picture from './components/picture.jsx';
import LazyImage from './components/lazy-image.jsx';
import canUseDOM from '../../utils/can-use-dom';

const shouldPolyfillObjectFit = () =>
    canUseDOM &&
    document.documentElement &&
    document.documentElement.style &&
    'objectFit' in document.documentElement.style !== true;

const Image = forwardRef((props, outerRef) => {
    const {
        src,
        sources,
        style,
        height,
        containerAspectRatio,
        objectFit,
        objectPosition,
        alt,
        ...rest
    } = props;

    const [sizes, setSizes] = useState('0px');
    const [hasImageStartedLoading, setHasImageStartedLoading] = useState(false);
    const shouldObjectFit = height || containerAspectRatio;
    const [node, setRef] = useState(null);

    warning(
        (!height && !containerAspectRatio) ||
            (height && !containerAspectRatio) ||
            (!height && containerAspectRatio),
        'You can pass either a `height` or `containerAspectRatio` to the `Image` component, but not both.',
    );

    useEffect(
        () => {
            if (node) {
                setSizes(`${node.clientWidth}px`);
            }
        },
        [node],
    );

    useEffect(
        () => {
            // We polyfill `object-fit` for browsers that don't support it. We only do it if we're
            // using a `height` or `containerAspectRatio`. The `hasImageStartedLoading` variable ensures
            // that we don't try to polyfill the image before the `src` exists. This can happy
            // when we lazy-load.
            if (shouldObjectFit && node && hasImageStartedLoading && shouldPolyfillObjectFit()) {
                import('object-fit-images').then(({ default: ObjectFitImages }) => {
                    ObjectFitImages(node.querySelector('img'));
                });
            }
        },
        [shouldObjectFit, hasImageStartedLoading],
    );

    const pictureProps = {
        src,
        sources,
        sizes,
        alt,
        style: { width: '100%', height: '100%', display: 'block' },
    };

    const containerProps = {
        ...rest,
        style: {
            ...style,
            // Allows the container to behave like an image would.
            overflow: 'hidden',
        },
    };

    const aspectRatioBoxProps = {};

    if (shouldObjectFit) {
        pictureProps.style = {
            ...pictureProps.style,
            objectFit,
            objectPosition,
        };

        if (shouldPolyfillObjectFit()) {
            // Weird, but this is how the polyfill knows what to do with the image in IE.
            pictureProps.style.fontFamily = `"object-fit: ${objectFit}; object-position: ${objectPosition}"`;
        }
    }

    if (height) {
        pictureProps.style.height = height;
    }

    if (containerAspectRatio) {
        // This ensures that the image always renders at that apsect ratio and that lazy-loaded
        // images don't cause the browser scroll to jump once the image has loaded. It uses the
        // following technique: https://css-tricks.com/aspect-ratio-boxes/
        const h = 100000;
        const w = h * containerAspectRatio;

        containerProps.style = {
            ...containerProps.style,
            position: 'relative',
        };

        aspectRatioBoxProps.style = {
            paddingTop: `${(h / w) * 100}%`,
        };

        pictureProps.style = {
            ...pictureProps.style,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: '100%',
        };
    }

    const parent = canUseDOM && scrollparent(node);
    // If `scrollparent` doesn't find a custom scroll parent, then we just send `null` so
    // that Intersection Observer just uses the default `window`.
    const root = parent && (parent.tagName === 'HTML' || parent.tagName === 'BODY') ? null : parent;

    const picture = (
        <LazyImage
            {...pictureProps}
            root={root}
            onEnter={() => {
                setHasImageStartedLoading(true);
            }}
        >
            {lazyImageProps => <Picture {...lazyImageProps} />}
        </LazyImage>
    );

    return (
        <div
            {...containerProps}
            ref={el => {
                setRef(el);

                if (outerRef) {
                    outerRef(el);
                }
            }}
        >
            {/* This `div` holds the space set by `containerAspectRatio`. */}
            {Object.keys(aspectRatioBoxProps).length > 0 && <div {...aspectRatioBoxProps} />}

            {picture}
        </div>
    );
});

Image.propTypes = {
    /**
     * If `sources` is provided, this image will be loaded by search engines and lazy-loaded for
     * users on browsers that don't support responsive images. If `sources` is not provided, this
     * image will be lazy-loaded.
     */
    src: PropTypes.string.isRequired,
    /**
     * Allows the browser to choose the best file format and image size based on the device screen
     * density and the width of the rendered image.
     */
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['image/webp', 'image/jpeg', 'image/png', 'image/gif'])
                .isRequired,
            srcSet: PropTypes.string.isRequired,
        }),
    ),
    alt: PropTypes.string,
    /**
     * Crops the image at the provided height. The `objectFit` and `objectPosition` props can be
     * used to control how the image is cropped.
     */
    height: PropTypes.string,
    /**
     * Crops the image to a specific aspect ratio and creates a [placeholder box](https://css-tricks.com/aspect-ratio-boxes/)
     * for the image. The placeholder prevents the browser scroll from jumping when the image is
     * lazy-loaded.
     */
    containerAspectRatio: PropTypes.number,
    /**
     * Provides control over how an image should be resized to fit the container. This controls the
     * `object-fit` CSS property. It is only useful if `height` or `containerAspectRatio` are used to
     * "crop" an image.
     */
    objectFit: PropTypes.oneOf(['cover', 'contain']),
    /**
     * Provides control over how an image aligned in the container. This controls the
     * `object-position` CSS property. It is only useful if `height` or `containerAspectRatio` are used to
     * "crop" an image.
     */
    objectPosition: PropTypes.oneOf(['top', 'center', 'bottom', 'left', 'right']),
};

Image.defaultProps = {
    sources: [],
    alt: '',
    height: undefined,
    containerAspectRatio: undefined,
    objectFit: 'cover',
    objectPosition: 'center',
};

// Needed because of the `forwardRef`.
Image.displayName = 'Image';

export default Image;
