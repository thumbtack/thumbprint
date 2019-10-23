import React from 'react';
import { mount } from 'enzyme';
import Button, { TextButton } from './index';

test('renders children passed in', (): void => {
    const testComponent = (Component: React.ElementType): void => {
        const wrapper = mount(<Component>Goose</Component>);
        expect(wrapper.text()).toEqual('Goose');
        expect(wrapper).toMatchSnapshot();
    };

    testComponent(Button);
    testComponent(TextButton);
});

test('renders button of type `button` by default', (): void => {
    const testComponent = (Component: React.ElementType): void => {
        const wrapper = mount(<Component>Goose</Component>);
        expect(wrapper.find('button').prop('type')).toEqual('button');
        expect(wrapper).toMatchSnapshot();
    };

    testComponent(Button);
    testComponent(TextButton);
});

test('renders button of type `submit` when `type` is set', (): void => {
    const testComponent = (Component: React.ElementType): void => {
        const wrapper = mount(<Component type="submit">Goose</Component>);
        expect(wrapper.find('button').prop('type')).toEqual('submit');
        expect(wrapper).toMatchSnapshot();
    };

    testComponent(Button);
    testComponent(TextButton);
});

test('`onClick` runs when button is clicked on', (): void => {
    const testComponent = (Component: React.ElementType): void => {
        const onClick = jest.fn();
        const wrapper = mount(<Component onClick={onClick}>Goose</Component>);

        expect(onClick).toHaveBeenCalledTimes(0);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    };

    testComponent(Button);
    testComponent(TextButton);
});

test('`onMouseOver` runs when button is moused over', (): void => {
    const testComponent = (Component: React.ElementType): void => {
        const onMouseOver = jest.fn();
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        const wrapper = mount(<Component onMouseOver={onMouseOver}>Goose</Component>);

        expect(onMouseOver).toHaveBeenCalledTimes(0);
        wrapper.simulate('mouseover');
        expect(onMouseOver).toHaveBeenCalledTimes(1);
    };

    testComponent(Button);
    testComponent(TextButton);
});

test('renders icon that is passed in', (): void => {
    const wrapper = mount(<Button icon={<svg>Duck</svg>}>Goose</Button>);
    expect(wrapper.find('svg')).toHaveLength(1);
    expect(wrapper.text()).toBe('DuckGoose');
    expect(wrapper).toMatchSnapshot();
});

test('adds `dataTest` prop', (): void => {
    const wrapperA = mount(<Button dataTest="Duck">Goose</Button>);
    expect(wrapperA.find('button').prop('data-test')).toEqual('Duck');
    expect(wrapperA).toMatchSnapshot();

    const wrapperB = mount(<TextButton dataTest="Duck">Goose</TextButton>);
    expect(wrapperB.find('button').prop('data-test')).toEqual('Duck');
    expect(wrapperB).toMatchSnapshot();
});
