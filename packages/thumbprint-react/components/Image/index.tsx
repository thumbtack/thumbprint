import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import find from 'lodash/find';
import classNames from 'classnames';
import warning from 'warning';
import canUseDOM from '../../utils/can-use-dom';
import useLazyLoad from './use-lazy-load';
import styles from './index.module.scss';

// --------------------------------------------------------------------------------------------
// Steps in rendering Image
//
// 1. Picture is rendered without src, srcSets, and with a padding-top placholder on the <img>
// based on the containerAspectRatio.
// 2. The "sizes" attr is calculated on initial render to determine width of image.
// 3. When lazyload is triggered the src and scrSet props are populated based on the sizes value.
// 4. The image is set to opacity:0 to start to prevent flash of alt text
// 5. The image onLoad and onError events remove padding-top placholder and sets opacity to 1.
// --------------------------------------------------------------------------------------------

type ImageSource = {
    type: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/gif';
    srcSet: string;
};

export interface ImageProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    /**
     * If `sources` is provided, this image will be loaded by search engines and lazy-loaded for
     * users on browsers that don't support responsive images. If `sources` is not provided, this
     * image will be lazy-loaded.
     */
    src: string;
    /**
     * Allows the browser to choose the best file format and image size based on the device screen
     * density and the width of the rendered image.
     */
    sources?: ImageSource[];
    alt?: string;
    /**
     * Crops the image at the provided height. The `objectFit` and `objectPosition` props can be
     * used to control how the image is cropped.
     */
    height?: string;
    /**
     * Creates a [placeholder box](https://css-tricks.com/aspect-ratio-boxes/) for the image.
     * The placeholder prevents the browser scroll from jumping when the image is lazy-loaded.
     */
    containerAspectRatio?: number;
    /**
     * Disables lazy-loading and overrides the default calculation of the `sizes` attribute.
     * Primarily for important images in a server-side rendered environment that must be
     * loaded before JavaScript is parsed and executed on the client. The value gets used
     * as the `sizes` attribute. [See allowable values](https://mzl.la/2Hh6neO).
     */
    forceEarlyRender?: React.ImgHTMLAttributes<HTMLImageElement>['sizes'];
    /**
     * Provides control over how the image should be resized to fit the container. This controls the
     * `object-fit` CSS property. It is only useful if `height` is used to "crop" the image.
     */
    objectFit?: 'cover' | 'contain';
    /**
     * Provides control over how the image position in the container. This controls the
     * `object-position` CSS property. It is only useful if `height` is used to "crop" the image.
     */
    objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
    className?: string;
}

type ObjectFitPropsType = {
    style?: {
        // Not using React.CSSProperties types for these two, because we use a restricted subset.
        objectFit?: 'cover' | 'contain';
        objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
        fontFamily?: React.CSSProperties['fontFamily'];
        height?: '100%';
    };
};

type AspectRatioBoxPropsType = {
    style?: {
        paddingTop?: React.CSSProperties['paddingTop'];
        overflow?: React.CSSProperties['overflow'];
        height?: React.CSSProperties['height'];
    };
};

const Image = forwardRef<HTMLElement, ImageProps>((props: ImageProps, outerRef) => {
    const {
        src,
        sources = [],
        height,
        containerAspectRatio,
        objectFit = 'cover',
        objectPosition = 'center',
        alt = '',
        className,
        forceEarlyRender = null,
        ...rest
    } = props;

    // The outermost DOM node that this component references. We use `useState` instead of
    // `useRef` because callback refs allow us to add more than one `ref` to a DOM node.
    const [containerRef, setContainerRef] = useState<Element | null>(null);

    // --------------------------------------------------------------------------------------------
    // Sizes
    // --------------------------------------------------------------------------------------------

    // Used by srcSet to determine which image in the list will be requested. This value has to be
    // calculated client-side because we don't know the viewport width.

    const computeSizes = (): string =>
        containerRef && containerRef.clientWidth ? `${containerRef.clientWidth}px` : '0px';

    // If `forceEarlyRender` is truthy use that value, otherwise use the computed width.
    const sizes = forceEarlyRender || computeSizes();

    // --------------------------------------------------------------------------------------------
    // Lazy-loading: library setup and polyfill
    // --------------------------------------------------------------------------------------------

    const [browserSupportIntersectionObserver, setBrowserSupportIntersectionObserver] = useState<
        boolean
    >(
        // eslint-disable-next-line compat/compat
        canUseDOM && typeof window.IntersectionObserver !== 'undefined',
    );

    const shouldLoad = useLazyLoad(containerRef, browserSupportIntersectionObserver);

    // Loads the `IntersectionObserver` polyfill asynchronously on browsers that don't support it.
    if (canUseDOM && typeof window.IntersectionObserver === 'undefined') {
        import('intersection-observer').then(() => {
            setBrowserSupportIntersectionObserver(true);
        });
    }

    // If `forceEarlyRender` is truthy, bypass lazy loading and load the image.
    const shouldLoadImage = shouldLoad || forceEarlyRender;

    // --------------------------------------------------------------------------------------------
    // Object Fit: polyfill and CSS styles
    // --------------------------------------------------------------------------------------------

    const objectFitProps: ObjectFitPropsType = {};

    // Checking for the use of the `height` prop is not enough since users can also change the
    // image height using `className`, or `style`.
    const shouldObjectFit = !!height || !!props.objectFit;

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

    useEffect(() => {
        // We polyfill `object-fit` for browsers that don't support it. We only do it if we're
        // using a `height` or `containerAspectRatio`. The `shouldLoadImage` variable ensures
        // that we don't try to polyfill the image before the `src` exists. This can happy
        // when we lazy-load.
        if (shouldObjectFit && containerRef && shouldLoadImage && shouldPolyfillObjectFit) {
            import('object-fit-images').then(({ default: ObjectFitImages }) => {
                ObjectFitImages(containerRef.querySelector('img'));
            });
        }
    }, [shouldObjectFit, containerRef, shouldLoadImage, shouldPolyfillObjectFit]);

    if (shouldObjectFit) {
        objectFitProps.style = {
            objectFit,
            objectPosition,
        };

        if (!height) {
            // Add `height: 100%` as an inline style if the user wants to `objectFit` but hasn't
            // passed in the `height` prop. Almost always, this means that the user is setting the
            // height with CSS or an inline style. Since inline styles and `className` get added to
            // `picture`, not `img`, the `img` element would become taller than the picture,
            // preventing the `objectFit` from working. Adding `height: 100%` to the `img` in these
            // cases allows `objectFit` to work as well as it would if the `height` was provided as
            // a prop rather than through `style` or `className`.
            objectFitProps.style.height = '100%';
        }

        if (shouldPolyfillObjectFit) {
            // Weird, but this is how the polyfill knows what to do with the image in IE.
            objectFitProps.style.fontFamily = `"object-fit: ${objectFit}; object-position: ${objectPosition}"`;
        }
    }

    // --------------------------------------------------------------------------------------------
    // Image Aspect Ratio used for image placeholder
    // --------------------------------------------------------------------------------------------

    const aspectRatioBoxProps: AspectRatioBoxPropsType = {};

    if (containerAspectRatio) {
        // This ensures that lazy-loaded images don't cause the browser scroll to jump once the
        // image has loaded. It uses the following technique:
        // https://css-tricks.com/aspect-ratio-boxes/
        const h = 100000;
        const w = h * containerAspectRatio;

        aspectRatioBoxProps.style = {
            paddingTop: `${(h / w) * 100}%`,
            overflow: 'hidden', // Prevents alt text from taking up space before `src` is populated
            height: 0,
        };
    }

    // --------------------------------------------------------------------------------------------
    // Sources and srcSets
    // --------------------------------------------------------------------------------------------

    // We separate `webp` from the `jpeg`/`png` so that we can apply the `imgTagSource` directly
    // onto the `img` tag. While this makes the code messier, it is needed to work around a bug in
    // Safari:
    // - https://bugs.webkit.org/show_bug.cgi?id=190031
    // - https://bugs.webkit.org/show_bug.cgi?id=177068

    const webpSource = find(sources, s => s.type === 'image/webp');
    const imgTagSource = find(sources, s => s.type === 'image/jpeg' || s.type === 'image/png');

    // --------------------------------------------------------------------------------------------
    // Image load and error states
    // --------------------------------------------------------------------------------------------

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // --------------------------------------------------------------------------------------------
    // Combining refs: This component has three refs that need to be combined into one. This
    // method of combining refs is suggested by `react-intersection-observer`:
    // https://github.com/thebuilder/react-intersection-observer#how-can-i-assign-multiple-refs-to-a-component
    // --------------------------------------------------------------------------------------------

    const setRefs = useCallback(
        node => {
            // Using a callback `ref` on this `picture` allows us to have multiple `ref`s on one
            // element.
            setContainerRef(node);

            // Check if the consumer sets a ref.
            if (typeof outerRef === 'function') {
                outerRef(node);
            }
        },
        [outerRef, setContainerRef],
    );

    return (
        <>
            <picture {...rest} className={classNames(styles.picture, className)} ref={setRefs}>
                {webpSource && (
                    <source
                        type={webpSource.type}
                        // Only add this attribute if lazyload has been triggered.
                        srcSet={shouldLoadImage ? webpSource.srcSet : undefined}
                        sizes={sizes}
                    />
                )}
                <img
                    // The order of `sizes`, `srcSet`, and `src` is important to work around a bug in
                    // Safari. Once the bug is fixed, we should simplify this by using `src` on the
                    // `img` tag and using `source` tags.
                    sizes={sizes}
                    // Only add this attribute if lazyload has been triggered.
                    srcSet={shouldLoadImage && imgTagSource ? imgTagSource.srcSet : undefined}
                    // Only add this attribute if lazyload has been triggered.
                    src={shouldLoadImage ? src : undefined}
                    // Height is generally only used for full-width hero images.
                    height={height}
                    alt={alt}
                    // Adds object fit values if specified and adds/removes placeholder padding.
                    // For SSR we want this to fire instantly.
                    style={{
                        ...(shouldObjectFit ? objectFitProps.style : {}),
                        ...(isLoaded || isError || forceEarlyRender
                            ? {}
                            : aspectRatioBoxProps.style),
                    }}
                    onLoad={(): void => {
                        setIsLoaded(true);
                    }}
                    onError={(): void => {
                        setIsError(true);
                    }}
                    // @ts-expect-error We expect an error because the attribute is non-standard and
                    // doesn't yet exist in the React types.
                    fetchpriority={forceEarlyRender ? 'high' : 'auto'}
                    className={classNames({
                        // Opacity to 0, prevents flash of alt text when `height` prop used
                        [styles.imageStart]: true,
                        // Opacity to 1 to reveal image or show alt text on error
                        // For SSR we want this to fire instantly.
                        [styles.imageEnd]: isLoaded || isError || forceEarlyRender,
                    })}
                />
            </picture>
            {!forceEarlyRender && (
                <noscript>
                    <img src={src} alt={alt} />
                </noscript>
            )}
        </>
    );
});

// Needed because of the `forwardRef`.
Image.displayName = 'Image';

export default Image;
