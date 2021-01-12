import React from 'react';
import type { AppProps } from 'next/app';
import Container from '../components/container';

function ThumbprintApp({ Component, pageProps, router }: AppProps): React.ReactElement {
    return (
        <Container pathname={router.pathname} activeSection="Overview">
            <Component {...pageProps} />
        </Container>
    );
}

export default ThumbprintApp;
