import React, { useState, forwardRef, useEffect } from 'react';
import find from 'lodash/find';
import classNames from 'classnames';
import warning from 'warning';
import PropTypes from 'prop-types';
import scrollparent from 'scrollparent';
import { useInView } from 'react-intersection-observer';
import canUseDOM from '../../utils/can-use-dom';
import styles from './index.module.scss';
import { join } from 'path';

const Image = forwardRef((props, outerRef) => {
    const {
        src,
        sources,
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
    // Sizes
    // --------------------------------------------------------------------------------------------

    const sizes =
        containerRef && containerRef.clientWidth ? `${containerRef.clientWidth}px` : '0px';

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

    const objectFitProps = {};

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
        objectFitProps.style = {
            objectFit,
            objectPosition,
        };
        if (shouldPolyfillObjectFit) {
            // Weird, but this is how the polyfill knows what to do with the image in IE.
            objectFitProps.style.fontFamily = `"object-fit: ${objectFit}; object-position: ${objectPosition}"`;
        }
    }

    // --------------------------------------------------------------------------------------------
    // Image Aspect Ratio
    // --------------------------------------------------------------------------------------------

    const aspectRatioBoxProps = {};

    if (containerAspectRatio) {
        // This ensures that the image always renders at that apsect ratio and that lazy-loaded
        // images don't cause the browser scroll to jump once the image has loaded. It uses the
        // following technique: https://css-tricks.com/aspect-ratio-boxes/
        const h = 100000;
        const w = h * containerAspectRatio;

        aspectRatioBoxProps.style = {
            paddingTop: `${(h / w) * 100}%`,
            height: 0,
        };
    }

    // --------------------------------------------------------------------------------------------
    // Sources and scrSets
    // --------------------------------------------------------------------------------------------

    // We separate `webp` from the `jpeg`/`png` so that we can apply the `imgTagSource` directly
    // onto the `img` tag. While this makes the code messier, it is needed to work around a bug in
    // Safari:
    // - https://bugs.webkit.org/show_bug.cgi?id=190031
    // - https://bugs.webkit.org/show_bug.cgi?id=177068
    const webpSource = find(sources, s => s.type === 'image/webp');
    const imgTagSource = find(sources, s => s.type === 'image/jpeg' || s.type === 'image/png');

    // --------------------------------------------------------------------------------------------
    // Image loaded fade in
    // --------------------------------------------------------------------------------------------

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <picture
                {...rest}
                className={classNames({
                    [styles.picture]: true,
                    [props.className]: props.className,
                })}
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
                {webpSource && (
                    <source
                        type={webpSource.type}
                        srcSet={shouldLoadImage ? webpSource.srcSet : undefined}
                        sizes={sizes}
                    />
                )}
                <img
                    // The order of `sizes`, `srcSet`, and `src` is important to work around a bug in
                    // Safari. Once the bug is fixed, we should simplify this by using `src` on the
                    // `img` tag and using `source` tags.
                    sizes={sizes}
                    srcSet={shouldLoadImage && imgTagSource ? imgTagSource.srcSet : undefined}
                    src={shouldLoadImage ? src : undefined}
                    height={height}
                    alt={alt}
                    style={{
                        ...objectFitProps.style,
                        ...(isLoaded ? {} : aspectRatioBoxProps.style),
                    }}
                    onLoad={() => {
                        setIsLoaded(true);
                    }}
                    className={classNames({
                        [styles.image]: true,
                        [styles.imageLoading]: true,
                        [styles.imageLoaded]: isLoaded,
                    })}
                />
            </picture>
            <noscript>
                <picture>
                    {webpSource && <source srcSet={webpSource.srcSet} type={webpSource.type} />}
                    <img src={src} alt={alt} srcSet={imgTagSource && imgTagSource.srcSet} />
                </picture>
            </noscript>
        </>
    );
});

export default Image;
