// Define types of third-party libraries that do not include their own types, and also don't have
// types available via DefinitelyTyped.

// TODO(giles): provide types for these two libraries
declare module 'intersection-observer';
declare module 'object-fit-images';

declare module 'rotate-array' {
    export default function rotate<T>(array: Array<T>, offset: number): Array<T>;
}

declare module 'react-scroll-marker' {
    export function ScrollMarkerSection({
        id,
        children,
    }: {
        id: string;
        children: (childProps: { id: string }) => JSX.Element;
    }): JSX.Element;

    export function ScrollMarkerContainer(props: { children: React.ReactNode }): JSX.Element;

    export function ScrollMarkerLink(props: {
        id: string;
        children: (childProps: { isActive: boolean; onClick: () => void }) => JSX.Element;
    }): JSX.Element;
}

declare module 'gatsby-plugin-mdx/mdx-renderer' {
    export default function InternalMDXRenderer(props: { children: React.ReactNode }): JSX.Element;
}

// The only types for this module on DefinitelyTyped are for an old version, so we provide our own
// types here.
declare module 'react-copy-to-clipboard' {
    export function CopyToClipboard(props: {
        text: React.ReactNode;
        className: string;
        children: React.ReactNode;
    }): JSX.Element;
}

declare module 'clickable-box';

declare module 'react-outside-click-handler';

declare module 'mousetrap';

declare module 'gonzales-pe';

// An SCSS module returns a map from string => string when imported.
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    const component: string;
    export default component;
}

declare module '*.png' {
    const url: string;
    export default url;
}
