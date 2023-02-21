import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
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

            {/* Google Analytics: https://nextjs.org/docs/messages/next-script-for-ga#using-gtagjs */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=UA-6981433-9"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-6981433-9');
               `}
            </Script>

            <Component {...pageProps} />
        </>
    );
}
