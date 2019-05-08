import React from 'react';
import { mount } from 'enzyme';
import ServiceCard, { ServiceCardImage, ServiceCardTitle, ServiceCardDescription } from './index';

describe('ServiceCard', () => {
    test('renders an href when supplied', () => {
        const wrapper = mount(
            <ServiceCard url="https://www.thumbtack.com/k/massage/near-me/">Lorem</ServiceCard>,
        );
        expect(wrapper.find('a').prop('href')).toBe('https://www.thumbtack.com/k/massage/near-me/');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ServiceCardImage', () => {
    test('renders an aria-label when supplied by alt', () => {
        const wrapper = mount(<ServiceCardImage alt="Lorem" url="" />);
        expect(wrapper.find('.image').prop('aria-label')).toBe('Lorem');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds lazyload class for lazysizes to work', () => {
        const wrapper = mount(<ServiceCardImage alt="Lorem" url="" />);
        expect(wrapper.find('.lazyload')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders an background image when supplied', () => {
        const wrapper = mount(
            <ServiceCardImage alt="" url="https://www.thumbtack.com/image.png" />,
        );
        expect(wrapper.find('.image').prop('data-bg')).toBe('https://www.thumbtack.com/image.png');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ServiceCardTitle', () => {
    test('renders a title when supplied', () => {
        const wrapper = mount(<ServiceCardTitle>Lorem</ServiceCardTitle>);
        expect(wrapper.text()).toBe('Lorem');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ServiceCardDescription', () => {
    test('renders a description when supplied', () => {
        const wrapper = mount(<ServiceCardDescription>Lorem</ServiceCardDescription>);
        expect(wrapper.text()).toBe('Lorem');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders a icon and color is blue', () => {
        const wrapper = mount(
            <ServiceCardDescription icon={<svg />}>Lorem</ServiceCardDescription>,
        );
        expect(wrapper.find('.descriptionWrap svg'));
        expect(wrapper.find('.descriptionWrap').hasClass('iconBlue'));
        expect(wrapper).toMatchSnapshot();
    });

    test('renders icon color', () => {
        const wrapper = mount(
            <ServiceCardDescription icon="" iconColor="green">
                Lorem
            </ServiceCardDescription>,
        );
        expect(wrapper.find('.descriptionWrap').hasClass('iconGreen'));
        expect(wrapper).toMatchSnapshot();
    });
});
