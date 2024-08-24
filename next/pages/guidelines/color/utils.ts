import { StaticImageData } from 'next/image';

export interface Usage {
    browserLink: string;
    createdAt: string;
    href: string;
    id: string;
    index: number;
    name: string;
    type: string;
    updatedAt: string;
    values: {
        usage: string;
        // usage: string;
        theme: string;
        'light-hex': string;
        color: string;
        emphasis: string;
        interaction: string;
        description: string;
    };
}

export interface Color {
    browserLink: string;
    createdAt: string;
    href: string;
    id: string;
    index: number;
    name: string;
    type: string;
    updatedAt: string;
    values: {
        description: string;
        color: string;
        'light-hex': string;
        'pill-color': string;
        javascript: string;
        ios: string;
        android: string;
        scss: string;
    };
}

export interface Image {
    [key: string]: {
        src: StaticImageData;
        alt: string;
    };
}

export default Usage;
