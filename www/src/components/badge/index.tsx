import React from 'react';
import { Text } from '@thumbtack/thumbprint-react';

interface PropTypes {
    children: React.ReactNode;
    size?: 1 | 2 | 3;
}

export default function Badge({ size, children }: PropTypes): JSX.Element {
    return (
        <Text
            size={size}
            className="bg-black white b h2 w2 tc br-100 flex items-center justify-center"
        >
            {children}
        </Text>
    );
}
