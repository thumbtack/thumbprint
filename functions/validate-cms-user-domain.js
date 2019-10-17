exports.handler = (event, context, callback) => {
    const { body } = event;

    console.log(body);
    console.log(body.user);

    console.log(body.user.app_metadata.provider);

    if (!body.user.app_metadata && !body.app_metadata.provider !== 'google') {
        return { statusCode: 403, body: 'Only registrations through Google are allowed.' };
    }

    const { email } = event.body.user;

    console.log(email);

    // const e = {
    //     event: 'validate',
    //     instance_id: '40cf2153-32f8-4514-9f03-f5cf1fb32fa0',
    //     user: {
    //         id: '32749ee5-b478-44f9-b8bb-a32e38cb90fb',
    //         aud: '',
    //         role: '',
    //         email: 'doconnor@thumbtack.com',
    //         app_metadata: { provider: 'google' },
    //         user_metadata: {
    //             avatar_url:
    //                 'https://lh3.googleusercontent.com/a-/AAuE7mAn-E_RckU3vHfgYS2TZsvTBFHIYcK-zS6Bd95QZA',
    //             full_name: "Daniel O'Connor",
    //         },
    //         created_at: '2019-10-17T19:27:30.301399068Z',
    //         updated_at: '2019-10-17T19:27:30.303751667Z',
    //     },
    // };

    return {
        statusCode: 200,
    };
};
