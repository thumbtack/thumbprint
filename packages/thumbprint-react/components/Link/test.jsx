import React from 'react';
import { mount } from 'enzyme';
import Link, { ThemedLink } from './index';

test('renders `children` passed in', () => {
    const testComponent = Component => {
        const wrapper = mount(<Component to="https://example.com/">Goose</Component>);
        expect(wrapper.text()).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('renders a anchor tag when a `to` is provided', () => {
    const testComponent = Component => {
        const wrapper = mount(<Component to="https://example.com/">Goose</Component>);
        expect(wrapper.find('button')).toHaveLength(0);
        expect(wrapper.find('a')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('renders an anchor tag when both `to` and `onClick` are provided', () => {
    const testComponent = Component => {
        const wrapper = mount(
            <Component to="https://example.com/" onClick={jest.fn}>
                Goose
            </Component>,
        );
        expect(wrapper.find('button')).toHaveLength(0);
        expect(wrapper.find('a')).toHaveLength(1);
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('adds `rel` attribute to handle security vulnerability', () => {
    const testComponent = Component => {
        const wrapperLink = mount(
            <Component shouldOpenInNewTab to="https://example.com/">
                Goose
            </Component>,
        );
        expect(wrapperLink.find('a').prop('rel')).toEqual('noopener noreferrer');
        expect(wrapperLink).toMatchSnapshot();
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('adds attribute to open link in new tab', () => {
    const testComponent = Component => {
        const wrapperLink = mount(
            <Component shouldOpenInNewTab to="https://example.com/">
                Goose
            </Component>,
        );
        expect(wrapperLink.find('a').prop('target')).toEqual('_blank');
        expect(wrapperLink).toMatchSnapshot();
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('renders `to` prop as `href`', () => {
    const testComponent = Component => {
        const wrapperLink = mount(<Component to="https://example.com/">Goose</Component>);
        expect(wrapperLink.find('a').prop('href')).toBe('https://example.com/');
        expect(wrapperLink).toMatchSnapshot();
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('renders `onClick` prop', () => {
    const testComponent = Component => {
        const onClick = jest.fn();
        const wrapper = mount(
            <Component to="https://example.com/" onClick={onClick}>
                Goose
            </Component>,
        );
        expect(onClick).toHaveBeenCalledTimes(0);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('removes `href` if link is disabled', () => {
    const testComponent = Component => {
        const wrapperLink = mount(
            <Component isDisabled to="https://example.com/">
                Goose
            </Component>,
        );
        expect(wrapperLink.find('a').prop('href')).toBeFalsy();
        expect(wrapperLink).toMatchSnapshot();
    };

    testComponent(Link);
    testComponent(ThemedLink);
});

test('adds `dataTest` prop', () => {
    const wrapperA = mount(
        <Link to="https://example.com/" dataTest="Duck">
            Goose
        </Link>,
    );
    expect(wrapperA.find('a').prop('data-test')).toEqual('Duck');
    expect(wrapperA).toMatchSnapshot();

    const wrapperB = mount(
        <ThemedLink to="#" dataTest="Duck">
            Goose
        </ThemedLink>,
    );
    expect(wrapperB.find('a').prop('data-test')).toEqual('Duck');
    expect(wrapperB).toMatchSnapshot();
});
