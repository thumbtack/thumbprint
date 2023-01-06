export interface LayoutProps {
    activeSection: string;
    navigation: {
        title: string;
        href: string;
        groups: {
            title: string;
            href: string;
            sections?: {
                title: string;
                href: string;
            }[];
        }[][];
    }[];
}

export default function getLayoutProps(): LayoutProps {
    if (typeof window !== 'undefined') {
        throw new Error('`getLayoutProps` should only be called on the server side.');
    }

    return {
        activeSection: 'Overview',
        navigation: [
            {
                title: 'Overview',
                href: '/overview/about',
                groups: [
                    [
                        { title: 'About', href: '/overview/about' },
                        { title: 'Accessibility', href: '/overview/accessibility' },
                        { title: 'Contributing', href: '/overview/contributing' },
                        { title: 'Developers', href: '/overview/developers' },
                        { title: 'Product Design', href: '/overview/product-design' },
                    ],
                ],
            },
            {
                title: 'Components',
                href: '/components/overview',
                groups: [
                    [
                        { title: 'Overview', href: '/components/overview' },
                        { title: 'Global CSS', href: '/global-css/scss' },
                        { title: 'Mixins', href: '/mixins/scss' },
                    ],
                    [
                        { title: 'Action Sheet', href: '/components/action-sheet/ios' },
                        { title: 'Alert', href: '/components/alert/react' },
                    ],
                ],
            },
            {
                title: 'Tokens',
                href: '/tokens/scss',
                groups: [
                    [
                        {
                            title: 'SCSS',
                            href: '/tokens/scss',
                            sections: [
                                { title: 'Border Radius', href: '/tokens/scss#border-radius' },
                                { title: 'Breakpoint', href: '/tokens/scss#breakpoint' },
                            ],
                        },
                        { title: 'JavaScript', href: '/tokens/javascript' },
                        { title: 'iOS', href: '/components/ios' },
                        { title: 'Android', href: '/components/android' },
                    ],
                ],
            },
        ],
    };
}
