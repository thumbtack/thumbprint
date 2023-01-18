import fs from 'node:fs';
import type { GetStaticPropsContext } from 'next';
import getLayoutProps, { LayoutProps } from './get-layout-props';
import { SupportedEcosystems } from '../components/package-table/package-table';

interface Metadata {
    title?: string;
    description?: string;
    component?: {
        id?: string;
        platformId?: string;
    };
}

export interface ComponentPageProps {
    id: string;
    platformId: string;
    componentPlatforms: string[];
    packageTable: {
        name: string;
        version: string;
        sourceDirectory: string;
        ecosystem: SupportedEcosystems;
        // TODO
        // deprecated?: boolean;
        // importStatement?: string;
    } | null;
}

export default function getStaticProps(
    ctx: GetStaticPropsContext,
    metadata?: Metadata,
): { props: { layoutProps: LayoutProps; componentPageProps?: ComponentPageProps } } {
    let componentPlatforms = null;
    let packageTable: ComponentPageProps['packageTable'] = null;

    // Get more information for the page if it is a page for a component.
    if (metadata?.component) {
        if (!metadata.component.platformId) {
            throw new Error('`metadata.component.platformId` is required.');
        }

        componentPlatforms = fs
            .readdirSync(`pages/components/${metadata.component.id}`)
            .map(file => {
                // Remove `.mdx` from string
                return file.replace('.mdx', '');
            });

        if (componentPlatforms.length === 0) {
            throw new Error(
                `Something went wrong when finding platforms for ${metadata.component.id}}`,
            );
        }

        if (metadata.component.platformId === 'react' || metadata.component.platformId === 'scss') {
            const packageJson = JSON.parse(
                fs.readFileSync(
                    `../packages/thumbprint-${metadata.component.platformId}/package.json`,
                    'utf8',
                ),
            );

            packageTable = {
                name: packageJson.name,
                version: packageJson.version,
                sourceDirectory: packageJson.homepage,
                ecosystem: 'web',
                // TODO
                // deprecated: false,
                // importStatement: "import { View } from 'react-native';",
            };
        }
    }

    return {
        props: {
            layoutProps: getLayoutProps(),
            ...(metadata?.component
                ? {
                      componentPageProps: {
                          // TypeScript isn't able to figure out that we check above to ensure that
                          // these are all defined.
                          id: metadata.component.id as string,
                          platformId: metadata.component.platformId as string,
                          componentPlatforms: componentPlatforms as string[],
                          packageTable,
                      },
                  }
                : {}),
        },
    };
}
