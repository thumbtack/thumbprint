import React from 'react';

interface PropTypes {
    children: React.ReactNode;
}

export default function UsageImg({ children }: PropTypes): JSX.Element {
    return <div className="bg-gray-200 pa4 ba b-gray flex justify-center mb3">{children}</div>;
}
