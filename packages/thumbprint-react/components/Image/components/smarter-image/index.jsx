// @TODO: How do `object-fit` and `object-position` map to `background-position` and `background-size`.
// @TODO: Should we do abs position technique like Gatsby does? Makes it easier to have placeholders.
import React, { useCallback, useState, forwardRef } from 'react';
import { Waypoint } from 'react-waypoint';

const LazyImage = ({ children, src: srcProp, sources: sourcesProp, aspectRatio, alt, ...rest }) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    // The calculated width (in pixels) just has to be taller than all monitors that visit
    // because it is used to capture our site.
    const height = 10000;
    const width = height * aspectRatio;

    let src; // TODO what happens if there's a desired src, no apsectratio and waypoint hasn't fired yet

    if (shouldLoadImage) {
        src = srcProp;
    } else if (aspectRatio) {
        src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
    }

    const sources = shouldLoadImage ? sourcesProp : [];

    return (
        <>
            <Waypoint
                onEnter={() => {
                    setShouldLoadImage(true);
                }}
                // Start loading slightly before the user scrolls to the image
                topOffset={-100}
                bottomOffset={-100}
            >
                {children({ src, sources, alt, ...rest })}
            </Waypoint>

            {srcProp && (
                <noscript>
                    {/* TODO Should we make src prop required? Lets always make it the largest one. */}
                    <img src={srcProp} alt={alt} />
                </noscript>
            )}
        </>
    );
};

const Picture = forwardRef((props, ref) => {
    const {
        src,
        sources,
        sizes,
        objectFit,
        objectPosition,
        alt,
        aspectRatio,
        style: styleProp,
        ...rest
    } = props;

    // Default to `true` so that server-side rendering renders the most common case. We're
    // only worried about IE 11 for `objectFit`.
    let supportsObjectFit = true;

    let img;

    if (document && document.documentElement) {
        supportsObjectFit = 'objectFit' in document.documentElement.style;
    }

    const aspectRatioStyles = aspectRatio
        ? {
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              height: '100%',
              width: '100%',
          }
        : {};

    if (src && objectFit && !supportsObjectFit) {
        const style = {
            ...styleProp,
            ...aspectRatioStyles,
            backgroundImage: `url("${src}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: objectFit,
            backgroundPosition: objectPosition,
        };
        img = <div {...rest} style={style} aria-label={alt} ref={ref} />;
    } else {
        const style = {
            ...styleProp,
            ...aspectRatioStyles,
            objectFit,
            objectPosition,
        };
        img = (
            <div {...rest}>
                <picture>
                    {sources.map(({ type, srcSet }) => (
                        <source type={type} srcSet={srcSet} key={type} sizes={sizes} />
                    ))}
                    <img src={src} alt={alt} style={style} ref={ref} />
                </picture>
            </div>
        );
    }

    if (aspectRatio) {
        const height = 100000;
        const width = height * aspectRatio;

        img = (
            <div
                style={{
                    height: 0,
                    position: 'relative',
                    paddingBottom: `${(height / width) * 100}%`,
                }}
            >
                {img}
            </div>
        );
    }

    return img;
});

const SmarterImage = props => {
    const {
        src,
        sources,
        aspectRatio, // @TODO rename to placeholder aspect ratio
        objectFit,
        objectPosition,
        style,
        disableLazyLoading,
        width,
        alt,
        ...rest
    } = props;
    const [sizes, setSizes] = useState('0px');

    const ref = useCallback(node => {
        if (node !== null) {
            setSizes(`${node.width}px`);
        }
    }, []);

    let picture;

    const pictureProps = {
        src,
        sources,
        style: { ...style, width: '100%', display: 'block' },
        sizes,
        alt,
        objectFit,
        objectPosition,
        ...rest,
    };

    if (disableLazyLoading) {
        picture = <Picture {...pictureProps} aspectRatio={aspectRatio} ref={ref} />;
    } else {
        picture = (
            <LazyImage {...pictureProps} aspectRatio={aspectRatio}>
                {lazyImageProps => (
                    <Picture {...lazyImageProps} aspectRatio={aspectRatio} ref={ref} />
                )}
            </LazyImage>
        );
    }

    return picture;
};

SmarterImage.propTypes = {
    crop: PropTypes.oneOfType(),
};

SmarterImage.defaultProps = {
    sources: [],
    alt: '',
    // This is the default for the `object-position` position. We set it explicitally because
    // `object-position` and `background-position` (used for IE 11) have different default
    // values. This normalizes the default values.
    objectPosition: '50% 50%',
};

export default SmarterImage;
