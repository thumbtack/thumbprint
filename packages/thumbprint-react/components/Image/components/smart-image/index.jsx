import React, { useState, forwardRef, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import warning from 'warning';
import PropTypes from 'prop-types';

const LazyImage = ({ children, src: srcProp, sources: sourcesProp, onEnter, alt, ...rest }) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    const src = shouldLoadImage ? srcProp : undefined;

    const sources = shouldLoadImage ? sourcesProp : [];

    return (
        <>
            <Waypoint
                onEnter={() => {
                    setShouldLoadImage(true);
                    onEnter(true);
                }}
                // Start loading slightly before the user scrolls to the image
                topOffset={-100}
                bottomOffset={-100}
            >
                {children({ src, sources, alt, ...rest })}
            </Waypoint>

            {srcProp && (
                <noscript>
                    <Picture src={srcProp} sources={sourcesProp} alt={alt} />
                </noscript>
            )}
        </>
    );
};

const Picture = forwardRef((props, ref) => {
    const { src, sources, sizes, alt, style, ...rest } = props;

    return (
        <picture>
            {sources.map(({ type, srcSet }) => (
                <source type={type} srcSet={srcSet} key={type} sizes={sizes} />
            ))}
            <img src={src} alt={alt} style={style} ref={ref} {...rest} />
        </picture>
    );
});

const shouldPolyfillObjectFit = () =>
    typeof window !== 'undefined' &&
    document.documentElement &&
    document.documentElement.style &&
    'objectFit' in document.documentElement.style === true;

const SmartImage = forwardRef((props, outerRef) => {
    const {
        src,
        sources,
        style,
        disableLazyLoading,
        height,
        aspectRatio,
        objectFit,
        objectPosition,
        width,
        alt,
        ...rest
    } = props;

    const [sizes, setSizes] = useState('0px');
    const [hasImageStartedLoading, setHasImageStartedLoading] = useState(disableLazyLoading);
    const shouldObjectFit = height || aspectRatio;
    const [node, setRef] = useState(null);

    warning(
        (!height && !aspectRatio) || (height && !aspectRatio) || (!height && aspectRatio),
        'You can pass either a `height` or `aspectRatio` to the `SmartImage` component, but not both.',
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
            // using a `height` or `aspectRatio`. The `hasImageStartedLoading` variable ensures
            // that we don't try to polyfill the image before the `src` exists. This can happy
            // when we lazy-load.
            if (shouldObjectFit && node && hasImageStartedLoading && shouldPolyfillObjectFit()) {
                // TODO move the object fit support outside and don't add the weird font family thing in non IE
                import('object-fit-images').then(({ default: ObjectFitImages }) =>
                    ObjectFitImages(node.querySelector('img')),
                );
            }
        },
        [hasImageStartedLoading],
    );

    let picture;

    const pictureProps = {
        src,
        sources,
        sizes,
        alt,
        style: { width: '100%', display: 'block' },
    };

    const containerProps = { ...rest, style };

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

    if (aspectRatio) {
        // This ensures that the image always renders at that apsect ratio and that lazy-loaded
        // images don't cause the browser scroll to jump once the image has loaded. It uses the
        // following technique: https://css-tricks.com/aspect-ratio-boxes/
        const h = 100000;
        const w = h * aspectRatio;

        containerProps.style = {
            ...containerProps.style,
            paddingTop: `${(h / w) * 100}%`,
            overflow: 'hidden',
            position: 'relative',
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

    if (disableLazyLoading) {
        picture = <Picture {...pictureProps} />;
    } else {
        picture = (
            <LazyImage
                {...pictureProps}
                onEnter={() => {
                    setHasImageStartedLoading(true);
                }}
            >
                {lazyImageProps => <Picture {...lazyImageProps} />}
            </LazyImage>
        );
    }

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
            {picture}
        </div>
    );
});

SmartImage.propTypes = {
    /**
     * If `sources` is provided, this image will be loaded by search engines and lazy-loaded for
     * users on browsers that don't support responsive images. If `sources` is not provided, this
     * image will be lazy-loaded unless `disableLazyLoading` is `true`.
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
    aspectRatio: PropTypes.number,
    /**
     * Provides control over how an image should be resized to fit the container. This controls the
     * `object-fit` CSS property. It is only useful if `height` or `aspectRatio` are used to
     * "crop" an image.
     */
    objectFit: PropTypes.oneOf(['cover', 'contain']),
    /**
     * Provides control over how an image aligned in the container. This controls the
     * `object-position` CSS property. It is only useful if `height` or `aspectRatio` are used to
     * "crop" an image.
     */
    objectPosition: PropTypes.oneOf(['top', 'center', 'bottom', 'left', 'right']),
    disableLazyLoading: PropTypes.bool,
};

SmartImage.defaultProps = {
    sources: [],
    alt: '',
    height: undefined,
    aspectRatio: undefined,
    objectFit: 'cover',
    objectPosition: 'center',
    disableLazyLoading: false,
};

export default SmartImage;
