/**
 * Given the `props` and a `fileName` like `aspect-ratio`, return the array of classes that
 * correspond to that file. This function exists to simplify the Thumbprint Atomic MDX.
 */
export default function getClasses(
    props: {
        data: {
            allThumbprintAtomicClasses: {
                edges: {
                    node: {
                        atomicFileName: string;
                        atomicClasses: string[];
                    };
                }[];
            };
        };
    },
    fileName: string,
): string[] | undefined {
    return props.data.allThumbprintAtomicClasses.edges.find(
        ({ node }) => node.atomicFileName === fileName,
    )?.node.atomicClasses;
}
