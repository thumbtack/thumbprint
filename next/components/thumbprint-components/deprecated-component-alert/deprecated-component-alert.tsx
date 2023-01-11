import React from 'react';
import Alert from '../../alert/alert';

const DeprecatedComponentAlert = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <Alert type="warning" title="Deprecated">
        {children}
    </Alert>
);
export default DeprecatedComponentAlert;
