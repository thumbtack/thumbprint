import React from 'react';
import PropTypes from 'prop-types';
import PlatformNav from './platform-nav';
import ComponentPackageTable from './component-package-table';

const ComponentHeader = ({ data }) => {
    const { platformNav: platformNavQueryResults, packageTable, reactComponentProps } = data;

    return (
        <React.Fragment>
            <PlatformNav platformNavQueryResults={platformNavQueryResults} />

            {packageTable && (
                <ComponentPackageTable
                    components={
                        reactComponentProps
                            ? reactComponentProps.childrenComponentMetadata
                            : undefined
                    }
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
