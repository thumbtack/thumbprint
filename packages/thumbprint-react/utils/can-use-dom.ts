// https://stackoverflow.com/a/32598826/316602
const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export default canUseDOM;
