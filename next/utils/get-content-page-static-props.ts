import getLayoutProps, { LayoutProps } from './get-layout-props';

/**
 * This is a helper to reduce the boilerplate involved in our content pages such as
 * `/overview/about` and `/guide/product/aspect-ratio`.
 */
export default function getContentPageStaticProps(): { props: { layoutProps: LayoutProps } } {
    return {
        props: { layoutProps: getLayoutProps() },
    };
}
