import React from 'react';
import { mount, shallow } from 'enzyme';
import StarRating from './index';

test('renders 10 star SVG elements in total', () => {
    const wrapper = mount(<StarRating rating={5} />);
    expect(wrapper.find('StarIcon')).toHaveLength(10);
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

test('generates the correct title', () => {
    const wrapper = shallow(<StarRating rating={2} />);
    expect(wrapper.prop('title')).toBe('2 out of 5 star rating');
    expect(wrapper).toMatchSnapshot();
});

test('does not add title text if a function is provided', () => {
    const wrapper = shallow(<StarRating rating={2} onStarClick={jest.fn} />);
    expect(wrapper.prop('title')).toBe(undefined);
    expect(wrapper).toMatchSnapshot();
});

test('does not throw an error when clicking on a star when `onStarClick` is not provided', () => {
    const wrapper = mount(<StarRating size="large" rating={3} />);
    expect(() => {
        wrapper
            .find('[data-test-id="star-row-gold"] StarIcon')
            .first()
            .simulate('click');
    }).not.toThrow();
});

test('calls `onStarClick` function when supplied', () => {
    const onStarClick = jest.fn();
    const wrapper = mount(<StarRating rating={0} onStarClick={onStarClick} />);
    wrapper
        .find('[data-test-id="star-row-gray"] StarIcon')
        .first()
        .simulate('click');
    expect(onStarClick).toHaveBeenCalledTimes(1);
});

test('calls `onStarClick` function with correct star rating', () => {
    const onStarClick = jest.fn();
    const wrapper = mount(<StarRating rating={0} onStarClick={onStarClick} />);
    const starRatingToClick = 3;
    wrapper
        .find('[data-test-id="star-row-gray"] StarIcon')
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
        .find('[data-test-id="star-row-gray"]')
        .children()
        .at(starRatingToHover - 1)
        .simulate('mouseenter');
    expect(onStarHover).toHaveBeenCalledTimes(1);
    expect(onStarHover).toHaveBeenCalledWith(starRatingToHover);
});

test('calls the `onMouseLeave` function when appropriate', () => {
    const onMouseLeave = jest.fn();
    const wrapper = shallow(<StarRating rating={0} onMouseLeave={onMouseLeave} />);
    wrapper.find('[data-test-id="star-row-gray"]').simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
