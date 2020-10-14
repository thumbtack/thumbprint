import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Title } from '@thumbtack/thumbprint-react/dist/es/index';

interface LayoutPropTypes {
    children: React.ReactNode;
}

const mdComponents = {
    h1: (props): React.ReactElement => <Title size={1} {...props} />,
    h2: (props): React.ReactElement => <Title size={2} {...props} />,
    h3: (props): React.ReactElement => <Title size={3} {...props} />,
};

export default function Layout({ children }: LayoutPropTypes): React.ReactElement {
    return <MDXProvider components={mdComponents}>{children}</MDXProvider>;
}
