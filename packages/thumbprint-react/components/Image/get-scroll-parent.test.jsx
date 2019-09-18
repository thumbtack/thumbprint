import React from 'react';
import { mount } from 'enzyme';
import getScrollParent from './get-scroll-parent';

test('defaults to `document.body`', () => {
    const wrapper = mount(<div>goose</div>);
    expect(getScrollParent(wrapper.getDOMNode())).toBe(document.body);
});

test('looks for parents with `overflow: scroll`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'scroll' }} data-test-id="parent">
                <div data-test-id="child">goose</div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test-id="child"]').getDOMNode();
    const parent = wrapper.find('[data-test-id="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('looks for parents with `overflow: auto`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'auto' }} data-test-id="parent">
                <div data-test-id="child">goose</div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test-id="child"]').getDOMNode();
    const parent = wrapper.find('[data-test-id="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('finds parent and ignores grandparent nodes', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'auto' }}>hi</div>
            <div style={{ overflow: 'auto' }}>
                <div style={{ overflow: 'auto' }} data-test-id="parent">
                    <div data-test-id="child">goose</div>
                </div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test-id="child"]').getDOMNode();
    const parent = wrapper.find('[data-test-id="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});
