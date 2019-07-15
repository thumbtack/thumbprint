import React from 'react';
import TabNav, { TabNavItem } from '../../tab-nav';

const TokensTabNav = () => (
    <TabNav>
        <TabNavItem to="/tokens/scss/">SCSS</TabNavItem>
        <TabNavItem to="/tokens/javascript/">JavaScript</TabNavItem>
        <TabNavItem to="/tokens/ios/">iOS</TabNavItem>
    </TabNav>
);

export default TokensTabNav;
