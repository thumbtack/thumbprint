import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Wrap from '../../components/wrap';

export default function Components({ implementations }): React.ReactNode {
    return (
        <Wrap>
            <Head>
                <title>Components / Thumbprint</title>
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
        </Wrap>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const listRowsRes = await fetch(
        // https://coda.io/developers/apis/v1#operation/listRows
        `https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/Implementations/rows?useColumnNames=true`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CODA_API_TOKEN}`,
            },
        },
    );

    const data = listRowsRes.ok ? await listRowsRes.json() : null;
    const implementations = data ? data.items : [];

    return {
        props: {
            implementations,
        },
    };
};
