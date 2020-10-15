import React from 'react';
import { Title } from '@thumbtack/thumbprint-react';
import Head from 'next/head';

interface PageHeaderPropTypes {
    title: string;
    metaTitle?: string;
    description?: string;
}

export default function PageHeader({
    title,
    metaTitle,
    description,
}: PageHeaderPropTypes): React.ReactElement {
    return (
        <header className="mb5">
            <Head>
                {metaTitle && <title>{metaTitle} / Thumbprint</title>}
                {metaTitle && <meta property="og:title" content={`${metaTitle} / Thumbprint`} />}
                {metaTitle && <meta name="twitter:title" content={`${metaTitle} / Thumbprint`} />}
                {description && <meta name="twitter:description" content={description} />}
                {description && <meta name="description" content={description} />}
                {description && <meta property="og:description" content={description} />}{' '}
            </Head>

            <Title headingLevel={1} size={1} className="flex justify-between items-baseline">
                {title}
            </Title>

            {description && (
                <p className="black-300 mt3" style={{ fontSize: '20px' }}>
                    {description}
                </p>
            )}
        </header>
    );
}
