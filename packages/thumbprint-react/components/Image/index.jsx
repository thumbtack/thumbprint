import React, { useState, forwardRef, useEffect } from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import scrollparent from 'scrollparent';
import { useInView } from 'react-intersection-observer';
import Picture from './components/picture.jsx';
import canUseDOM from '../../utils/can-use-dom';

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

    // The outermost DOM node that this component references. We use `useState` instead of
    // `useRef` because callback refs allow us to add more than one `ref` to a DOM node.
    const [containerRef, setContainerRef] = useState(null);

    // --------------------------------------------------------------------------------------------
    // Inline styles for container `div` and `Picture` component
    // --------------------------------------------------------------------------------------------

    const pictureProps = {
        src,
        sources,
        alt,
        style: { width: '100%', height: height || '100%', display: 'block' },
        sizes: containerRef && containerRef.clientWidth ? `${containerRef.clientWidth}px` : '0px',
    };

    const containerProps = {
        ...rest,
        style: {
            ...style,
            // Allows the container to behave like an image would. Without this, something like
            // passing a `border-radius` in `className` or `style` would not work since the
            // container is a `div`, not an `img`.
            overflow: 'hidden',
        },
    };

    // --------------------------------------------------------------------------------------------
    // Lazy-loading: library setup and polyfill
    // --------------------------------------------------------------------------------------------

    // IntersectionObserver's `root` property identifies the element whose bounds are treated as
    // the bounding box of the viewport for this element. By default, it uses `window`. Instead
    // of using the default, we use the nearest scrollable parent. This is the same approach that
    // React Waypoint and lazysizes use. The React Waypoint README explains this concept well:
    // https://git.io/fj00H
    const parent = canUseDOM && scrollparent(containerRef);
    const root = parent && (parent.tagName === 'HTML' || parent.tagName === 'BODY') ? null : parent;

    // `shouldLoadImage` becomes `true` when the lazy-loading functionality decides that we should
    // load the image.
    const [inViewRef, shouldLoadImage] = useInView({
        root,
        rootMargin: '100px',
        triggerOnce: true,
    });

    const [browserSupportIntersectionObserver, setBrowserSupportIntersectionObserver] = useState(
        canUseDOM && typeof window.IntersectionObserver !== 'undefined',
    );

    // Loads the `IntersectionObserver` polyfill asynchronously on browsers that don't support it.
    if (canUseDOM && typeof window.IntersectionObserver === 'undefined') {
        import('intersection-observer').then(() => {
            setBrowserSupportIntersectionObserver(true);
        });
    }

    // --------------------------------------------------------------------------------------------
    // Object Fit: polyfill and CSS styles
    // --------------------------------------------------------------------------------------------

    const shouldObjectFit = height || containerAspectRatio;
    const shouldPolyfillObjectFit =
        canUseDOM &&
        document.documentElement &&
        document.documentElement.style &&
        'objectFit' in document.documentElement.style !== true;

    warning(
        (!height && !containerAspectRatio) ||
            (height && !containerAspectRatio) ||
            (!height && containerAspectRatio),
        'You can pass either a `height` or `containerAspectRatio` to the `Image` component, but not both.',
    );

    useEffect(
        () => {
            // We polyfill `object-fit` for browsers that don't support it. We only do it if we're
            // using a `height` or `containerAspectRatio`. The `shouldLoadImage` variable ensures
            // that we don't try to polyfill the image before the `src` exists. This can happy
            // when we lazy-load.
            if (shouldObjectFit && containerRef && shouldLoadImage && shouldPolyfillObjectFit) {
                import('object-fit-images').then(({ default: ObjectFitImages }) => {
                    ObjectFitImages(containerRef.querySelector('img'));
                });
            }
        },
        [shouldObjectFit, shouldLoadImage],
    );

    if (shouldObjectFit) {
        pictureProps.style = {
            ...pictureProps.style,
            objectFit,
            objectPosition,
        };

        if (shouldPolyfillObjectFit) {
            // Weird, but this is how the polyfill knows what to do with the image in IE.
            pictureProps.style.fontFamily = `"object-fit: ${objectFit}; object-position: ${objectPosition}"`;
        }
    }

    // --------------------------------------------------------------------------------------------
    // Aspect Ratio Boxes
    // --------------------------------------------------------------------------------------------

    const aspectRatioBoxProps = {};

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

    return (
        <div
            {...containerProps}
            ref={el => {
                // Using a callback `ref` on this `div` allows us to have multiple `ref`s on one
                // element.
                setContainerRef(el);

                // We don't want to turn on the `react-intersection-observer` functionality until
                // the polyfill is done loading.
                if (browserSupportIntersectionObserver) {
                    inViewRef(el);
                }

                // `outerRef` is the potential forwarded `ref` passed in from a consumer.
                if (outerRef) {
                    outerRef(el);
                }
            }}
        >
            {/* This `div` holds the space set by `containerAspectRatio`. */}
            {Object.keys(aspectRatioBoxProps).length > 0 && <div {...aspectRatioBoxProps} />}

            {shouldLoadImage && <Picture {...pictureProps} />}

            <noscript>
                <Picture src={src} sources={sources} alt={alt} />
            </noscript>
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
