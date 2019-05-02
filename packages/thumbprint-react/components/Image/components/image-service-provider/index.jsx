const getImageServiceSrc = ({ id, format, width, aspectRatio }) => {
    if (aspectRatio) {
        return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}/aspect/${aspectRatio}.${format}`;
    }

    return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}.${format}`;
};

const getImageServiceSources = (id, format, aspectRatio) => {
    const sources = [];
    const formatsToLoad = [format];

    if (format === 'jpeg') {
        // TODO confirm w/ if we want pngs to also include webp
        formatsToLoad.push('webp');
    }

    formatsToLoad.forEach(currentFormat => {
        const sizes = [120, 320, 400, 640, 768, 1024, 1366, 1600, 1920, 2200, 2350, 2560];

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
    const sources = getImageServiceSources(id, format, aspectRatio);
    return children({ sources });
};

ImageServiceProvider.defaultProps = {
    format: 'jpeg',
};

export default ImageServiceProvider;
