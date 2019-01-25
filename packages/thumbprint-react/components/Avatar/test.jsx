import React from 'react';
import { mount } from 'enzyme';
import Avatar, { EntityAvatar } from './index';

test('renders an image when the user has one', () => {
    const wrapper = mount(<Avatar imageUrl="//www.placecage.com/130/130" initials="NC" />);
    expect(wrapper.find('.baseAvatar').prop('data-src')).toBe('//www.placecage.com/130/130');
    expect(wrapper).toMatchSnapshot();
});

test('adds lazyload class for lazysizes to work', () => {
    const wrapper = mount(<Avatar imageUrl="//www.placecage.com/130/130" />);
    expect(wrapper.find('.lazyload')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('does not add lazyload class if an image is not provided', () => {
    const wrapper = mount(<Avatar initials="NC" />);
    expect(wrapper.find('.lazyload')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
});

test('renders the initials when the user has no image', () => {
    const wrapper = mount(<Avatar initials="NC" />);
    expect(wrapper.find('.initialsAvatar').text()).toBe('NC');
    expect(wrapper).toMatchSnapshot();
});

test('adds the `fullName` as `title` text', () => {
    const wrapper = mount(<Avatar fullName="Duck Goose" />);
    const wrapperWithImage = mount(
        <Avatar fullName="Duck Goose" imageUrl="//www.placecage.com/130/130" />,
    );
    const wrapperWithInitials = mount(<Avatar fullName="Duck Goose" title="DG" />);

    expect(wrapper.find('.initialsAvatar').prop('title')).toContain('Duck Goose');
    expect(wrapperWithImage.find('.baseAvatar').prop('title')).toContain('Duck Goose');
    expect(wrapperWithInitials.find('.initialsAvatar').prop('title')).toContain('Duck Goose');

    expect(wrapper).toMatchSnapshot();
    expect(wrapperWithImage).toMatchSnapshot();
    expect(wrapperWithInitials).toMatchSnapshot();
});

test('adds the `fullName` as `alt` text when image is provided', () => {
    const wrapper = mount(<Avatar fullName="Duck Goose" imageUrl="//www.placecage.com/130/130" />);
    expect(wrapper.find('.baseAvatar').prop('alt')).toContain('Duck Goose');
    expect(wrapper).toMatchSnapshot();
});

test('does not add the `fullName` as `alt` text when no image is provided', () => {
    const wrapper = mount(<Avatar fullName="Duck Goose" />);
    expect(wrapper.find('.initialsAvatar').prop('alt')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
});

test('does not render a badge when `size` is `xsmall`', () => {
    const wrapperA = mount(<Avatar size="xsmall" initials="DK" />);
    const wrapperB = mount(<Avatar size="xsmall" isChecked initials="DK" />);
    const wrapperC = mount(<Avatar size="xsmall" hasUnreadNotifications initials="DK" />);
    const wrapperD = mount(<Avatar size="xsmall" isOnline initials="DK" />);

    expect(wrapperA.find('.badge').exists()).toBe(false);
    expect(wrapperB.find('.badge').exists()).toBe(false);
    expect(wrapperC.find('.badge').exists()).toBe(false);
    expect(wrapperD.find('.badge').exists()).toBe(false);
    expect(wrapperA).toMatchSnapshot();
    expect(wrapperB).toMatchSnapshot();
    expect(wrapperC).toMatchSnapshot();
    expect(wrapperD).toMatchSnapshot();
});

test('does not render a badge by default', () => {
    const wrapperNoSize = mount(<Avatar initials="DK" />);
    expect(wrapperNoSize.find('.badge').exists()).toBe(false);
    expect(wrapperNoSize).toMatchSnapshot();

    const wrapperWithSize = mount(<Avatar size="large" initials="DK" />);
    expect(wrapperWithSize.find('.badge').exists()).toBe(false);
    expect(wrapperWithSize).toMatchSnapshot();
});

test('renders a badge if size is larger than `xsmall` and valid badge prop is supplied', () => {
    const wrapperA = mount(<Avatar isChecked initials="DK" />);
    const wrapperB = mount(<Avatar size="medium" isChecked initials="DK" />);
    const wrapperC = mount(<Avatar size="medium" hasUnreadNotifications initials="DK" />);
    const wrapperD = mount(<Avatar size="medium" isOnline initials="DK" />);

    expect(wrapperA.find('.badge').exists()).toBe(true);
    expect(wrapperB.find('.badge').exists()).toBe(true);
    expect(wrapperC.find('.badge').exists()).toBe(true);
    expect(wrapperD.find('.badge').exists()).toBe(true);
    expect(wrapperA).toMatchSnapshot();
    expect(wrapperB).toMatchSnapshot();
    expect(wrapperC).toMatchSnapshot();
    expect(wrapperD).toMatchSnapshot();
});

test('renders an SVG when `isChecked` is true', () => {
    const wrapper = mount(<Avatar size="medium" isChecked initials="DK" />);
    expect(
        wrapper
            .find('.badge')
            .find('svg')
            .exists(),
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('renders an SVG when `isChecked` is true', () => {
    const wrapper = mount(<Avatar size="medium" isChecked initials="DK" />);
    expect(
        wrapper
            .find('.badge')
            .find('svg')
            .exists(),
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('renders `isOnline` when `isOnline` is true', () => {
    const wrapper = mount(<Avatar isOnline />);
    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('renders notification dot without checkmark SVG when `isChecked` and `hasUnreadNotifications` are true', () => {
    const wrapper = mount(<Avatar isChecked hasUnreadNotifications />);
    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(
        wrapper
            .find('.badge')
            .find('svg')
            .exists(),
    ).toBe(false);
    expect(wrapper).toMatchSnapshot();
});

test('renders checkmark SVG when `isChecked` and `isOnline` are true', () => {
    const wrapper = mount(<Avatar isChecked isOnline />);
    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(
        wrapper
            .find('.badge')
            .find('svg')
            .exists(),
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('EntityAvatar renders an image when the user has one', () => {
    const wrapper = mount(<EntityAvatar imageUrl="//www.placecage.com/130/130" initial="N" />);
    expect(wrapper.find('.baseAvatar').prop('data-src')).toBe('//www.placecage.com/130/130');
    expect(wrapper).toMatchSnapshot();
});

test('EntityAvatar renders the initials when the user has no image', () => {
    const wrapper = mount(<EntityAvatar initial="N" />);
    expect(wrapper.find('.initialsAvatar').text()).toBe('N');
    expect(wrapper).toMatchSnapshot();
});
