import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/layout';

export default function Tokens({ tokens }): React.ReactNode {
    return (
        <Layout>
            <Head>
                <title>Tokens / Thumbprint</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Thumbprint Tokens</h1>
            </main>

            <ul>
                {tokens.map(category => (
                    <li key={category.name}>{category.name}</li>
                ))}
            </ul>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { platform: 'scss' } },
            { params: { platform: 'javascript' } },
            { params: { platform: 'ios' } },
            { params: { platform: 'android' } },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { platform } = params;
    let tokensRes;

    try {
        tokensRes = await fetch('https://thumbprint-tokens.netlify.app/', {
            body: `{"operationName":null,"variables":{},"query":"{\\n  version\\n  categories(platform: \\"${platform}\\") {\\n    name\\n    description\\n    tokens {\\n      platforms {\\n        ${platform} {\\n          name\\n          value\\n          description\\n        }\\n        javascript {\\n          value\\n        }\\n      }\\n      format\\n      group\\n      deprecated\\n    }\\n  }\\n}\\n"}`,
            method: 'POST',
        });
    } catch (error) {
        throw Error(error);
    }

    const { data } = await tokensRes.json();

    return {
        props: {
            tokens: data.categories,
        },
    };
};
