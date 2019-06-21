import React from 'react';
import { mount } from 'enzyme';
import Popover from './index';

// https://github.com/thumbtack/thumbprint/issues/72
// https://github.com/FezVrasta/popper.js/issues/478#issuecomment-341494703
jest.mock('popper.js', () => {
    const PopperJS = jest.requireActual('popper.js');

    class Popper {
        constructor() {
            return {
                destroy: () => {},
                scheduleUpdate: () => {},
            };
        }
    }

    Popper.placements = PopperJS.placements;

    return Popper;
});

test('renders content that is passed in', () => {
    const wrapper = mount(
        <Popover isOpen onCloseClick={() => {}} launcher={() => {}}>
            goose
        </Popover>,
    );
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});
