import React from 'react';

import TabNav, { TabNavItem } from '../../tab-nav';

export default function TokensTabNav(): JSX.Element {
    return (
        <TabNav>
            <TabNavItem to="/tokens/scss/">SCSS</TabNavItem>
            <TabNavItem to="/tokens/javascript/">JavaScript</TabNavItem>
            <TabNavItem to="/tokens/ios/">iOS</TabNavItem>
            <TabNavItem to="/tokens/android/">Android</TabNavItem>
        </TabNav>
    );
}
