const getImageServiceSrc = ({ id, format, width, aspectRatio }) => {
    if (aspectRatio) {
        return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}/aspect/${aspectRatio}.${format}`;
    }

    return `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}.${format}`;
};

export default getImageServiceSrc;
