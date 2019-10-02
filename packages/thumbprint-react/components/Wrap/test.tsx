import React from 'react';
import { mount } from 'enzyme';
import Wrap from './index';

test('renders content that is passed in', () => {
    const wrapper = mount(<Wrap>goose</Wrap>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders content that is passed in with a bleed breakpoint', () => {
    const wrapper = mount(<Wrap bleedBelow="medium">goose</Wrap>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(<Wrap dataTest="Duck">goose</Wrap>);
    expect(wrapper.find('div[data-test="Duck"]')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});
