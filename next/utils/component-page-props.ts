import { SupportedEcosystems } from '../components/package-table/package-table';
import { ComponentDefinition } from '../components/thumbprint-components/props-table/component-definition';

export type PlatformName = 'usage' | 'react' | 'scss' | 'ios' | 'swiftui' | 'android';

export interface ComponentPageProps {
    title: string;
    description: string;
    componentId: string;
    platformId: string;
    componentPlatforms: { id: PlatformName; name: string }[];
    packageTable: {
        name: string;
        version: string;
        sourceDirectory: string;
        ecosystem: SupportedEcosystems;
        // TODO
        // deprecated?: boolean;
        importStatement?: string;
    } | null;
    componentDocgens: ComponentDefinition[] | null;
}
