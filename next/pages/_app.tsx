import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@thumbtack/thumbprint-atomic';
import '@thumbtack/thumbprint-global-css';
import '@thumbtack/thumbprint-scss/type.css';
import '../styles/global.scss';

export default function Thumbprint({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Thumbprint</title>

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@thumbtackdesign" />
                <meta name="twitter:title" content="Thumbprint" />
                <meta property="og:title" content="Thumbprint" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
