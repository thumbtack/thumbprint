import fs from 'node:fs';
import * as reactDocgen from 'react-docgen';
import doctrine from 'doctrine';
import getLayoutProps, { LayoutProps } from './get-layout-props';
import { ComponentPageProps, PlatformName } from './component-page-props';

interface GetComponentPageStaticPropsOptions {
    title: string;
    description: string;
    componentId: string;
    platformId: PlatformName;
}

interface GetComponentPageStaticPropsReturn {
    props: {
        layoutProps: LayoutProps;
        componentPageProps: ComponentPageProps;
    };
}

function isPlatformName(str: string): str is PlatformName {
    return ['usage', 'react', 'scss', 'ios', 'swiftui', 'android'].includes(str);
}

/**
 * This is a helper to reduce the boilerplate involved in our component documentation pages.
 */
export default function getComponentPageStaticProps({
    title,
    description,
    componentId,
    platformId,
}: GetComponentPageStaticPropsOptions): GetComponentPageStaticPropsReturn {
    let componentPlatforms = null;
    let packageTable: ComponentPageProps['packageTable'] = null;
    let componentDocgens = null;

    // Get more information for the page if it is a page for a component.
    componentPlatforms = fs
        .readdirSync(`pages/components/${componentId}`)
        .map(file => {
            // Removes `.tsx` from filename
            const filePlatformId = file.replace('.tsx', '');

            const displayName: Record<PlatformName, string> = {
                usage: 'Usage',
                react: 'React',
                scss: 'SCSS',
                ios: 'iOS (UIKit)',
                swiftui: 'iOS (SwiftUI)',
                android: 'Android',
            };

            if (!isPlatformName(filePlatformId) || !displayName[filePlatformId]) {
                throw new Error(`All platforms must be defined in the \`displayName\` object.`);
            }

            // Return the filename as `filePlatformId` as well as a display name for the platform.
            return { id: filePlatformId, name: displayName[filePlatformId] };
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
                throw new Error(`All platforms must be defined in the \`platformOrder\` object.`);
            }

            // Sorts the platforms the order that we want to display them.
            return platformOrder[a.id] - platformOrder[b.id];
        });

    if (componentPlatforms.length === 0) {
        throw new Error(`Something went wrong when finding platforms for ${componentId}}`);
    }

    if (platformId === 'react' || platformId === 'scss') {
        const packageJson = JSON.parse(
            fs.readFileSync(`../packages/thumbprint-${platformId}/package.json`, 'utf8'),
        );

        packageTable = {
            name: packageJson.name,
            version: packageJson.version,
            sourceDirectory: packageJson.homepage,
            ecosystem: 'web',
            // TODO
            // deprecated: false,
        };

        if (platformId === 'react') {
            const titleWithoutSpaces = title.replaceAll(' ', '');
            const pathToIndexFile = `../packages/thumbprint-react/components/${titleWithoutSpaces}/index.tsx`;
            const fileSource = fs.readFileSync(pathToIndexFile, 'utf8');

            componentDocgens = reactDocgen
                .parse(fileSource, reactDocgen.resolver.findAllExportedComponentDefinitions, null, {
                    filename: pathToIndexFile,
                    cwd: `../`,
                })
                .map(component => {
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
                });

            if (!componentDocgens) {
                throw new Error(`Something went wrong when parsing the React component ${title}}`);
            }

            packageTable.importStatement = `import { ${componentDocgens
                .map(c => c.displayName)
                .join(', ')} } from '${packageJson.name}';`;
        }
    }
    return {
        props: {
            layoutProps: getLayoutProps(),
            componentPageProps: {
                title,
                description,
                componentId,
                platformId,
                componentPlatforms,
                packageTable,
                componentDocgens,
            },
        },
    };
}
