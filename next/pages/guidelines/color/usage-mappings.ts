export interface ContentMapping {
    [key: string]: {
        title: string;
        type?: string;
        color?: string;
        description: string;
    };
}
const usageContentMappings: ContentMapping = {
    neutral: {
        title: 'Neutral',
        type: 'brand',
        color: '#2f3033',
        description:
            'Express default and less-opinionated UI elements such as background colors, icons, and text elements.',
    },
    primary: {
        title: 'Primary & info',
        type: 'brand',
        color: '#009fd9',
        description:
            'Thumbtack brand color to tie in the most important user moments with how we express ourselves as an organization through our identity.',
    },
    guidance: {
        title: 'Guidance & visualizations',
        type: 'brand',
        color: '#5968e2',
        description:
            'Communicate guide posts such as onboarding moments and newly introduced product features.',
    },
    accent: {
        title: 'Accents',
        type: 'brand',
        color: '#8d56eb',
        description: 'Illustrations and pill signals.',
    },
    input: {
        title: 'Inputs',
        type: 'brand',
        color: '#ffffff',
        description: 'UPDATE THIS',
    },
    success: {
        title: 'Success, finance & ratings',
        type: 'feedback',
        color: '#2db783',
        description: 'Used to communicate positive and successful outcomes to the user.',
    },
    alert: {
        title: 'Alert',
        type: 'feedback',
        color: '#ff5a5f',
        description: 'Convey a sense of urgency and assist in preventing potential errors.',
    },
    caution: {
        title: 'Caution',
        type: 'feedback',
        color: '#febe14',
        description:
            'Use in moments that are trending in a negative direction, but doesn’t require the user to take immediate action.',
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

export default usageContentMappings;
