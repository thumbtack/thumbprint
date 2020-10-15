import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import { parse as reactDocgen, resolver as reactDocgenResolvers } from 'react-docgen';
import fs from 'fs';

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
}

export default function ComponentPlatform({
    component,
    platform,
    reactComponents,
}: ComponentPlatformProps): React.ReactNode {
    const MDXContent = dynamic(() => import(`../../../component-mdx/${component}/${platform}.mdx`));

    return (
        <div>
            <MDXContent />

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

    let reactComponents = null;

    if (platform === 'react') {
        const fileContents = fs.readFileSync(
            './../packages/thumbprint-react/components/Fab/index.tsx',
            'utf-8',
        );

        reactComponents = reactDocgen(
            fileContents,
            reactDocgenResolvers.findAllComponentDefinitions,
        );
    }

    return {
        props: {
            component,
            platform,
            reactComponents,
        },
    };
};
