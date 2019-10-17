import React from 'react';
import { shallow, mount, render } from 'enzyme';
import noop from 'lodash/noop';
import Textarea from './index';

test('adds placeholder', () => {
    const wrapper = mount(<Textarea placeholder="Goose" onChange={jest.fn} value="goose" />);
    expect(wrapper.prop('placeholder')).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders an error state', () => {
    const wrapper = mount(<Textarea hasError onChange={jest.fn} value="goose" />);
    expect(wrapper).toMatchSnapshot();
});

test('adds `id` attribute', () => {
    const wrapper = mount(<Textarea id="Goose" onChange={jest.fn} value="goose" />);
    expect(wrapper.find('textarea').prop('id')).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('adds `disabled` attribute', () => {
    const wrapper = mount(<Textarea isDisabled onChange={jest.fn} value="goose" />);
    expect(wrapper.find('textarea').prop('disabled')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('adds `required` attribute', () => {
    const wrapper = mount(<Textarea isRequired onChange={jest.fn} value="goose" />);
    expect(wrapper.find('textarea').prop('required')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('adds `maxLength` attribute', () => {
    const wrapper = mount(<Textarea maxLength={100} onChange={jest.fn} value="goose" />);
    expect(wrapper.prop('maxLength')).toBe(100);
    expect(wrapper).toMatchSnapshot();
});

test('adds `name` HTML attribute', () => {
    const wrapperA = mount(<Textarea name="duck" onChange={noop} value="goose" />);
    expect(wrapperA.find('textarea').prop('name')).toEqual('duck');
    expect(wrapperA).toMatchSnapshot();
});

test('renders `value` as the `value` attribute', () => {
    const wrapper = render(<Textarea value="Goose" onChange={jest.fn} />);
    expect(wrapper.text()).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('calls `onChange` function and passes value', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Textarea onChange={onChange} value="goose" />);

    const firstEvent = { target: { value: 'He' } };
    const secondEvent = { target: { value: 'Hello' } };

    wrapper.find('textarea').simulate('change', firstEvent);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
        firstEvent.target.value,
        expect.objectContaining({
            target: expect.any(Object),
        }),
    );

    wrapper.find('textarea').simulate('change', secondEvent);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(
        secondEvent.target.value,
        expect.objectContaining({
            target: expect.any(Object),
        }),
    );
});

test('calls `onBlur` function when supplied', () => {
    const onBlur = jest.fn();

    const wrapper = shallow(<Textarea onBlur={onBlur} onChange={jest.fn} value="goose" />);

    wrapper.simulate('blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
});

test('calls `onFocus` function when supplied', () => {
    const onFocus = jest.fn();

    const wrapper = shallow(<Textarea onFocus={onFocus} onChange={jest.fn} value="goose" />);

    wrapper.simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(<Textarea dataTest="Duck" onChange={noop} value="goose" />);
    expect(wrapper.find('textarea').prop('data-test')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});
