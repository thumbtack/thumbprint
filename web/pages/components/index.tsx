import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from '../../components/layout';

// eslint-disable-next-line react/prop-types
export default function Components({ implementations }): React.ReactNode {
    return (
        <Layout>
            <Head>
                <title>Components / Thumbprint</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Thumbprint Components</h1>
            </main>

            <ul>
                {implementations
                    .filter(i => i.values.Documentation)
                    .map(i => (
                        <li key={i.id}>
                            <Link
                                href={i.values.Documentation.replace(
                                    'https://thumbprint.design',
                                    '',
                                )}
                            >
                                <a>{i.name}</a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    let listRowsRes;

    try {
        listRowsRes = await fetch(
            // https://coda.io/developers/apis/v1#operation/listRows
            `https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/Implementations/rows?useColumnNames=true`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.CODA_API_TOKEN}`,
                },
            },
        );
    } catch (error) {
        throw Error(error);
    }

    const data = await listRowsRes.json();

    return {
        props: {
            implementations: data.items,
        },
    };
};
