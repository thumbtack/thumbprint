import React from 'react';

function ExampleBox({ children }: { children: React.ReactNode }): JSX.Element {
    return <div className="pa4 ba b-gray-300 mb4 tp-body-2 bg-gray-200 br3">{children}</div>;
}

export default ExampleBox;
