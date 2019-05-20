const request = require('request-promise');
const jimp = require('jimp');
const JSZip = require('jszip');
const imagemin = require('imagemin');
const imageminOptipng = require('imagemin-optipng');

const processImage = async (image, width) => {
    const resizedImage = await image
        .clone()
        .resize(width, jimp.AUTO)
        .getBufferAsync('image/png');

    return imagemin.buffer(resizedImage, { use: [imageminOptipng()] });
};

const sizes = [
    { name: 'drawable-ldpi', width: 188 },
    { name: 'drawable-mdpi', width: 250 },
    { name: 'drawable-hdpi', width: 375 },
    { name: 'drawable-xhdpi', width: 500 },
    { name: 'drawable-xxhdpi', width: 750 },
    { name: 'drawable-xxxhdpi', width: 1000 },
];

exports.handler = async event => {
    const { id } = event.queryStringParameters;

    if (!id) {
        throw new Error('You must provide an Image Service ID as a query parameter called `id`.');
    }

    const sourceImageURL = `https://d1vg1gqh4nkuns.cloudfront.net/i/${id}`;
    let sourceImageBuffer;

    try {
        sourceImageBuffer = await request({ url: sourceImageURL, encoding: null });
    } catch (error) {
        throw new Error(error);
    }

    const zip = new JSZip();
    const localImage = await jimp.read(sourceImageBuffer);

    // Resize and compress all images.
    const resizedImages = await Promise.all(
        sizes.map(({ width }) => processImage(localImage, width)),
    );

    const imagesFolder = zip.folder('images');

    resizedImages.forEach((image, index) => {
        imagesFolder.file(`${sizes[index].name}/${id}.png`, image);
    });

    const allImages = await zip.generateAsync({ type: 'base64' });

    return {
        statusCode: 200,
        body: allImages,
        isBase64Encoded: true,
    };
};
