export interface LayoutProps {
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
                        {
                            title: 'Content Design',
                            href: '/overview/content-design/voice-and-tone/',
                            sections: [
                                {
                                    title: 'Voice and tone',
                                    href: '/overview/content-design/voice-and-tone/',
                                },
                                {
                                    title: 'Inclusion and accessibility',
                                    href: '/overview/content-design/inclusion-and-accessibility/',
                                },
                                {
                                    title: 'Grammar and mechanics',
                                    href: '/overview/content-design/grammar-and-mechanics/',
                                },
                                {
                                    title: 'Surfaces and elements',
                                    href: '/overview/content-design/surfaces-and-elements/',
                                },
                            ],
                        },
                    ],
                ],
            },
            {
                title: 'Guidelines',
                href: '/guide/product/aspect-ratio',
                groups: [
                    [
                        { title: 'Aspect ratio', href: '/guide/product/aspect-ratio' },
                        { title: 'Brand assets', href: '/guide/product/brand-assets' },
                        { title: 'Breakpoints', href: '/guide/product/breakpoints' },
                        { title: 'Color', href: '/guide/product/color' },
                        { title: 'Design tokens', href: '/guide/product/design-tokens' },
                        { title: 'Iconography', href: '/guide/product/iconography' },
                        { title: 'Loaders', href: '/guide/product/loaders' },
                        { title: 'Motion', href: '/guide/product/motion' },
                        { title: 'Spacers', href: '/guide/product/spacers' },
                        { title: 'Toolkits', href: '/guide/product/toolkits' },
                        { title: 'Truncation', href: '/guide/product/truncation' },
                        { title: 'Typography', href: '/guide/product/typography' },
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
                        { title: 'Avatar', href: '/components/avatar/usage' },
                    ],
                ],
            },
            {
                title: 'Atomic',
                href: '/atomic',
                groups: [
                    [{ title: 'Usage', href: '/atomic/usage' }],
                    [
                        { title: 'Aspect Ratio', href: '/atomic#section-aspect-ratio' },
                        {
                            title: 'Background Position',
                            href: '/atomic#section-background-position',
                        },
                        { title: 'Background Size', href: '/atomic#section-background-size' },
                        { title: 'Border', href: '/atomic#section-border' },
                        { title: 'Border Color', href: '/atomic#section-border-color' },
                        { title: 'Border Radius', href: '/atomic#section-border-radius' },
                        { title: 'Border Style', href: '/atomic#section-border-style' },
                        { title: 'Border Width', href: '/atomic#section-border-width' },
                        { title: 'Box Shadow', href: '/atomic#section-box-shadow' },
                        { title: 'Color', href: '/atomic#section-color' },
                        { title: 'Coordinates', href: '/atomic#section-coordinates' },
                        { title: 'Cursor', href: '/atomic#section-cursor' },
                        { title: 'Display', href: '/atomic#section-display' },
                        { title: 'Flexbox', href: '/atomic#section-flexbox' },
                        { title: 'Font Weight', href: '/atomic#section-font-weight' },
                        { title: 'Grid', href: '/atomic#section-grid' },
                        { title: 'Height', href: '/atomic#section-height' },
                        { title: 'Margin', href: '/atomic#section-margin' },
                        { title: 'Max Width', href: '/atomic#section-max-width' },
                        { title: 'Overflow', href: '/atomic#section-overflow' },
                        { title: 'Padding', href: '/atomic#section-padding' },
                        { title: 'Position', href: '/atomic#section-position' },
                        { title: 'Text Align', href: '/atomic#section-text-align' },
                        { title: 'Text Decoration', href: '/atomic#section-text-decoration' },
                        { title: 'Text Transform', href: '/atomic#section-text-transform' },
                        { title: 'Truncate', href: '/atomic#section-truncate' },
                        { title: 'Vertical Align', href: '/atomic#section-vertical-align' },
                        { title: 'Visually Hidden', href: '/atomic#section-visually-hidden' },
                        { title: 'White Space', href: '/atomic#section-white-space' },
                        { title: 'Width', href: '/atomic#section-width' },
                        { title: 'Word Break', href: '/atomic#section-word-break' },
                        { title: 'Z-Index', href: '/atomic#section-z-index' },
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
                                {
                                    title: 'Border Radius',
                                    href: '/tokens/scss#section-border-radius',
                                },
                                { title: 'Breakpoint', href: '/tokens/scss#section-breakpoint' },
                            ],
                        },
                        { title: 'JavaScript', href: '/tokens/javascript' },
                        { title: 'iOS', href: '/tokens/ios' },
                        { title: 'Android', href: '/tokens/android' },
                    ],
                ],
            },
        ],
    };
}
