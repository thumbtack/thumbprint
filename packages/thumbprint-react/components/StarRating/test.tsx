import React from 'react';
import { mount, shallow } from 'enzyme';
import StarRating from './index';

test('renders 5 label elements in total', () => {
    const wrapper = mount(<StarRating rating={3} onStarClick={(): void => {}} />);
    expect(wrapper.find('label')).toHaveLength(5);
    expect(wrapper).toMatchSnapshot();
});

test('renders 3 star rating', () => {
    const wrapper = mount(<StarRating rating={3} />);
    expect(wrapper).toMatchSnapshot();
});

test('renders 2.5 star rating', () => {
    const wrapper = mount(<StarRating rating={2.5} />);
    expect(wrapper).toMatchSnapshot();
});

test('renders 0 star rating', () => {
    const wrapper = mount(<StarRating rating={0} />);
    expect(wrapper).toMatchSnapshot();
});

test('generates the correct aria-label', () => {
    const wrapper = shallow(<StarRating rating={2} />);
    expect(wrapper.prop('aria-label')).toBe('2 stars out of 5 star rating');
    expect(wrapper).toMatchSnapshot();
});

test('generates the correct aria-label with 1 star rating', () => {
    const wrapper = shallow(<StarRating rating={1} />);
    expect(wrapper.prop('aria-label')).toBe('1 star out of 5 star rating');
    expect(wrapper).toMatchSnapshot();
});

test('generates the correct role attr', () => {
    const wrapper = shallow(<StarRating rating={1} />);
    expect(wrapper.prop('role')).toBe('img');
    expect(wrapper).toMatchSnapshot();
});

test('generates a valid rounded rating value for the data-star attr', () => {
    const wrapper = shallow(<StarRating rating={1.5789} />);
    expect(wrapper.prop('data-star')).toBe(1.5);
    expect(wrapper).toMatchSnapshot();
});

test('does not throw an error when clicking on a star when `onStarClick` is not provided', () => {
    const wrapper = mount(<StarRating size="large" rating={3} />);
    expect(() => {
        wrapper.simulate('click');
    }).not.toThrow();
});

test('calls `onStarClick` function when supplied', () => {
    const onStarClick = jest.fn();
    const wrapper = mount(<StarRating rating={0} onStarClick={onStarClick} />);
    wrapper
        .find('input')
        .first()
        .simulate('click');
    expect(onStarClick).toHaveBeenCalledTimes(1);
});

test('calls `onStarClick` function with correct star rating', () => {
    const onStarClick = jest.fn();
    const wrapper = mount(<StarRating rating={0} onStarClick={onStarClick} />);
    const starRatingToClick = 3;
    wrapper
        .find('input')
        .at(starRatingToClick - 1) // minus one to get index
        .simulate('click');
    expect(onStarClick).toHaveBeenCalledTimes(1);
    expect(onStarClick).toHaveBeenCalledWith(starRatingToClick);
});

test('calls the `onStarHover` function with the correct star rating', () => {
    const onStarHover = jest.fn();
    const wrapper = shallow(<StarRating rating={0} onStarHover={onStarHover} />);
    const starRatingToHover = 3;
    wrapper
        .find('label')
        .at(starRatingToHover - 1)
        .simulate('mouseenter');
    expect(onStarHover).toHaveBeenCalledTimes(1);
    expect(onStarHover).toHaveBeenCalledWith(starRatingToHover);
});

test('calls the `onMouseLeave` function when appropriate', () => {
    const onMouseLeave = jest.fn();
    const wrapper = shallow(<StarRating rating={0} onMouseLeave={onMouseLeave} />);
    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
