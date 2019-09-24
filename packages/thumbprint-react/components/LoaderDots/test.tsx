import React from 'react';
import { mount } from 'enzyme';
import LoaderDots from './index';

test('has proper default attributes', () => {
    const wrapper = mount(<LoaderDots />);

    expect(wrapper.find('.dotThemeBrand')).toHaveLength(3);
    expect(wrapper.find('.dotSizeMedium')).toHaveLength(3);
    expect(wrapper.find('.root').prop('role')).toBe('status');
    expect(wrapper.find('.hiddenText').text()).toBe('Loading');
    expect(wrapper).toMatchSnapshot();
});

test('adds proper accessibility attributes', () => {
    const wrapper = mount(<LoaderDots assistiveText="Goose" />);
    expect(wrapper.find('.root').prop('role')).toBe('status');
    expect(wrapper.find('.hiddenText').text()).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('sets size attribute', () => {
    const wrapper = mount(<LoaderDots size="small" />);
    expect(wrapper.find('.dotSizeSmall')).toHaveLength(3);
    expect(wrapper).toMatchSnapshot();
});

test('sets theme attribute', () => {
    const wrapperInverse = mount(<LoaderDots theme="inverse" />);
    expect(wrapperInverse.find('.dotThemeInverse')).toHaveLength(3);
    expect(wrapperInverse).toMatchSnapshot();

    const wrapperMuted = mount(<LoaderDots theme="muted" />);
    expect(wrapperMuted.find('.dotThemeMuted')).toHaveLength(3);
    expect(wrapperMuted).toMatchSnapshot();
});
