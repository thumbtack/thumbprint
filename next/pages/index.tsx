import React from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import Layout from '../components/layout/layout';
import getLayoutProps from '../utils/get-layout-props';

export default function Home({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return <Layout {...layoutProps}>Hello, World!</Layout>;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            layoutProps: getLayoutProps(),
        },
    };
};
