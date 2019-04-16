import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from '../lazy-image/index.jsx';
import ResponsiveImage from '../responsive-image/index.jsx';
import Image from '../image/index.jsx';
import getImageServiceSrcSet from '../../utils/get-image-service-src-set';

const aspectRatioNumberToString = {
    [1 / 1]: '1-1',
    [3 / 2]: '3-2',
    [7 / 3]: '7-3',
    [8 / 5]: '8-5',
};

const aspectRatioStringToNumber = {
    '1-1': 1 / 1,
    '3-2': 3 / 2,
    '7-3': 7 / 3,
    '8-5': 8 / 5,
};

const SmartImage = ({ id, format, lazyLoad, aspectRatio, objectFit, alt }) => {
    const shouldLazyLoad = !!lazyLoad;

    let imageServiceRatio;
    let lazyImageRatio;

    if (typeof aspectRatio === 'string') {
        imageServiceRatio = aspectRatio;
        lazyImageRatio = aspectRatioStringToNumber[aspectRatio];
    } else if (aspectRatioNumberToString[aspectRatio]) {
        imageServiceRatio = aspectRatioNumberToString[aspectRatio];
        lazyImageRatio = aspectRatio;
    }

    const srcSet = getImageServiceSrcSet(id, [format], imageServiceRatio);

    if (shouldLazyLoad) {
        return (
            <LazyImage srcSet={srcSet} aspectRatio={lazyImageRatio}>
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
    aspectRatio: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['1-1', '3-2', '7-3', '8-5']),
    ]),
    lazyLoad: PropTypes.shape({}),
    format: 'jpeg',
};

SmartImage.defaultProps = {
    aspectRatio: undefined,
    lazyLoad: {},
    format: 'jpeg',
};

export default SmartImage;
