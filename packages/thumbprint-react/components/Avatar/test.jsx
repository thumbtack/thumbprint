import React from 'react';
import { mount } from 'enzyme';
import { UserAvatar, EntityAvatar } from './index';

test('renders an image when the user has one', () => {
    const wrapper = mount(<UserAvatar imageUrl="//www.placecage.com/130/130" initials="NC" />);
    expect(wrapper.find('.baseAvatar').prop('data-src')).toBe('//www.placecage.com/130/130');
    expect(wrapper).toMatchSnapshot();
});

test('adds lazyload class for lazysizes to work', () => {
    const wrapper = mount(<UserAvatar imageUrl="//www.placecage.com/130/130" />);
    expect(wrapper.find('.lazyload')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('does not add lazyload class if an image is not provided', () => {
    const wrapper = mount(<UserAvatar initials="NC" />);
    expect(wrapper.find('.lazyload')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
});

test('renders the initials when the user has no image', () => {
    const wrapper = mount(<UserAvatar initials="NC" />);
    expect(wrapper.find('.initialsAvatar').text()).toBe('NC');
    expect(wrapper).toMatchSnapshot();
});

test('adds the `fullName` as `title` text', () => {
    const wrapper = mount(<UserAvatar fullName="Duck Goose" />);
    const wrapperWithImage = mount(
        <UserAvatar fullName="Duck Goose" imageUrl="//www.placecage.com/130/130" />,
    );
    const wrapperWithInitials = mount(<UserAvatar fullName="Duck Goose" title="DG" />);

    expect(wrapper.find('.initialsAvatar').prop('title')).toContain('Duck Goose');
    expect(wrapperWithImage.find('.baseAvatar').prop('title')).toContain('Duck Goose');
    expect(wrapperWithInitials.find('.initialsAvatar').prop('title')).toContain('Duck Goose');

    expect(wrapper).toMatchSnapshot();
    expect(wrapperWithImage).toMatchSnapshot();
    expect(wrapperWithInitials).toMatchSnapshot();
});

test('adds the `fullName` as `alt` text when image is provided', () => {
    const wrapper = mount(
        <UserAvatar fullName="Duck Goose" imageUrl="//www.placecage.com/130/130" />,
    );
    expect(wrapper.find('.baseAvatar').prop('alt')).toContain('Duck Goose');
    expect(wrapper).toMatchSnapshot();
});

test('does not add the `fullName` as `alt` text when no image is provided', () => {
    const wrapper = mount(<UserAvatar fullName="Duck Goose" />);
    expect(wrapper.find('.initialsAvatar').prop('alt')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
});

test('does not render a badge by default', () => {
    const wrapperNoSize = mount(<UserAvatar initials="DK" />);
    expect(wrapperNoSize.find('.badge').exists()).toBe(false);
    expect(wrapperNoSize).toMatchSnapshot();

    const wrapperWithSize = mount(<UserAvatar size="large" initials="DK" />);
    expect(wrapperWithSize.find('.badge').exists()).toBe(false);
    expect(wrapperWithSize).toMatchSnapshot();
});

test('renders a badge if valid badge prop is supplied', () => {
    const wrapperA = mount(<UserAvatar isChecked initials="DK" />);
    const wrapperB = mount(<UserAvatar size="medium" isChecked initials="DK" />);
    const wrapperC = mount(<UserAvatar size="medium" isOnline initials="DK" />);

    expect(wrapperA.find('.badge').exists()).toBe(true);
    expect(wrapperB.find('.badge').exists()).toBe(true);
    expect(wrapperC.find('.badge').exists()).toBe(true);
    expect(wrapperA).toMatchSnapshot();
    expect(wrapperB).toMatchSnapshot();
    expect(wrapperC).toMatchSnapshot();
});

test('renders an SVG when `isChecked` is true', () => {
    const wrapper = mount(<UserAvatar size="medium" isChecked initials="DK" />);
    expect(
        wrapper
            .find('.badge')
            .find('svg')
            .exists(),
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('renders an SVG when `isChecked` is true', () => {
    const wrapper = mount(<UserAvatar size="medium" isChecked initials="DK" />);
    expect(
        wrapper
            .find('.badge')
            .find('svg')
            .exists(),
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('renders `isOnline` when `isOnline` is true', () => {
    const wrapper = mount(<UserAvatar isOnline />);
    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('renders checkmark SVG when `isChecked` and `isOnline` are true', () => {
    const wrapper = mount(<UserAvatar isChecked isOnline />);
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
