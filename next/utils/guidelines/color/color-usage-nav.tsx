import React from 'react';
import TabNav, { TabNavItem } from '../../../components/tab-nav/tab-nav';

interface TabProps {
    [key: string]: {
        name: string;
        path: string;
    };
}

const usageTabs: TabProps = {
    background: { name: 'Background', path: '/guidelines/color/usage/background' },
    text: { name: 'Text', path: '/guidelines/color/usage/text' },
    borders: { name: 'Borders', path: '/guidelines/color/usage/borders' },
    icons: { name: 'Icons', path: '/guidelines/color/usage/icons' },
};

const ColorUsageNav = ({ activeTab }: { activeTab: string }) => {
    return (
        <TabNav>
            {Object.keys(usageTabs).map(node => (
                <TabNavItem
                    href={usageTabs[node].path}
                    key={usageTabs[node].path}
                    isActive={activeTab === node}
                >
                    <div>{usageTabs[node].name}</div>
                </TabNavItem>
            ))}
        </TabNav>
    );
};

export default ColorUsageNav;
