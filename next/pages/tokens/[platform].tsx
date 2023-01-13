import React from 'react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import TabNav, { TabNavItem } from '../../components/tab-nav/tab-nav';
import TokenSection, {
    TokenCategory,
} from '../../components/thumbprint-tokens/token-section/token-section';
import { ContentPage } from '../../components/mdx/mdx';
import getLayoutProps from '../../utils/get-layout-props';
import PackageTable, { SupportedEcosystems } from '../../components/package-table/package-table';

interface Platform {
    id: string;
    name: string;
    ecosystem: SupportedEcosystems;
    packageName: string;
    sourceDirectory: string;
    importStatement: string;
}

const platforms: Platform[] = [
    {
        id: 'scss',
        name: 'SCSS',
        ecosystem: 'web',
        packageName: '@thumbtack/thumbprint-tokens',
        sourceDirectory: 'https://github.com/thumbtack/thumbprint-tokens',
        importStatement: `@import '~@thumbtack/thumbprint-tokens/dist/scss/_index';`,
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        ecosystem: 'web',
        packageName: '@thumbtack/thumbprint-tokens',
        sourceDirectory: 'https://github.com/thumbtack/thumbprint-tokens',
        importStatement: `import * as tokens from '@thumbtack/thumbprint-tokens';`,
    },
    {
        id: 'ios',
        name: 'iOS',
        ecosystem: 'ios',
        packageName: 'ThumbprintTokens',
        sourceDirectory: 'https://github.com/thumbtack/thumbprint-tokens',
        importStatement: `import ThumbprintTokens`,
    },
    {
        id: 'android',
        name: 'Android',
        ecosystem: 'android',
        packageName: 'com.github.thumbtack.thumbprinttokens.R',
        sourceDirectory: 'https://github.com/thumbtack/thumbprint-tokens',
        importStatement: `import com.github.thumbtack.thumbprinttokens.R`,
    },
];

interface TokensResponse {
    data: {
        version: string;
        categories: TokenCategory[];
    };
}

export default function Tokens({
    tokens,
    currentPlatform,
    layoutProps,
    version,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return (
        <ContentPage
            title="Tokens"
            description="Design variables that power Thumbtack’s UI."
            layoutProps={layoutProps}
        >
            <TabNav>
                {platforms.map(p => (
                    <TabNavItem href={`/tokens/${p.id}`} isActive={p.id === currentPlatform.id}>
                        {p.name}
                    </TabNavItem>
                ))}
            </TabNav>

            <PackageTable
                version={version}
                packageName={currentPlatform.packageName}
                sourceDirectory={currentPlatform.sourceDirectory}
                ecosystem={currentPlatform.ecosystem}
                importStatement={currentPlatform.importStatement}
            />

            {tokens.map(category => {
                return (
                    <TokenSection
                        key={category.name}
                        section={category}
                        platform={currentPlatform.id}
                    />
                );
            })}
        </ContentPage>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: platforms.map(platform => ({ params: { platform: platform.id } })),
        fallback: false,
    };
};

export const getStaticProps = async ({ params }: { params: { platform: string } }) => {
    const { platform: platformParam } = params;

    const tokensRes = await fetch('https://thumbprint-tokens.netlify.app/', {
        body: JSON.stringify({
            query: `{
                version
                categories(platform: "${platformParam}") {
                    name
                    description
                    tokens {
                        platforms {
                            ${platformParam} {
                                name
                                value
                                description
                            }
                            javascript {
                                value
                            }
                        }
                        format
                        group
                        deprecated
                    }
                }
            }
        `,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    const { data } = (await tokensRes.json()) as TokensResponse;
    const currentPlatform = platforms.find(p => p.id === platformParam);

    if (!currentPlatform) {
        throw new Error(`Platform ${platformParam} not found`);
    }

    return {
        props: {
            layoutProps: getLayoutProps(),
            tokens: data.categories,
            currentPlatform,
            version: data.version,
        },
    };
};
