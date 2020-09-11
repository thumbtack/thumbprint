import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@thumbtack/thumbprint-react';

export default function Home(): React.ReactNode {
    return (
        <div>
            <Head>
                <title>Thumbprint</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Button>Primary</Button>

                <h1>Welcome to Thumbprint</h1>
            </main>

            <ul>
                <li>
                    <Link href="/overview/about">
                        <a>About</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
