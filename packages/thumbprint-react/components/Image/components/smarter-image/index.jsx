import React, { useState, forwardRef, useLayoutEffect, useRef, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import warning from 'warning';
// import PropTypes from 'prop-types';

const LazyImage = ({ children, src: srcProp, sources: sourcesProp, onEnter, alt, ...rest }) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    const src = shouldLoadImage ? srcProp : src;

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
                    {/* TODO Should we make src prop required? */}
                    <img src={srcProp} alt={alt} />
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
    document &&
    document.documentElement &&
    document.documentElement.style &&
    'objectFit' in document.documentElement.style === true;

const SmarterImage = props => {
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

    const outerRef = useRef();

    warning(
        (!height && !aspectRatio) || (height && !aspectRatio) || (!height && aspectRatio),
        'You can pass either a `height` or `aspectRatio` to the `SmarterImage` component, but not both.',
    );

    useEffect(() => {
        setSizes(`${outerRef.current.clientWidth}px`);
    }, []);

    useLayoutEffect(
        () => {
            // We polyfill `object-fit` for browsers that don't support it. We only do it if we're
            // using a `height` or `aspectRatio`. The `hasImageStartedLoading` variable ensures
            // that we don't try to polyfill the image before the `src` exists. This can happy
            // when we lazy-load.
            if (shouldObjectFit && hasImageStartedLoading && shouldPolyfillObjectFit()) {
                // TODO move the object fit support outside and don't add the weird font family thing in non IE
                import('object-fit-images').then(({ default: ObjectFitImages }) =>
                    ObjectFitImages(outerRef.current.querySelector('img')),
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
        <div {...containerProps} ref={outerRef}>
            {picture}
        </div>
    );
};

// SmarterImage.propTypes = {
//     height: PropTypes.string,
//     aspectRatio: PropTypes.number,
//     objectFit: PropTypes.oneOf(['cover', 'contain']),
//     objectPosition: PropTypes.oneOf(['top', 'center', 'bottom', 'left', 'right']),
// };

SmarterImage.defaultProps = {
    sources: [],
    alt: '',
    objectFit: 'cover',
    objectPosition: 'center',
};

export default SmarterImage;
