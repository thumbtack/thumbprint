// Silence errors from libraries with no type defintions provided
declare module 'intersection-observer';
declare module 'object-fit-images';
// TODO(giles): remove once we add types to tp-icons
declare module '@thumbtack/thumbprint-icons';

declare module 'rotate-array' {
    function rotate<T>(array: Array<T>, offset: number): Array<T>;
    export default rotate;
}

type CSSModuleType = { [key: string]: string };

declare module '*.module.scss' {
    const classes: CSSModuleType;
    export default classes;
}
