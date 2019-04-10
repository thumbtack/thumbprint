const getImageServiceSrc = ({ id, format, width }) =>
    `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}/width/${width}.${format}`;

export default getImageServiceSrc;
