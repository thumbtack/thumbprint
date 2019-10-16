// Silence errors from libraries with no type defintions provided
declare module 'intersection-observer';
declare module 'object-fit-images';

declare module 'rotate-array' {
    function rotate<T>(array: Array<T>, offset: number): Array<T>;
    export default rotate;
}

type CSSModuleType = { [key: string]: string };

declare module '*.module.scss' {
    const classes: CSSModuleType;
    export default classes;
}
