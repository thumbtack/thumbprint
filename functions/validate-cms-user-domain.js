exports.handler = async event => {
    const { body } = event;

    const data = JSON.parse(body);

    const { email } = data.user;

    const emailDomain = email.split('@')[1];

    if (emailDomain !== 'thumbtack.com' || emailDomain !== 'ttc.thumbtack.com') {
        return {
            statusCode: 401,
            body: 'Only thumbtack.com and ttc.thumbtack.com email addresses are allowed.',
        };
    }

    return {
        statusCode: 200,
    };
};
