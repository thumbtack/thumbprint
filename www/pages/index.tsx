import React from 'react';
import Head from 'next/head';
import Wrap from '../components/wrap';
import Featured from '../components/thumbprint-www/featured';
import Noticies from '../components/thumbprint-www/noticies';
import Hero from '../components/thumbprint-www/hero';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

const IndexPage = (): React.ReactElement => (
    <>
        <Head>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />

            <meta property="og:image" content="https://thumbprint.design/og-image.png" />
            <meta name="twitter:image" content="https://thumbprint.design/og-image.png" />
        </Head>
        <div>
            <Hero />
            <div className="pv5 m_pv6 bg-gray-200 bt bb b-gray-300">
                <Wrap hasPadding={false}>
                    <Featured />
                </Wrap>
            </div>
            <div className="pv5 m_pv6">
                <Wrap hasPadding={false}>
                    <Noticies />
                </Wrap>
            </div>
        </div>
    </>
);

export default IndexPage;
