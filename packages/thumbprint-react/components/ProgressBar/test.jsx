import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgressBar from './index';

test('passes progress to base component', () => {
    const wrapper = shallow(<ProgressBar value={33} />);
    const width = wrapper.find('ProgressBarBase').prop('width');
    expect(width).toBe(33);
    expect(wrapper).toMatchSnapshot();
});

test('shows label when `shouldShowLabel` is true', () => {
    const wrapper = shallow(<ProgressBar shouldShowLabel />);
    const label = wrapper.find('.label');
    expect(label).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('shows label when `shouldShowLabel` is false', () => {
    const wrapper = shallow(<ProgressBar shouldShowLabel={false} />);
    const label = wrapper.find('.label');
    expect(label).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
});

test('aligns label text with `labelAlign`', () => {
    const wrapperA = mount(<ProgressBar labelAlign="left" />);
    expect(wrapperA).toMatchSnapshot();

    const wrapperB = mount(<ProgressBar labelAlign="center" />);
    expect(wrapperB).toMatchSnapshot();
});
