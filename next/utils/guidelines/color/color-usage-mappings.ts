export interface ContentMapping {
    [key: string]: {
        title: string;
        type?: string;
        color?: string;
        suggestedUse?: string;
        description: string;
    };
}
const usageContentMappings: ContentMapping = {
    neutral: {
        title: 'Neutral',
        type: 'brand',
        color: '#2f3033',
        description:
            'Use to express default and less-opinionated UI elements such as background colors, icons, and text elements.',
    },
    primary: {
        title: 'Primary and info',
        type: 'brand',
        color: '#009fd9',
        description:
            'Use our brand color to tie in the most important user moments with how we express ourselves as an organization through our identity. You can also use these in info moments.',
    },
    guidance: {
        title: 'Guidance and visualizations',
        type: 'brand',
        color: '#5968e2',
        description:
            'Use to communicate guide posts such as onboarding moments and newly introduced product features.',
    },
    accent: {
        title: 'Accents',
        type: 'brand',
        color: '#8d56eb',
        description: 'Use as a subtle background for accent purposes. ',
    },
    success: {
        title: 'Success, finance and ratings',
        type: 'feedback',
        color: '#2db783',
        description:
            'Use for positive momentary moments, like income patterns, discounts, savings, and revenue growth.',
    },
    alert: {
        title: 'Alert',
        type: 'feedback',
        color: '#ff5a5f',
        description:
            'Use to convey a sense of urgency, to assist in preventing potential errors or security issues, and for negative monetary moments like revenue loss.',
    },
    caution: {
        title: 'Caution',
        type: 'feedback',
        color: '#febe14',
        description:
            "Use for moments that are trending in a negative direction, but don't require the user to take immediate action.",
    },
};

export const usageContent: ContentMapping = {
    background: {
        title: 'Background',
        description: 'Lowest level UI element where other UI element stack on top',
    },
    border: {
        title: 'Border',
        description: 'Stroke around container element',
    },
    text: {
        title: 'Text',
        description: 'Written language intended to clarity intention of element or interaction',
    },
    icon: {
        title: 'Icon',
        description: 'Visual support for UI element',
    },
};

export const emphasisContent: ContentMapping = {
    default: {
        title: 'Default',
        description: 'Approach with no variables introduced',
    },
    low: {
        title: 'Low',
        description: 'Visually subdued moments',
    },
    medium: {
        title: 'Medium',
        description: 'Increased level of importance in the UI',
    },
    strong: {
        title: 'Strong',
        description: 'High level of importance or impact',
    },
    inverse: {
        title: 'Inverse',
        description: 'Opposing end of default behavior',
    },
};

export const interactionContent: ContentMapping = {
    default: {
        title: 'Default',
        description: 'No user engagement has taken place',
    },
    hover: {
        title: 'Low',
        description: 'Cursor is placed above the element',
    },
    selected: {
        title: 'Medium',
        description: 'Enabled state after user has pressed',
    },
    visited: {
        title: 'Strong',
        description: 'State of link after user has viewed href in their browser',
    },
    disabled: {
        title: 'Inverse',
        description: 'User can no longer engage with the element',
    },
};

export const paletteColortMappings: ContentMapping = {
    neutral: {
        title: 'Neutral',
        type: 'brand',
        color: '#2f3033',
        suggestedUse: 'Backgrounds, text, iconography, shadows.',
        description:
            'Use to express default and less-opinionated UI elements such as background colors, icons, and text elements.',
    },
    blue: {
        title: 'Blue',
        type: 'brand',
        color: '#009fd9',
        suggestedUse:
            'Buttons, links, information, progress, promotional moments, brand moments, selected states.',
        description:
            'Use to drive focus and immediate attention to primary product moments. Overuse of this color is discouraged, so we can focus on the moments that matter.',
    },
    indigo: {
        title: 'Indigo',
        type: 'brand',
        color: '#5968e2',
        suggestedUse: 'Data visualizations, informational moments, user assistance.',
        description:
            'Use to guide users through onboarding, user assistance, map overlays, and data visualizations.',
    },
    purple: {
        title: 'Purple',
        type: 'brand',
        color: '#8d56eb',
        suggestedUse: 'Data visualizations, informational moments, user assistance.',
        description: 'Use as a subtle background for accent purposes.',
    },
    green: {
        title: 'Green',
        type: 'brand',
        color: '#ffffff',
        suggestedUse: 'Positive moments, savings, discounts, upward trends, growth, ratings.',
        description:
            'Use for ratings or to express growth, upward trends, financial moments (cost figures, savings, discounts, etc..), and positive feedback.',
    },
    red: {
        title: 'Red',
        type: 'feedback',
        color: '#2db783',
        suggestedUse:
            'Feedback moments, alerts, negative impact, cancellations, deletions and urgency.',
        description:
            'Use sparingly to not deter from important moments that require the user’s immediate attention.',
    },
    yellow: {
        title: 'Yellow',
        type: 'feedback',
        color: '#ff5a5f',
        suggestedUse:
            'Feedback with a subtle sense of caution. Commonly used in alerts and toasts.',
        description:
            'Use to bring additional energy to the ux and provide cautionary moments of user feedback.',
    },
};

export default usageContentMappings;
