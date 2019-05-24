import React from 'react';
import { mount } from 'enzyme';
import { ContentModifierLightningTiny } from '@thumbtack/thumbprint-icons';
import Pill from './index';

test('renders content that is passed in', () => {
    const wrapper = mount(<Pill>goose</Pill>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders icon', () => {
    const wrapper = mount(<Pill icon={<ContentModifierLightningTiny />}>goose</Pill>);
    expect(wrapper.find('svg')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('sets color theme', () => {
    const wrapper = mount(<Pill color="red">goose</Pill>);
    expect(wrapper.find('.root').hasClass('pillRed'));
    expect(wrapper).toMatchSnapshot();
});
