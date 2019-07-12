import React, { useState } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import useFocusTrap from './use-focus-trap';

const TAB_KEY = 9;
const A_KEY = 65;

jest.useFakeTimers();

function FocusableThing() {
    const [wrapperEl, setWrapperEl] = useState(null);
    useFocusTrap(wrapperEl, true);

    return (
        <div ref={el => setWrapperEl(el)}>
            <input type="text" />
        </div>
    );
}

describe('useFocusTrap', () => {
    it('does not trigger a re-render when typing in an input', () => {
        const container = mount(<FocusableThing />);

        act(() => {
            jest.runAllTimers();
        });
        container.update();

        const wrapper = container.find('div');
        const input = container.find('input');

        // When we mount, focus trap defaults to focusing the wrapper
        expect(wrapper.is(':focus')).toBe(true);
        expect(input.is(':focus')).toBe(false);

        // Press Tab to switch focus to the input
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: TAB_KEY }));
        });
        container.update();
        expect(input.is(':focus')).toBe(true);
        expect(input.getDOMNode().value).toBe('');

        // Type a letter
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: A_KEY }));
        });
        container.update();
        expect(input.is(':focus')).toBe(true);
        expect(input.getDOMNode().value).toBe('a');

        // Type another letter, make sure it didn't get cleared
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: A_KEY }));
        });
        container.update();
        expect(input.is(':focus')).toBe(true);
        expect(input.getDOMNode().value).toBe('aa');

        // Type another letter, make sure it didn't get cleared
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: A_KEY }));
        });
        container.update();
        expect(input.is(':focus')).toBe(true);
        expect(input.getDOMNode().value).toBe('aaa');
    });
});
