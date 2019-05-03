import { useState, useCallback } from 'react';

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
        // `webp` should go first since the order of `sources` determines what
        // the browser tries to load.
        formatsToLoad.unshift('webp');
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

const getNextValidWidth = containerWidth => {
    let i = 0;

    while (sizes[i] < containerWidth) {
        i += 1;
    }

    return sizes[i];
};

const ImageServiceProvider = ({ id, children, aspectRatio, format }) => {
    const sources = getImageServiceSources({ id, format, aspectRatio });
    const [width, setWidth] = useState(0);

    const ref = useCallback(node => {
        if (node !== null) {
            setWidth(node.clientWidth);
        }
    }, []);

    const widthToUseForSrc = width ? getNextValidWidth(width) : sizes[0];
    const src = getImageServiceSrc({ id, width: widthToUseForSrc, format, aspectRatio });

    return children({ sources, src, aspectRatio: validRatiosToFraction[aspectRatio], ref });
};

ImageServiceProvider.defaultProps = {
    format: 'jpeg',
};

export default ImageServiceProvider;
