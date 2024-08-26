import { StaticImageData } from 'next/image';

interface Values {
    usage: string;
    theme: string;
    'light-hex': string;
    color: string;
    emphasis: string;
    interaction: string;
    description: string;
    family: string;
}

export interface Usage {
    browserLink: string;
    createdAt: string;
    href: string;
    id: string;
    index: number;
    name: string;
    type: string;
    updatedAt: string;
    values: Values;
}

interface ColorValues extends Values {
    level: string;
    'pill-color': string;
    javascript: string;
    ios: string;
    android: string;
    scss: string;
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
    key: string;
    values: ColorValues;
}

export interface Image {
    [key: string]: {
        src: StaticImageData;
        alt: string;
    };
}

export default Usage;
