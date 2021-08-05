import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });

const observerMap = new Map();
const instanceMap = new Map();

beforeAll(() => {
    // Stub `window.scroll` since Jest will fail otherwise. This may change in the future.
    global.scroll = () => true;

    // Mock `window.IntersectionObserver` using code from these two places:
    // https://github.com/thebuilder/react-intersection-observer/blob/e31086c713615f3cfbe60eaa13491adcee3d41c2/src/test-utils.ts#L83
    // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        value: jest.fn((cb, options) => {
            const instance = {
                thresholds: Array.isArray(options.threshold)
                    ? options.threshold
                    : [options.threshold],
                root: options.root,
                rootMargin: options.rootMargin,
                time: Date.now(),
                observe: jest.fn(element => {
                    instanceMap.set(element, instance);
                    observerMap.set(element, cb);
                }),
                unobserve: jest.fn(element => {
                    instanceMap.delete(element);
                    observerMap.delete(element);
                }),
                disconnect: jest.fn(),
            };
            return instance;
        }),
    });
});

afterEach(() => {
    window.IntersectionObserver.mockClear();
    instanceMap.clear();
    observerMap.clear();
});
