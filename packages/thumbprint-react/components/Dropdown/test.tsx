import React from 'react';
import { noop } from 'lodash';
import { mount, render } from 'enzyme';
import Dropdown from './index';

test('adds `disabled` attribute', () => {
    const wrapper = mount(<Dropdown isDisabled onChange={noop} value="goose" />);
    expect(wrapper.find('select').prop('disabled')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('adds `id` attribute', () => {
    const wrapper = mount(<Dropdown id="Goose" onChange={noop} value="goose" />);
    expect(wrapper.find('select').prop('id')).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('adds `required` attribute', () => {
    const wrapper = mount(<Dropdown isRequired onChange={noop} value="goose" />);
    expect(wrapper.find('select').prop('required')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('renders an error state with `hasError`', () => {
    const wrapper = mount(<Dropdown hasError onChange={noop} value="goose" />);
    expect(wrapper).toMatchSnapshot();
});

test('renders options that are passed in as `children`', () => {
    const wrapper = mount(
        <Dropdown onChange={noop} value="goose">
            <option>New York</option>
            <option>California</option>
        </Dropdown>,
    );

    expect(wrapper.find('option')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
});

test('uses `value` as the selected option', () => {
    const wrapper = render(
        <Dropdown value="ca" onChange={jest.fn}>
            <option value="ny">New York</option>
            <option value="ca">California</option>
        </Dropdown>,
    );
    expect(wrapper.find('select [selected]').val()).toBe('ca');
    expect(wrapper).toMatchSnapshot();
});

test('calls `onChange` function and supplies new value and event', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Dropdown onChange={onChange} value="goose" />);
    const select = wrapper.find('select');

    const event1 = { target: { value: 'He' } };
    select.simulate('change', event1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(event1.target.value, expect.objectContaining(event1));

    const event2 = { target: { value: 'Hello' } };
    select.simulate('change', event2);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(event2.target.value, expect.objectContaining(event2));
});

test('calls `onBlur` function when supplied', () => {
    const onBlur = jest.fn();

    const wrapper = mount(<Dropdown onBlur={onBlur} onChange={jest.fn} value="goose" />);

    wrapper.find('select').simulate('blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
});

test('calls `onFocus` function when supplied', () => {
    const onFocus = jest.fn();

    const wrapper = mount(<Dropdown onFocus={onFocus} onChange={jest.fn} value="goose" />);

    wrapper.find('select').simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
});

test('calls `onClick` function when clicked on', () => {
    const onClick = jest.fn();

    const wrapper = mount(<Dropdown onClick={onClick} onChange={noop} value="goose" />);

    wrapper.find('select').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('adds `dataTest` prop', () => {
    const wrapperA = mount(<Dropdown dataTest="Duck" onChange={noop} value="goose" />);
    expect(wrapperA.find('select').prop('data-test')).toEqual('Duck');
    expect(wrapperA).toMatchSnapshot();
});

test('adds `dataTestId` prop', () => {
    const wrapperA = mount(<Dropdown dataTestId="Duck" onChange={noop} value="goose" />);
    expect(wrapperA.find('select').prop('data-testid')).toEqual('Duck');
    expect(wrapperA).toMatchSnapshot();
});

test('adds `name` HTML attribute', () => {
    const wrapperA = mount(<Dropdown name="duck" onChange={noop} value="goose" />);
    expect(wrapperA.find('select').prop('name')).toEqual('duck');
    expect(wrapperA).toMatchSnapshot();
});
