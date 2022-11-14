import React from 'react';
import PropTypes from 'prop-types';
import PlatformNav from './platform-nav';
import ComponentPackageTable from './component-package-table';

const UIKitDeprecatedCopy = () => {
    return (
        <div className="bg-red-100 pa3">
            <h3 className="tp-title-2 mb3">No longer maintained</h3>
            <div>
                The iOS team is transitioning from UIKit to SwiftUI backed views. To support that
                effort, the team is rebuilding Thumbprint from the ground up in SwiftUI (a project
                we are internally calling ThumbprintUI). Going forward, the "iOS (SwiftUI)"
                documentation should be considered the source of truth for what can be built on iOS.
            </div>
        </div>
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
