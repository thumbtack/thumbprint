import React from 'react';
import LazyImage from '../lazy-image/index.jsx';
import AspectRatio from '../aspect-ratio/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import getImageServiceSrc from '../../utils/get-image-service-src';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';

// Possible States:
// • Lazy-loaded with Responsive and Aspect Ratio
// • Lazy-loaded with Responsive
// • Responsive
// • Lazy-loaded with Aspect Ratio
// • Lazy-loaded

const SmartImage = ({ id, format, width, isLazyLoaded, alt, aspectRatio, ...rest }) => {
    // The image is responsive if no width is passed in.
    const isResponsive = !width;
    const srcSet = isResponsive ? getImageServiceSrcSet(id, [format]) : undefined;

    if (isLazyLoaded && isResponsive && aspectRatio) {
        return (
            <AspectRatio ratio={aspectRatio}>
                {({ childStyles }) => (
                    <LazyImage srcSet={srcSet}>
                        {(p, shouldLoadImage) => {
                            if (!shouldLoadImage) {
                                return null;
                            }

                            return (
                                <ResponsiveImage srcSet={srcSet}>
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
                                            <img
                                                src={src}
                                                sizes={sizes}
                                                alt={alt}
                                                style={childStyles}
                                            />
                                        </picture>
                                    )}
                                </ResponsiveImage>
                            );
                        }}
                    </LazyImage>
                )}
            </AspectRatio>
        );
    }

    if (isResponsive && isLazyLoaded) {
        return (
            <LazyImage srcSet={srcSet}>
                {(p, shouldLoadImage) => {
                    if (!shouldLoadImage) {
                        return null;
                    }

                    return (
                        <ResponsiveImage srcSet={srcSet}>
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
                                    <img src={src} sizes={sizes} alt={alt} />
                                </picture>
                            )}
                        </ResponsiveImage>
                    );
                }}
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

    if (isLazyLoaded && aspectRatio) {
        return (
            <AspectRatio>
                {({ childStyles }) => (
                    <LazyImage {...rest} src={getImageServiceSrc({ id, format, width })}>
                        {p => <img {...p} alt={alt} styles={childStyles} />}
                    </LazyImage>
                )}
            </AspectRatio>
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
