import getImageServiceSrc from './get-image-service-src';

const getImageServiceSrcSet = (id, formats) => {
    const o = {};

    formats.forEach(format => {
        o[format] = {
            120: getImageServiceSrc({ id, format, width: 120 }),
            320: getImageServiceSrc({ id, format, width: 320 }),
            400: getImageServiceSrc({ id, format, width: 400 }),
            640: getImageServiceSrc({ id, format, width: 640 }),
            768: getImageServiceSrc({ id, format, width: 768 }),
            1024: getImageServiceSrc({ id, format, width: 1024 }),
            1366: getImageServiceSrc({ id, format, width: 1366 }),
            1600: getImageServiceSrc({ id, format, width: 1600 }),
            1920: getImageServiceSrc({ id, format, width: 1920 }),
            2200: getImageServiceSrc({ id, format, width: 2200 }),
            2350: getImageServiceSrc({ id, format, width: 2350 }),
            2560: getImageServiceSrc({ id, format, width: 2560 }),
        };
    });

    return o;
};

export default getImageServiceSrcSet;
