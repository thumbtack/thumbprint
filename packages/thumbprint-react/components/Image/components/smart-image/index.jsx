import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from '../lazy-image/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import Image from '../image/index.jsx';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';

const getImageServiceAspectRatio = aspectRatio => {
    const validRatios = {
        '1:1': true,
        '3:2': true,
        '7:3': true,
        '8:5': true,
    };

    return validRatios[aspectRatio] && aspectRatio.replace(':', '-');
};

const SmartImage = ({ id, format, lazyLoad, aspectRatio, objectFit, alt }) => {
    const shouldLazyLoad = !!lazyLoad;

    const srcSet = getImageServiceSrcSet(id, [format], getImageServiceAspectRatio(aspectRatio));

    if (shouldLazyLoad) {
        return (
            <LazyImage srcSet={srcSet} aspectRatio={aspectRatio}>
                {({ src: lazyImageSrc }, startedLoading) => (
                    <ResponsiveImage srcSet={startedLoading ? srcSet : {}}>
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
                <picture>
                    {innerSrcSet.map(s => (
                        <source type={s.type} sizes={sizes} srcSet={s.srcSet} key={s.type} />
                    ))}
                    <Image
                        src={src}
                        sizes={sizes}
                        alt={alt}
                        style={style}
                        objectFit={objectFit}
                        ref={ref}
                    />
                </picture>
            )}
        </ResponsiveImage>
    );
};

SmartImage.propTypes = {
    aspectRatio: PropTypes.string,
    lazyLoad: PropTypes.shape({}),
    format: PropTypes.oneOf(['jpeg', 'png', 'gif']),
};

SmartImage.defaultProps = {
    aspectRatio: undefined,
    lazyLoad: {},
    format: 'jpeg',
};

export default SmartImage;
