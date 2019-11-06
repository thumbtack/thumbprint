import React from 'react';
import { mount } from 'enzyme';
import Radio from './index';

test('renders radio input', () => {
    const wrapper = mount(
        <Radio name="duck" onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.find('input').prop('type')).toBe('radio');
    expect(wrapper).toMatchSnapshot();
});

test('renders `children` passed in', () => {
    const wrapper = mount(
        <Radio name="duck" onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.text()).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('if no `children` are passed in', () => {
    const wrapper = mount(<Radio name="duck" onChange={jest.fn()} id="no-children" />);
    expect(wrapper).toMatchSnapshot();
});

test('renders `hasError` state', () => {
    const wrapperA = mount(
        <Radio name="duck" hasError onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    const wrapperB = mount(
        <Radio name="duck" isChecked hasError onChange={jest.fn()}>
            Goose
        </Radio>,
    );

    expect(wrapperA).toMatchSnapshot();
    expect(wrapperB).toMatchSnapshot();
});

test('renders `input` within `label`', () => {
    const wrapper = mount(
        <Radio name="duck" onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.find('label input').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('adds `disabled` attribute', () => {
    const wrapper = mount(
        <Radio name="duck" isDisabled onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.find('input').prop('disabled')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('is not checked by default', () => {
    const wrapper = mount(
        <Radio name="duck" onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.find('input').prop('checked')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
});

test('is checked when `isChecked` is set to true', () => {
    const wrapper = mount(
        <Radio name="duck" isChecked onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.find('input').prop('checked')).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('applies `labelPadding` as padding on the label', () => {
    const wrapper = mount(
        <Radio name="duck" labelPadding="10px 20px" onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect((wrapper.find('label').prop('style') || {}).padding).toBe('10px 20px');
    expect(wrapper).toMatchSnapshot();
});

test('applies className corresponding to `radioVerticalAlign` on the label', () => {
    const wrapper = mount(
        <Radio name="duck" radioVerticalAlign="top" onChange={jest.fn()}>
            Goose
        </Radio>,
    );

    expect(wrapper.find('label').hasClass('rootRadioVerticalAlignTop'));
    expect(wrapper).toMatchSnapshot();
});

test('calls `onChange` function when supplied', () => {
    const onChange = jest.fn();

    const wrapper = mount(
        <Radio name="duck" onChange={onChange}>
            Goose
        </Radio>,
    );

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(2);
});

test('passes correct new value and `id` to `onChange` function', () => {
    const onChange = jest.fn();

    const wrapper = mount(
        <Radio name="duck" id="goose" onChange={onChange} isChecked>
            Goose
        </Radio>,
    );

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toHaveBeenCalledWith(false, 'goose');

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledWith(true, 'goose');
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(
        <Radio name="duck" dataTest="Duck" onChange={jest.fn()}>
            Goose
        </Radio>,
    );
    expect(wrapper.find('input').prop('data-test')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});
