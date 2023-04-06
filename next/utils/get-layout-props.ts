export interface LayoutProps {
    navigation: {
        title: string;
        href: string;
        groups?: {
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
                            href: '/overview/content-design/voice-and-tone',
                            sections: [
                                {
                                    title: 'Voice and tone',
                                    href: '/overview/content-design/voice-and-tone',
                                },
                                {
                                    title: 'Inclusion and accessibility',
                                    href: '/overview/content-design/inclusion-and-accessibility',
                                },
                                {
                                    title: 'Grammar and mechanics',
                                    href: '/overview/content-design/grammar-and-mechanics',
                                },
                                {
                                    title: 'Surfaces and elements',
                                    href: '/overview/content-design/surfaces-and-elements',
                                },
                            ],
                        },
                    ],
                ],
            },
            {
                title: 'Guidelines',
                href: '/guidelines/aspect-ratio',
                groups: [
                    [
                        { title: 'Aspect ratio', href: '/guidelines/aspect-ratio' },
                        { title: 'Brand assets', href: '/guidelines/brand-assets' },
                        { title: 'Breakpoints', href: '/guidelines/breakpoints' },
                        { title: 'Color', href: '/guidelines/color' },
                        { title: 'Design tokens', href: '/guidelines/design-tokens' },
                        { title: 'Iconography', href: '/guidelines/iconography' },
                        { title: 'Loaders', href: '/guidelines/loaders' },
                        { title: 'Motion', href: '/guidelines/motion' },
                        { title: 'Spacers', href: '/guidelines/spacers' },
                        { title: 'Toolkits', href: '/guidelines/toolkits' },
                        { title: 'Truncation', href: '/guidelines/truncation' },
                        { title: 'Typography', href: '/guidelines/typography' },
                    ],
                ],
            },
            {
                title: 'Components',
                href: '/components/overview',
                groups: [
                    [
                        { title: 'Overview', href: '/components/overview' },
                        { title: 'Global CSS', href: '/components/global-css/scss' },
                        { title: 'Mixins', href: '/components/mixins/scss' },
                    ],
                    [
                        { title: 'Action Sheet', href: '/components/action-sheet/ios' },
                        { title: 'Alert', href: '/components/alert/react' },
                        { title: 'Alert Banner', href: '/components/alert-banner/usage' },
                        { title: 'Avatar', href: '/components/avatar/usage' },
                        { title: 'Button', href: '/components/button/usage' },
                        { title: 'Button Row', href: '/components/button-row/react' },
                        { title: 'Calendar', href: '/components/calendar/react' },
                        { title: 'Carousel', href: '/components/carousel/react' },
                        { title: 'Checkbox', href: '/components/checkbox/react' },
                        { title: 'Chip', href: '/components/chip/react' },
                        { title: 'Date Picker', href: '/components/date-picker/ios' },
                        { title: 'Dropdown', href: '/components/dropdown/react' },
                        { title: 'Fab', href: '/components/fab/react' },
                        { title: 'Font Face', href: '/components/font-face/scss' },
                        { title: 'Form Note', href: '/components/form-note/react' },
                        { title: 'Grid', href: '/components/grid/usage' },
                        { title: 'Horizontal Rule', href: '/components/horizontal-rule/usage' },
                        { title: 'Icon Button', href: '/components/icon-button/ios' },
                        { title: 'Image', href: '/components/image/react' },
                        { title: 'Input Row', href: '/components/input-row/react' },
                        { title: 'Label', href: '/components/label/react' },
                        { title: 'Link', href: '/components/link/react' },
                        { title: 'List', href: '/components/list/react' },
                        { title: 'Loader Dots', href: '/components/loader-dots/react' },
                        { title: 'Longread', href: '/components/longread/scss' },
                        { title: 'Modal', href: '/components/modal/usage' },
                        { title: 'Modal Base', href: '/components/modal-base/react' },
                        { title: 'Modal Curtain', href: '/components/modal-curtain/react' },
                        { title: 'Modal Standard', href: '/components/modal-standard/react' },
                        { title: 'Navigation Bar', href: '/components/navigation-bar/ios' },
                        { title: 'Partial Sheet', href: '/components/partial-sheet/ios' },
                        { title: 'Pill', href: '/components/pill/usage' },
                        { title: 'Popover', href: '/components/popover/usage' },
                        { title: 'Radio', href: '/components/radio/react' },
                        { title: 'Service Card', href: '/components/service-card/usage' },
                        { title: 'Shadow Card', href: '/components/shadow-card/ios' },
                        { title: 'Star Rating', href: '/components/star-rating/react' },
                        { title: 'Switch', href: '/components/switch/ios' },
                        { title: 'Text Area', href: '/components/text-area/react' },
                        { title: 'Text Input', href: '/components/text-input/react' },
                        { title: 'Toast', href: '/components/toast/ios' },
                        { title: 'Tooltip', href: '/components/tooltip/usage' },
                        { title: 'Type', href: '/components/type/react' },
                        { title: 'Wrap', href: '/components/wrap/usage' },
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
                        { title: 'Gap', href: '/atomic#section-gap' },
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
                                { title: 'Color', href: '/tokens/scss#section-color' },
                                {
                                    title: 'Corner Radius',
                                    href: '/tokens/scss#section-corner-radius',
                                },
                                { title: 'Duration', href: '/tokens/scss#section-duration' },
                                { title: 'Easing', href: '/tokens/scss#section-easing' },
                                { title: 'Font Family', href: '/tokens/scss#section-font-family' },
                                { title: 'Font Weight', href: '/tokens/scss#section-font-weight' },
                                { title: 'Font', href: '/tokens/scss#section-font' },
                                {
                                    title: 'Letter Spacing',
                                    href: '/tokens/scss#section-letter-spacing',
                                },
                                { title: 'Line Height', href: '/tokens/scss#section-line-height' },
                                { title: 'Shadow', href: '/tokens/scss#section-shadow' },
                                { title: 'Scrim', href: '/tokens/scss#section-scrim' },
                                { title: 'Space', href: '/tokens/scss#section-space' },
                                { title: 'Wrap', href: '/tokens/scss#section-wrap' },
                                { title: 'Z-Index', href: '/tokens/scss#section-z-index' },
                            ],
                        },
                        {
                            title: 'JavaScript',
                            href: '/tokens/javascript',
                            sections: [
                                {
                                    title: 'Border Radius',
                                    href: '/tokens/javascript#section-border-radius',
                                },
                                {
                                    title: 'Breakpoint',
                                    href: '/tokens/javascript#section-breakpoint',
                                },
                                { title: 'Color', href: '/tokens/javascript#section-color' },
                                {
                                    title: 'Corner Radius',
                                    href: '/tokens/javascript#section-corner-radius',
                                },
                                { title: 'Duration', href: '/tokens/javascript#section-duration' },
                                { title: 'Easing', href: '/tokens/javascript#section-easing' },
                                {
                                    title: 'Font Family',
                                    href: '/tokens/javascript#section-font-family',
                                },
                                {
                                    title: 'Font Weight',
                                    href: '/tokens/javascript#section-font-weight',
                                },
                                { title: 'Font', href: '/tokens/javascript#section-font' },
                                {
                                    title: 'Letter Spacing',
                                    href: '/tokens/javascript#section-letter-spacing',
                                },
                                {
                                    title: 'Line Height',
                                    href: '/tokens/javascript#section-line-height',
                                },
                                { title: 'Shadow', href: '/tokens/javascript#section-shadow' },
                                { title: 'Scrim', href: '/tokens/javascript#section-scrim' },
                                { title: 'Space', href: '/tokens/javascript#section-space' },
                                { title: 'Wrap', href: '/tokens/javascript#section-wrap' },
                                { title: 'Z-Index', href: '/tokens/javascript#section-z-index' },
                            ],
                        },
                        {
                            title: 'iOS',
                            href: '/tokens/ios',
                            sections: [
                                { title: 'Color', href: '/tokens/ios#section-color' },
                                {
                                    title: 'Corner Radius',
                                    href: '/tokens/ios#section-corner-radius',
                                },
                                { title: 'Duration', href: '/tokens/ios#section-duration' },
                                { title: 'Font Weight', href: '/tokens/ios#section-font-weight' },
                                { title: 'Font', href: '/tokens/ios#section-font' },
                                { title: 'Scrim', href: '/tokens/ios#section-scrim' },
                                { title: 'Space', href: '/tokens/ios#section-space' },
                            ],
                        },
                        {
                            title: 'Android',
                            href: '/tokens/android',
                            sections: [
                                { title: 'Color', href: '/tokens/android#section-color' },
                                {
                                    title: 'Corner Radius',
                                    href: '/tokens/android#section-corner-radius',
                                },
                                { title: 'Duration', href: '/tokens/android#section-duration' },
                                {
                                    title: 'Font Weight',
                                    href: '/tokens/android#section-font-weight',
                                },
                                { title: 'Font', href: '/tokens/android#section-font' },
                                {
                                    title: 'Letter Spacing',
                                    href: '/tokens/android#section-letter-spacing',
                                },
                                { title: 'Scrim', href: '/tokens/android#section-scrim' },
                                { title: 'Space', href: '/tokens/android#section-space' },
                            ],
                        },
                    ],
                ],
            },
            {
                title: 'Icons',
                href: '/icons',
            },
            {
                title: 'Updates',
                href: '/updates/notes',
                groups: [
                    [
                        {
                            title: 'Release Notes',
                            href: '/updates/notes',
                        },
                    ],
                ],
            },
            {
                title: 'Help',
                href: '/help',
            },
        ],
    };
}
