import React from 'react';
import PackageTable from '../../package-table';

/**
 * Returns an JavaScript import statement for components (and subcomponents) within a package.
 */
const getImportStatement = ({
    components,
    packageName,
}: {
    components: { displayName: string }[];
    packageName: string;
}): string => `import { ${components.map(c => c.displayName).join(', ')} } from '${packageName}';`;

interface PropTypes {
    version: string;
    name: string;
    homepage: string;
    components?: Array<{ displayName: string }>;
}

export default function ComponentPackageTable({
    version,
    name,
    homepage,
    components,
}: PropTypes): JSX.Element {
    return (
        <PackageTable
            version={version}
            packageName={name}
            sourceDirectory={homepage}
            platform="web"
            importStatement={
                components
                    ? getImportStatement({
                          components,
                          packageName: name,
                      })
                    : undefined
            }
        />
    );
}
