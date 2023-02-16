import fs from 'node:fs';
import type { GetStaticPropsContext } from 'next';
import * as reactDocgen from 'react-docgen';
import doctrine from 'doctrine';
import getLayoutProps, { LayoutProps } from './get-layout-props';
import { ComponentPageProps, PlatformName } from './component-page-props';
import { ComponentDefinition } from '../components/thumbprint-components/props-table/component-definition';

interface Metadata {
    title?: string;
    description?: string;
    component?: {
        id?: string;
        platformId?: string;
    };
}

function isPlatformName(str: string): str is PlatformName {
    return ['usage', 'react', 'scss', 'ios', 'swiftui', 'android'].includes(str);
}

export default function getStaticProps(
    ctx: GetStaticPropsContext,
    metadata?: Metadata,
): { props: { layoutProps: LayoutProps; componentPageProps?: ComponentPageProps } } {
    let componentPlatforms = null;
    let packageTable: ComponentPageProps['packageTable'] = null;
    let componentDocgens = null;

    // Get more information for the page if it is a page for a component.
    if (metadata?.component) {
        if (!metadata.component.platformId) {
            throw new Error('`metadata.component.platformId` is required.');
        }

        componentPlatforms = fs
            .readdirSync(`pages/components/${metadata.component.id}`)
            .map(file => {
                // Removes `.mdx` from filename
                const platformId = file.replace('.mdx', '');

                const displayName: Record<PlatformName, string> = {
                    usage: 'Usage',
                    react: 'React',
                    scss: 'SCSS',
                    ios: 'iOS (UIKit)',
                    swiftui: 'iOS (SwiftUI)',
                    android: 'Android',
                };

                if (!isPlatformName(platformId) || !displayName[platformId]) {
                    throw new Error(`All platforms must be defined in the \`displayName\` object.`);
                }

                // Return the filename as `platformId` as well as a display name for the platform.
                return { id: platformId, name: displayName[platformId] };
            })
            .sort((a, b) => {
                const platformOrder: Record<PlatformName, number> = {
                    usage: 1,
                    react: 2,
                    scss: 3,
                    ios: 4,
                    swiftui: 5,
                    android: 6,
                };

                if (!platformOrder[a.id] || !platformOrder[b.id]) {
                    throw new Error(
                        `All platforms must be defined in the \`platformOrder\` object.`,
                    );
                }

                // Sorts the platforms the order that we want to display them.
                return platformOrder[a.id] - platformOrder[b.id];
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
            };

            if (metadata.component.platformId === 'react') {
                const fileSource = fs.readFileSync(
                    `../packages/thumbprint-react/components/${metadata.title}/index.tsx`,
                    'utf8',
                );

                componentDocgens = reactDocgen
                    .parse(
                        fileSource,
                        reactDocgen.resolver.findAllExportedComponentDefinitions,
                        null,
                        {
                            filename: `../packages/thumbprint-react/components/${metadata.title}/index.tsx`,
                            cwd: `../`,
                        },
                    )
                    .map(
                        (component): ComponentDefinition => {
                            return {
                                ...component,
                                props: Object.keys(component.props).reduce((acc, propName) => {
                                    return {
                                        ...acc,
                                        [propName]: {
                                            ...component.props[propName],
                                            description: doctrine.parse(
                                                component.props[propName].description,
                                            ),
                                        },
                                    };
                                }, {}),
                            };
                        },
                    );

                if (!componentDocgens) {
                    throw new Error(
                        `Something went wrong when parsing the React component ${metadata.title}}`,
                    );
                }

                packageTable.importStatement = `import { ${componentDocgens
                    .map(c => c.displayName)
                    .join(', ')} } from '${packageJson.name}';`;
            }
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
                          componentPlatforms: componentPlatforms as ComponentPageProps['componentPlatforms'],
                          packageTable,
                          componentDocgens,
                      },
                  }
                : {}),
        },
    };
}
