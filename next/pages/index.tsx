import React from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import Layout from '../components/layout/layout';
import Wrap from '../components/wrap/wrap';
import Featured from '../components/thumbprint-www/featured';
import Notices from '../components/thumbprint-www/notices';
import Hero from '../components/thumbprint-www/hero';
import getLayoutProps from '../utils/get-layout-props';

export default function Home({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return (
        <Layout {...layoutProps}>
            <div>
                <Hero />
                <div className="pv5 m_pv6 bg-gray-200 bt bb b-gray-300">
                    <Wrap hasPadding={false}>
                        <Featured />
                    </Wrap>
                </div>
                <div className="pv5 m_pv6">
                    <Wrap hasPadding={false}>
                        <Notices />
                    </Wrap>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            layoutProps: getLayoutProps(),
        },
    };
};
