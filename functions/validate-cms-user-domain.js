exports.handler = (event, context, callback) => {
    const { body } = event;

    const data = JSON.parse(body);

    console.log('***************************');
    console.log(typeof body, typeof data);
    console.log(data.user);

    console.log(data.user.app_metadata.provider);

    if (data.user.app_metadata.provider !== 'google') {
        return { statusCode: 403, body: 'Only registrations through Google are allowed.' };
    }

    const { email } = data.user;

    const emailDomain = email.split('@')[1];

    console.log(emailDomain);

    if (emailDomain !== 'thumbtack.com' || emailDomain !== 'ttc.thumbtack.com') {
        return {
            statusCode: 403,
            body: 'Only thumbtack.com and ttc.thumbtack.com accounts are allowed.',
        };
    }

    return {
        statusCode: 200,
    };
};
