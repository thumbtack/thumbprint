import React from 'react';
import type { AppProps } from 'next/app';
import Container from '../components/container';

function ThumbprintApp({ Component, pageProps, router }: AppProps): React.ReactElement {
    return (
        <Container location={router} activeSection="Overview">
            <Component {...pageProps} />
        </Container>
    );
}

export default ThumbprintApp;
