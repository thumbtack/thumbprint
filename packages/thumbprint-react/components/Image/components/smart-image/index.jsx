import React, { useState, forwardRef, useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import warning from 'warning';
import PropTypes from 'prop-types';
import scrollparent from 'scrollparent';

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

/**
 * Converts `"8:5"` to `8/5`.
 */
const aspectRatioStringToFloat = aspectRatio => {
    if (!aspectRatio) {
        return null;
    }

    const arr = aspectRatio.split(':');
    return parseFloat(arr[0]) / parseFloat(arr[1]);
};

const LazyImage = ({
    children,
    src: srcProp,
    sources: sourcesProp,
    root,
    onEnter,
    alt,
    ...rest
}) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    // We track this as state because the polyfill is loaded asynchronously in browsers that need
    // it. Storing it in state allows us to trigger a re-render once the polyfill is loaded.
    const [isIntersectionObserverSupported, setIsIntersectionObserverSupported] = useState(
        canUseDOM && typeof window.IntersectionObserver !== 'undefined',
    );

    // Loads the polyfill and indicates the browser now supports Intersection Observer.
    if (canUseDOM && !isIntersectionObserverSupported) {
        import('intersection-observer').then(() => {
            setIsIntersectionObserverSupported(true);
        });
    }

    const src = shouldLoadImage ? srcProp : undefined;
    const sources = shouldLoadImage ? sourcesProp : [];

    return (
        <>
            {isIntersectionObserverSupported && (
                <InView
                    threshold={0}
                    root={root}
                    rootMargin="100px"
                    onChange={inView => {
                        if (inView) {
                            setShouldLoadImage(true);
                            onEnter(true);
                        }
                    }}
                >
                    {({ ref }) => children({ src, sources, alt, ref, ...rest })}
                </InView>
            )}

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
    canUseDOM &&
    document.documentElement &&
    document.documentElement.style &&
    'objectFit' in document.documentElement.style !== true;

const SmartImage = forwardRef((props, outerRef) => {
    const {
        src,
        sources,
        style,
        disableLazyLoading,
        height,
        aspectRatio: aspectRatioProp,
        objectFit,
        objectPosition,
        width,
        alt,
        ...rest
    } = props;

    const aspectRatio = aspectRatioStringToFloat(aspectRatioProp);
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
                import('object-fit-images').then(({ default: ObjectFitImages }) => {
                    ObjectFitImages(node.querySelector('img'));
                });
            }
        },
        [shouldObjectFit, hasImageStartedLoading],
    );

    let picture;

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
        const parent = canUseDOM && scrollparent(node);
        // If `scrollparent` doesn't find a custom scroll parent, then we just send `null` so
        // that Intersection Observer just uses the default `window`.
        const root =
            parent && (parent.tagName === 'HTML' || parent.tagName === 'BODY') ? null : parent;

        picture = (
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
    aspectRatio: PropTypes.string,
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
