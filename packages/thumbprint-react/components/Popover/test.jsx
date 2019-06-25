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

test('renders a popover', () => {
    const onCloseClick = jest.fn();
    const wrapper = mount(
        <Popover isOpen onCloseClick={onCloseClick} launcher={() => null}>
            Goose
        </Popover>,
    );

    expect(wrapper).toMatchSnapshot();
});

test('initially traps focus to the first focusable element', () => {
    jest.useFakeTimers();

    const onCloseClick = jest.fn();
    const wrapper = mount(
        <Popover isOpen onCloseClick={onCloseClick} launcher={() => null}>
            <button type="button" id="hi">
                Hi
            </button>
        </Popover>,
    );

    // Run setTimeouts() in <FocusTrap> to completion
    jest.runAllTimers();

    const button = wrapper.find('#hi');
    expect(button.is(':focus')).toBe(true);

    jest.useRealTimers();
});
