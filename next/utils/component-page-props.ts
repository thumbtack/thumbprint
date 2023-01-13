import { SupportedEcosystems } from '../components/package-table/package-table';
import { ReactDocgenComponent } from '../components/thumbprint-components/props-table/react-docgen-component';

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
        importStatement?: string;
    } | null;
    componentDocgens: ReactDocgenComponent[] | null;
}
