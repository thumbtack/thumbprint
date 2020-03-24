import React from 'react';
import PlatformNav from './platform-nav';
import ComponentPackageTable from './component-package-table';

interface PropTypes {
    data: {
        platformNav: {
            edges: {
                node: {
                    path: string;
                };
            }[];
        };
        packageTable?: {
            name: string;
            version: string;
            homepage: string;
        };
        reactComponentProps?: {
            childrenComponentMetadata: {
                displayName: string;
            }[];
        };
    };
}

export default function ComponentHeader({ data }: PropTypes): JSX.Element {
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
}
