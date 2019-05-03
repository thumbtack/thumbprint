const getImageServiceSrc = ({ id, format, width, aspectRatio }) => {
    if (aspectRatio) {
        return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}/aspect/${aspectRatio}.${format}`;
    }

    return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}.${format}`;
};

const sizes = [120, 320, 400, 640, 768, 1024, 1366, 1600, 1920, 2200, 2350, 2560];

const validRatiosToFraction = {
    '1-1': 1 / 1,
    '3-2': 3 / 2,
    '7-3': 7 / 3,
    '8-5': 8 / 5,
};

const getImageServiceSources = ({ id, format, aspectRatio }) => {
    const sources = [];
    const formatsToLoad = [format];

    if (format === 'jpeg') {
        // TODO confirm w/ if we want pngs to also include webp
        formatsToLoad.push('webp');
    }

    formatsToLoad.forEach(currentFormat => {
        sources.push({
            type: `image/${currentFormat}`,
            srcSet: sizes
                .map(
                    size =>
                        `${getImageServiceSrc({
                            id,
                            format: currentFormat,
                            width: size,
                            aspectRatio,
                        })} ${size}w`,
                )
                .join(','),
        });
    });

    return sources;
};

const ImageServiceProvider = ({ id, children, aspectRatio, format }) => {
    const sources = getImageServiceSources({ id, format, aspectRatio });

    // We use the largest size by default so that the `noscript` includes the highest resolution
    // image for Google to crawl. Users in browsers that support responsive images will always get
    // the correct size for their viewport and device pixel density.
    const largestSize = sizes[sizes.length - 1];
    const src = getImageServiceSrc({ id, width: largestSize, format, aspectRatio });

    return children({ sources, src, aspectRatio: validRatiosToFraction[aspectRatioProp] });
};

ImageServiceProvider.defaultProps = {
    format: 'jpeg',
};

export default ImageServiceProvider;
