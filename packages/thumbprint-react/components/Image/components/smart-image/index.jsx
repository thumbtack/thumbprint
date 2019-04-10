import React from 'react';
import warning from 'warning';
import LazyImage from '../lazy-image/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import getImageServiceSrc from '../../utils/get-image-service-src';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';

// Possible States:
// • Lazy-loaded with Responsive and Aspect Ratio
// • Lazy-loaded with Responsive
// • Responsive
// • Lazy-loaded with Aspect Ratio
// • Lazy-loaded
// • Normal image from the image service

const SmartImage = ({ id, format, width, isLazyLoaded, alt, aspectRatio, ...rest }) => {
    // The image is responsive if no width is passed in.
    const isResponsive = !width;
    const srcSet = isResponsive ? getImageServiceSrcSet(id, [format]) : undefined;

    warning(
        aspectRatio && isLazyLoaded,
        'The `aspectRatio` prop should only be provided when `isLazyLoaded` is `true`. Aspect ratios are used by lazy-loaded images to create a placeholder "box", preventing the page from shifting when the image loads.',
    );

    if (isLazyLoaded && isResponsive) {
        return (
            <LazyImage srcSet={srcSet} aspectRatio={aspectRatio}>
                {({ src: placeholderSrc, srcSet: lazyLoadedSrcSet }) => (
                    <ResponsiveImage srcSet={lazyLoadedSrcSet}>
                        {({ ref, sizes, src, srcSet: innerSrcSet, className }) => (
                            <picture {...rest} ref={ref} className={className}>
                                {innerSrcSet.map(s => (
                                    <source
                                        type={s.type}
                                        sizes={sizes}
                                        srcSet={s.srcSet}
                                        key={s.type}
                                    />
                                ))}
                                <img src={src || placeholderSrc} sizes={sizes} alt={alt} />
                            </picture>
                        )}
                    </ResponsiveImage>
                )}
            </LazyImage>
        );
    }

    if (isResponsive) {
        return (
            <ResponsiveImage srcSet={srcSet}>
                {({ ref, sizes, src, srcSet: innerSrcSet, className }) => (
                    <picture {...rest} ref={ref} className={className}>
                        {innerSrcSet.map(s => (
                            <source type={s.type} sizes={sizes} srcSet={s.srcSet} key={s.type} />
                        ))}
                        <img src={src} sizes={sizes} alt={alt} />
                    </picture>
                )}
            </ResponsiveImage>
        );
    }

    if (isLazyLoaded) {
        return (
            <LazyImage {...rest} src={getImageServiceSrc({ id, format, width })}>
                {p => <img {...p} alt={alt} />}
            </LazyImage>
        );
    }

    return <img {...rest} src={getImageServiceSrc({ id, format, width })} alt={alt} />;
};

SmartImage.defaultProps = {
    isLazyLoaded: true,
    format: 'jpeg',
};

export default SmartImage;
