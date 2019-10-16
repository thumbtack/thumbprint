import React from 'react';
import { mount } from 'enzyme';
import getScrollParent from './get-scroll-parent';

test('defaults to `document.body`', () => {
    const wrapper = mount(
        <div>
            <p>goose</p>
        </div>,
    );
    expect(getScrollParent(wrapper.getDOMNode())).toBe(document.body);
});

test('looks for immediate parent with `overflow: scroll`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'scroll' }} data-test="parent">
                <div data-test="child">goose</div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test="child"]').getDOMNode();
    const parent = wrapper.find('[data-test="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('looks for grandparent with `overflow: scroll`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'scroll' }} data-test="parent">
                <div>
                    <div>
                        <p data-test="child">goose</p>
                    </div>
                </div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test="child"]').getDOMNode();
    const parent = wrapper.find('[data-test="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('looks for parents with `overflow: auto`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'auto' }} data-test="parent">
                <div data-test="child">goose</div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test="child"]').getDOMNode();
    const parent = wrapper.find('[data-test="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('looks for parents with `overflow-y: auto`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflowY: 'auto' }} data-test="parent">
                <div data-test="child">goose</div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test="child"]').getDOMNode();
    const parent = wrapper.find('[data-test="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('looks for parents with `overflow-x: auto`', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflowX: 'auto' }} data-test="parent">
                <div data-test="child">goose</div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test="child"]').getDOMNode();
    const parent = wrapper.find('[data-test="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});

test('finds parent and ignores grandparent nodes', () => {
    const wrapper = mount(
        <div>
            <div style={{ overflow: 'auto' }}>hi</div>
            <div style={{ overflow: 'auto' }}>
                <div style={{ overflow: 'auto' }} data-test="parent">
                    <div data-test="child">goose</div>
                </div>
            </div>
        </div>,
    );

    const child = wrapper.find('[data-test="child"]').getDOMNode();
    const parent = wrapper.find('[data-test="parent"]').getDOMNode();

    expect(getScrollParent(child)).toBe(parent);
});
