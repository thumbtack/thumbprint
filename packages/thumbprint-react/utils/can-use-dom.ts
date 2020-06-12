// This returns `true` if the code is being run client-side. This should not be used if the
// rendered DOM needs to be different. In those cases, use state and `useEffect` to detect if the
// code is run client-side.
// - Code from StackOverflow: https://stackoverflow.com/a/32598826/316602
// - Using state to determine if client: https://reactjs.org/docs/react-dom.html#hydrate
const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export default canUseDOM;
