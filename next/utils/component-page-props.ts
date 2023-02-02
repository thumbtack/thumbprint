import { SupportedEcosystems } from '../components/package-table/package-table';
import { ComponentDefinition } from '../components/thumbprint-components/props-table/component-definition';

export interface ComponentPageProps {
    id: string;
    platformId: string;
    componentPlatforms: { id: string; name: string }[];
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
