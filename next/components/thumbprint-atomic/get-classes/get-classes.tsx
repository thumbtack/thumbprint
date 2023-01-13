export interface CSSClass {
    media?: string;
    selectors: string[];
    declarations: string[];
}

export interface File {
    file: string;
    classes: CSSClass[];
}

/**
 * Given the `props` and a `fileName` like `aspect-ratio`, return the array of classes that
 * correspond to that file. This function exists to simplify the Thumbprint Atomic MDX.
 */
const getClasses = (data: File[], fileName: string): File => {
    const d = data.find(i => {
        return i.file.startsWith(fileName);
    });

    if (!d) {
        throw new Error(`getClasses failed on: ${fileName}`);
    }

    return d;
};

export default getClasses;
