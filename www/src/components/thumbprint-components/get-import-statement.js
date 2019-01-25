/**
 * Returns an JavaScript import statement for components (and subcomponents) within a package.
 */
const getPackageImportStatement = ({ platform, components, packageName }) => {
    if (platform !== 'react') {
        return null;
    }

    return `import { ${components.map(c => c.displayName).join(', ')} } from '${packageName}';`;
};

export default getPackageImportStatement;
