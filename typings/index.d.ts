// Silence errors from libraries with no type defintions provided
declare module 'intersection-observer';
declare module 'object-fit-images';
// TODO(giles): remove once we add types to tp-icons
declare module '@thumbtack/thumbprint-icons';

declare module 'rotate-array' {
    export default function rotate<T>(array: Array<T>, offset: number): Array<T>;
}

declare module 'react-scroll-marker' {
    export function ScrollMarkerSection({
        id,
        children,
    }: {
        id: string;
        children: ({ id }: { id: string }) => JSX.Element;
    }): JSX.Element;
}

declare module 'gatsby-plugin-mdx/mdx-renderer';

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
