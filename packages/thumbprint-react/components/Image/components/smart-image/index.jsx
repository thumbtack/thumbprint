import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from '../lazy-image/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import Image from '../image/index.jsx';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';
// const validAspectRatios = {
//     '1x1': true,
//     '3x2': true,
//     '7x3': true,
//     '8x5': true,
// };

const SmartImage = ({ id, format, lazyLoad, objectFit, alt }) => {
    const shouldLazyLoad = !!lazyLoad;
    const srcSet = getImageServiceSrcSet(id, [format]);

    const aspectRatio = lazyLoad && lazyLoad.aspectRatio;

    if (shouldLazyLoad) {
        return (
            <LazyImage srcSet={srcSet} aspectRatio={aspectRatio}>
                {({ src: lazyImageSrc, srcSet: lazyImageSrcSet }, startedLoading) => (
                    <ResponsiveImage srcSet={lazyImageSrcSet}>
                        {({
                            ref,
                            sizes,
                            src: responsiveImageSrc,
                            srcSet: responsiveImageSrcSet,
                            style: responsiveImageStyle,
                        }) => (
                            <picture>
                                {responsiveImageSrcSet.map(s => (
                                    <source
                                        type={s.type}
                                        sizes={sizes}
                                        srcSet={s.srcSet}
                                        key={s.type}
                                    />
                                ))}
                                <Image
                                    src={startedLoading ? responsiveImageSrc : lazyImageSrc}
                                    sizes={sizes}
                                    alt={alt}
                                    ref={ref}
                                    style={responsiveImageStyle}
                                    objectFit={objectFit}
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
                    <Image src={src} sizes={sizes} alt={alt} style={style} objectFit={objectFit} />
                </picture>
            )}
        </ResponsiveImage>
    );
};

SmartImage.propTypes = {
    lazyLoad: PropTypes.shape({}),
    format: 'jpeg',
};

SmartImage.defaultProps = {
    lazyLoad: {},
    format: 'jpeg',
};

export default SmartImage;
