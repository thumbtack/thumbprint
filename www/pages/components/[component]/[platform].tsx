import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import { parse as reactDocgen, resolver as reactDocgenResolvers } from 'react-docgen';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { MDXRenderer } from '../../../components/mdx';
import Wrap from '../../../components/wrap';
import PackageTable from '../../../components/package-table';
import PageHeader from '../../../components/page-header';
import TabNav, { TabNavItem } from '../../../components/tab-nav';

interface ReactComponent {
    description: string;
    displayName: string;
    methods: unknown[];
    props: unknown[];
}

interface ComponentPlatformProps {
    component: string;
    platform: 'react' | 'scss' | 'ios' | 'android';
    reactComponents: ReactComponent[];
    reactPackage: {
        name: string;
        version: string;
    };
    mdxString: string;
    title: string;
    description?: string;
    allComponentPlatforms: Array<'react' | 'scss' | 'ios' | 'android'>;
}

const sortPlatforms = (platform: string): number => {
    const platformOrder = {
        usage: 1,
        react: 2,
        scss: 3,
        ios: 4,
        android: 5,
    };

    const order = platformOrder[platform];

    if (typeof order !== 'number') {
        throw Error(`Could not the order for platform "${platform}."`);
    }

    return order;
};

const getPlatformDisplayName = (platform: string): string => {
    const displayName = {
        usage: 'Usage',
        react: 'React',
        scss: 'SCSS',
        ios: 'iOS',
        android: 'Android',
    };

    const name = displayName[platform];

    if (typeof name !== 'string') {
        throw Error(`Can't get the platform display name for "${name}."`);
    }

    return name;
};

export default function ComponentPlatform({
    component,
    platform,
    reactComponents,
    reactPackage,
    mdxString,
    title,
    description,
    allComponentPlatforms,
}: ComponentPlatformProps): React.ReactNode {
    const [dynamicTitle, setDynamicTitle] = useState(title);
    const [dynamicDescription, setDynamicDescription] = useState(description);

    const MDXContent = dynamic(
        () =>
            import(`../../../component-mdx/${component}/${platform}.mdx`).then(mod => {
                // This might seem odd, but setting the title and description as state here (rather
                // than) relying on props allows Fast Refresh to work when metadata is updated.
                setDynamicTitle(mod.metadata.title);
                setDynamicDescription(mod.metadata.description);
                return mod;
            }),
        {
            // eslint-disable-next-line react/no-danger
            loading: () => <div dangerouslySetInnerHTML={{ __html: mdxString }} />,
        },
    );

    return (
        <div>
            <Wrap>
                <PageHeader
                    pageTitle={dynamicTitle}
                    metaTitle={`${dynamicTitle} (${getPlatformDisplayName(platform)})`}
                    description={dynamicDescription}
                />

                <TabNav>
                    {allComponentPlatforms
                        .sort((a, b) => sortPlatforms(a) - sortPlatforms(b))
                        .map(p => (
                            <TabNavItem to={`/components/${component}/${p}`} key={p}>
                                {getPlatformDisplayName(p)}
                            </TabNavItem>
                        ))}
                </TabNav>

                <PackageTable
                    version={reactPackage.version}
                    packageName={reactPackage.name}
                    sourceDirectory="fooo"
                    platform="web"
                    importStatement={`import { ${reactComponents
                        .map(c => c.displayName)
                        .join(', ')} } from '${reactPackage.name}';`}
                />

                <MDXRenderer>
                    <MDXContent />
                </MDXRenderer>
            </Wrap>

            {reactComponents.map(
                (c): React.ReactElement => (
                    <div key={c.displayName}>{c.displayName}</div>
                ),
            )}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { component: 'fab', platform: 'react' } }],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { component, platform } = params;

    // Get an array of the platforms that this component has documentation for.
    const allComponentPlatforms = fs
        .readdirSync(`./component-mdx/${component}`)
        .map(f => f.replace('.mdx', '').replace('.md', ''));

    let reactComponents = null;
    let reactPackageJson = null;

    if (platform === 'react') {
        const fileContents = fs.readFileSync(
            './../packages/thumbprint-react/components/Fab/index.tsx',
            'utf-8',
        );

        reactComponents = reactDocgen(
            fileContents,
            reactDocgenResolvers.findAllComponentDefinitions,
        );

        reactPackageJson = (await import(`../../../../packages/thumbprint-react/package.json`))
            .default;
    }

    const { default: MDXContent, metadata } = await import(
        `../../../component-mdx/${component}/${platform}.mdx`
    );

    const mdxString = ReactDOMServer.renderToStaticMarkup(
        <MDXRenderer>
            <MDXContent />
        </MDXRenderer>,
    );

    return {
        props: {
            component,
            platform,
            reactComponents,
            reactPackage: {
                name: reactPackageJson.name,
                version: reactPackageJson.version,
            },
            title: metadata.title,
            description: metadata.description,
            mdxString,
            allComponentPlatforms,
        },
    };
};
