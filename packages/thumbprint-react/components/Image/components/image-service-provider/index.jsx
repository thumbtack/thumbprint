import { useState, useCallback } from 'react';
import warning from 'warning';

const getImageServiceSrc = ({ id, format, width, aspectRatio }) => {
    if (aspectRatio) {
        return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}/aspect/${aspectRatio}.${format}`;
    }

    return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}.${format}`;
};

const sizes = [120, 320, 400, 640, 768, 1024, 1366, 1600, 1920, 2200, 2350, 2560];

/**
 * Used for converting developer provided aspect ratios into the format that
 * with the image service.
 */
const aspectRatioMap = {
    '1:1': '1-1',
    '3:2': '3-2',
    '7:3': '7-3',
    '8:5': '8-5',
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
    // If an `aspectRatio` is provided and it is not valid, don't render the
    // image and print a console error instead.
    if (aspectRatio && !aspectRatioMap[aspectRatio]) {
        const aspectRatioList = Object.keys(aspectRatioMap)
            .map(k => `• ${k}`)
            .join('\n');

        warning(
            false,
            `The provided \`aspectRatio\` ${aspectRatio} is not supported by the Image Service. Valid values are:\n\n${aspectRatioList}`,
        );

        return null;
    }

    const imageServiceAspectRatio = aspectRatioMap[aspectRatio];

    const sources = getImageServiceSources({
        id,
        format,
        aspectRatio: imageServiceAspectRatio,
    });

    // We track the width so that we can offer the correctly sized image in
    // browsers that don't support responsive images.
    const [width, setWidth] = useState(0);

    const ref = useCallback(node => {
        if (node !== null) {
            setWidth(node.clientWidth);
        }
    }, []);

    const widthToUseForSrc = width ? getNextValidWidth(width) : sizes[5];

    const src = getImageServiceSrc({
        id,
        width: widthToUseForSrc,
        format,
        aspectRatio: imageServiceAspectRatio,
    });

    return children({ sources, src, aspectRatio, ref });
};

ImageServiceProvider.defaultProps = {
    format: 'jpeg',
};

export default ImageServiceProvider;
