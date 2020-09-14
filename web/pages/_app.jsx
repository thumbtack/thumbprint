import React from 'react';
import '@thumbtack/thumbprint-atomic';
import '../styles/globals.css';

function ThumbprintApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default ThumbprintApp;
