import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

beforeAll(() => {
    // Stub `window.scroll` since Jest will fail otherwise. This may change in the future.
    global.scroll = () => true;
});
