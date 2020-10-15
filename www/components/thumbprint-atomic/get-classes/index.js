/**
 * Given the `props` and a `fileName` like `aspect-ratio`, return the array of classes that
 * correspond to that file. This function exists to simplify the Thumbprint Atomic MDX.
 */
const getClasses = (props, fileName) =>
    props.data.allThumbprintAtomicClasses.edges.find(({ node }) => node.atomicFileName === fileName)
        .node.atomicClasses;

export default getClasses;
