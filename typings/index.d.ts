// Silence errors from libraries with no type defintions provided
// TODO: add types to tokens and remove this line
declare module '@thumbtack/thumbprint-tokens';
declare module 'intersection-observer';
declare module 'object-fit-images';

type CSSModuleType = { [key: string]: string };

declare module '*.module.scss' {
    const classes: CSSModuleType;
    export default classes;
}
