import React from 'react';
import { noop } from 'lodash';
import { mount, render } from 'enzyme';
import Select from './index';

test('adds `disabled` attribute', () => {
    const wrapper = mount(<Select isDisabled onChange={noop} value="goose" />);
    expect(wrapper.find('select').prop('disabled')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('adds `id` attribute', () => {
    const wrapper = mount(<Select id="Goose" onChange={noop} value="goose" />);
    expect(wrapper.find('select').prop('id')).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('adds `required` attribute', () => {
    const wrapper = mount(<Select isRequired onChange={noop} value="goose" />);
    expect(wrapper.find('select').prop('required')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('renders an error state with `hasError`', () => {
    const wrapper = mount(<Select hasError onChange={noop} value="goose" />);
    expect(wrapper).toMatchSnapshot();
});

test('renders options that are passed in as `children`', () => {
    const wrapper = mount(
        <Select onChange={noop} value="goose">
            <option>New York</option>
            <option>California</option>
        </Select>,
    );

    expect(wrapper.find('option')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
});

test('uses `value` as the selected option', () => {
    const wrapper = render(
        <Select value="ca" onChange={jest.fn}>
            <option value="ny">New York</option>
            <option value="ca">California</option>
        </Select>,
    );
    expect(wrapper.find('select [selected]').val()).toBe('ca');
    expect(wrapper).toMatchSnapshot();
});

test('calls `onChange` function and supplies new value', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Select onChange={onChange} value="goose" />);
    const select = wrapper.find('select');

    select.simulate('change', { target: { value: 'He' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith('He');

    select.simulate('change', { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('Hello');
});

test('calls `onClick` function when clicked on', () => {
    const onClick = jest.fn();

    const wrapper = mount(<Select onClick={onClick} onChange={noop} value="goose" />);

    wrapper.find('select').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('adds `dataTest` prop', () => {
    const wrapperA = mount(<Select dataTest="Duck" onChange={noop} value="goose" />);
    expect(wrapperA.find('select').prop('data-test')).toEqual('Duck');
    expect(wrapperA).toMatchSnapshot();
});

test('adds `name` HTML attribute', () => {
    const wrapperA = mount(<Select name="duck" onChange={noop} value="goose" />);
    expect(wrapperA.find('select').prop('name')).toEqual('duck');
    expect(wrapperA).toMatchSnapshot();
});
