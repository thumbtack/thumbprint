import React from 'react';
import LazyImage from '../lazy-image/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import getImageServiceSrc from '../../utils/get-image-service-src';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';

const SmartImage = ({ id, format, width, lazyLoad, alt }) => {
    // The image is responsive if no width is passed in.
    const isResponsive = !width;
    const shouldLazyLoad = !!lazyLoad;
    const srcSet = isResponsive ? getImageServiceSrcSet(id, [format]) : undefined;

    const aspectRatio = lazyLoad && lazyLoad.aspectRatio;

    if (shouldLazyLoad && isResponsive) {
        return (
            <LazyImage srcSet={srcSet} aspectRatio={aspectRatio}>
                {({ src: lazyImageSrc, srcSet: lazyImageSrcSet }) => (
                    <ResponsiveImage srcSet={lazyImageSrcSet}>
                        {({ ref, sizes, src, srcSet: responsiveImageSrcSet, style }) => (
                            <picture ref={ref} style={style}>
                                {responsiveImageSrcSet.map(s => (
                                    <source
                                        type={s.type}
                                        sizes={sizes}
                                        srcSet={s.srcSet}
                                        key={s.type}
                                    />
                                ))}
                                <img src={src || lazyImageSrc} sizes={sizes} alt={alt} />
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
                {({ ref, sizes, src, srcSet: innerSrcSet, style }) => (
                    <picture ref={ref} style={style}>
                        {innerSrcSet.map(s => (
                            <source type={s.type} sizes={sizes} srcSet={s.srcSet} key={s.type} />
                        ))}
                        <img src={src} sizes={sizes} alt={alt} />
                    </picture>
                )}
            </ResponsiveImage>
        );
    }

    if (shouldLazyLoad) {
        return (
            <LazyImage src={getImageServiceSrc({ id, format, width })}>
                {p => <img {...p} alt={alt} />}
            </LazyImage>
        );
    }

    return <img src={getImageServiceSrc({ id, format, width })} alt={alt} />;
};

SmartImage.defaultProps = {
    lazyLoad: {},
    format: 'jpeg',
};

export default SmartImage;
