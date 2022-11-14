import React from 'react';
import PropTypes from 'prop-types';
import PlatformNav from './platform-nav';
import ComponentPackageTable from './component-package-table';
import Alert from '../../alert';

const UIKitDeprecatedCopy = () => {
    return (
        <Alert type="warning" title="UIKit based Thumbprint is no longer being developed">
            As the iOS team is transitions from UIKit to SwiftUI backed view code, we are rebuilding
            Thumbprint from the ground up with SwiftUI – a project we are calling
            &ldquo;ThumbprintUI&rdquo;. Where it exists, the &ldquo;iOS (SwiftUI)&rdquo;
            documentation should be considered the source of truth for what can be built on iOS.
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
            {window.location.pathname.endsWith('ios/') && UIKitDeprecatedCopy()}
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
