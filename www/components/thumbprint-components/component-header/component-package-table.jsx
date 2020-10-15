import React from 'react';
import PropTypes from 'prop-types';
import PackageTable from '../../package-table';

/**
 * Returns an JavaScript import statement for components (and subcomponents) within a package.
 */
const getImportStatement = ({ components, packageName }) =>
    `import { ${components.map(c => c.displayName).join(', ')} } from '${packageName}';`;

const ComponentPackageTable = ({ version, name, homepage, components }) => (
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

ComponentPackageTable.propTypes = {
    version: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(PropTypes.shape({})),
};

ComponentPackageTable.defaultProps = {
    components: undefined,
};

export default ComponentPackageTable;
