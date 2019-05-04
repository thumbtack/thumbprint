import React from 'react';
import { BlockListItemLink } from '@thumbtack/thumbprint-react';
import { ScrollMarkerContainer } from 'react-scroll-marker';

const IndexPage = () => {
    return (
        <ScrollMarkerContainer>
            <BlockListItemLink href="https://example.com">hi</BlockListItemLink>
        </ScrollMarkerContainer>
    );
};

export default IndexPage;
