import React from 'react';
import { mount } from 'enzyme';
import Label from './index';

test('renders label text', () => {
    const wrapper = mount(<Label for="Duck">Goose</Label>);
    expect(wrapper.text()).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders label `for` attribute', () => {
    const wrapper = mount(<Label for="Goose">Foo</Label>);
    expect(wrapper.find('label').prop('htmlFor')).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders disabled label', () => {
    const wrapper = mount(
        <Label isDisabled for="foo">
            Bar
        </Label>,
    );
    expect(wrapper).toMatchSnapshot();
});

test('renders label with error', () => {
    const wrapper = mount(
        <Label hasError for="foo">
            Bar
        </Label>,
    );
    expect(wrapper).toMatchSnapshot();
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(<Label dataTest="Duck">Goose</Label>);
    expect(wrapper.find('label').prop('data-test')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});
