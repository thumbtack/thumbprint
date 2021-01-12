import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import PageHeader from '../../components/page-header';
import TokenSection from '../../components/thumbprint-tokens/token-section';
import Wrap from '../../components/wrap';

const tokenPlatforms = ['scss', 'javascript', 'ios', 'android'] as const;

interface Token {
    deprecated: boolean | null;
    format: 'color' | null;
    group: 'string' | null;
    platforms: {
        javascript: {
            value: string;
        };
        scss: {
            value: string;
            name: string;
            description: string | null;
        };
    };
}

interface TokenCategory {
    name: string;
    description: string | null;
    tokens: Token;
}

interface TokensProps {
    tokens: TokenCategory[];
    platform: typeof tokenPlatforms[number];
}

export default function Tokens({ tokens, platform }: TokensProps): JSX.Element {
    return (
        <Wrap>
            <PageHeader
                pageTitle="Tokens"
                metaTitle="Tokens"
                description="Design variables that power Thumbtack’s UI."
            />
            <div>
                {tokens.map(category => (
                    <TokenSection key={category.name} section={category} platform={platform} />
                ))}
            </div>
        </Wrap>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: tokenPlatforms.map(platform => ({ params: { platform } })),
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
            platform,
        },
    };
};
