/**
 * Given the `props` and a `fileName` like `aspect-ratio`, return the array of classes that
 * correspond to that file. This function exists to simplify the Thumbprint Atomic MDX.
 */
const getClasses = (data, fileName) =>
    data.find(i => {
        return i.file.startsWith(fileName);
    });

export default getClasses;
