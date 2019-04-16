import getImageServiceSrc from './get-image-service-src';

const getImageServiceSrcSet = (id, formats, aspectRatio) => {
    const o = {};

    if (formats.includes('jpeg') && !formats.includes('webp')) {
        formats.push('webp');
    }

    formats.forEach(format => {
        o[format] = {
            120: getImageServiceSrc({ id, format, width: 120, aspectRatio }),
            320: getImageServiceSrc({ id, format, width: 320, aspectRatio }),
            400: getImageServiceSrc({ id, format, width: 400, aspectRatio }),
            640: getImageServiceSrc({ id, format, width: 640, aspectRatio }),
            768: getImageServiceSrc({ id, format, width: 768, aspectRatio }),
            1024: getImageServiceSrc({ id, format, width: 1024, aspectRatio }),
            1366: getImageServiceSrc({ id, format, width: 1366, aspectRatio }),
            1600: getImageServiceSrc({ id, format, width: 1600, aspectRatio }),
            1920: getImageServiceSrc({ id, format, width: 1920, aspectRatio }),
            2200: getImageServiceSrc({ id, format, width: 2200, aspectRatio }),
            2350: getImageServiceSrc({ id, format, width: 2350, aspectRatio }),
            2560: getImageServiceSrc({ id, format, width: 2560, aspectRatio }),
        };
    });

    return o;
};

export default getImageServiceSrcSet;
