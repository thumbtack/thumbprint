import React from 'react';
import PropTypes from 'prop-types';
import PlatformNav from './platform-nav';
import ComponentPackageTable from './component-package-table';
import Alert from '../../alert';

const UIKitDeprecatedCopy = () => {
    return (
        <Alert type="warning" title="iOS (UIKit) is being deprecated">
            Thumbprint on iOS is transitioning from UIKit to SwiftUI, and this documentation is no
            longer being supported. Please refer to the SwiftUI documentation when available.
        </Alert>
    );
};

const ComponentHeader = ({ data }) => {
    const { platformNav: platformNavQueryResults, packageTable, reactComponentProps } = data;

    const components = [];

    // Loop through the files for that component and combine all of the components into one array.
    if (reactComponentProps) {
        reactComponentProps.edges.forEach(file => {
            file.node.childrenComponentMetadata.forEach(component => {
                components.push(component);
            });
        });
    }

    return (
        <React.Fragment>
            <PlatformNav platformNavQueryResults={platformNavQueryResults} />
            {typeof window !== 'undefined' && window.location.pathname.endsWith('ios/') && (
                <UIKitDeprecatedCopy />
            )}
            {packageTable && (
                <ComponentPackageTable
                    components={components.length > 0 ? components : undefined}
                    name={packageTable.name}
                    version={packageTable.version}
                    homepage={packageTable.homepage}
                />
            )}
        </React.Fragment>
    );
};

ComponentHeader.propTypes = {
    data: PropTypes.shape({
        platformNav: PropTypes.shape({}).isRequired,
        packageTable: PropTypes.shape({}),
        reactComponentProps: PropTypes.shape({}),
    }).isRequired,
};

export default ComponentHeader;
