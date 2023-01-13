/**
 * Gets a display name of the active section from the current path. Some examples:
 *
 * - `/` returns `null`
 * - `/components/button/react` returns `Components`
 * - `/tokens/scss#colors` returns `Tokens`
 */
export default function getActiveSection(asPath: string): string | null {
    if (asPath === '/') {
        return null;
    }

    // Get the first part of the path after the first slash, removing any hash in the process.
    const [activeSection] = asPath.split('#')[0].split('/').slice(1);

    // Convert string to title case. `overview`, for example, becomes `Overview`.
    return activeSection
        .split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
