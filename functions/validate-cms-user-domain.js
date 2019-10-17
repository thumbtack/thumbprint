exports.handler = (event, context, callback) => {
    console.log(event.body);

    callback(null, {
        statusCode: 200,
    });
};
