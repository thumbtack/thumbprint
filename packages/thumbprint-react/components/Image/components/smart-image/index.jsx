import React from 'react';
import LazyImage from '../lazy-image/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';

const SmartImage = ({ id, format, lazyLoad, alt }) => {
    // The image is responsive if no width is passed in.
    const shouldLazyLoad = !!lazyLoad;
    const srcSet = getImageServiceSrcSet(id, [format]);

    const aspectRatio = lazyLoad && lazyLoad.aspectRatio;

    if (shouldLazyLoad) {
        return (
            <LazyImage srcSet={srcSet} aspectRatio={aspectRatio}>
                {({ src: lazyImageSrc, srcSet: lazyImageSrcSet }, startedLoading) => (
                    <ResponsiveImage srcSet={lazyImageSrcSet}>
                        {({ ref, sizes, src, srcSet: responsiveImageSrcSet, style }) => (
                            <picture>
                                {responsiveImageSrcSet.map(s => (
                                    <source
                                        type={s.type}
                                        sizes={sizes}
                                        srcSet={s.srcSet}
                                        key={s.type}
                                    />
                                ))}
                                <img
                                    src={startedLoading ? src : lazyImageSrc}
                                    sizes={sizes}
                                    alt={alt}
                                    ref={ref}
                                    style={style}
                                />
                            </picture>
                        )}
                    </ResponsiveImage>
                )}
            </LazyImage>
        );
    }

    return (
        <ResponsiveImage srcSet={srcSet}>
            {({ ref, sizes, src, srcSet: innerSrcSet, style }) => (
                <picture ref={ref}>
                    {innerSrcSet.map(s => (
                        <source type={s.type} sizes={sizes} srcSet={s.srcSet} key={s.type} />
                    ))}
                    <img src={src} sizes={sizes} alt={alt} style={style} />
                </picture>
            )}
        </ResponsiveImage>
    );
};

SmartImage.propTypes = {
    lazyLoad: {},
    format: 'jpeg',
};

SmartImage.defaultProps = {
    lazyLoad: {},
    format: 'jpeg',
};

export default SmartImage;
