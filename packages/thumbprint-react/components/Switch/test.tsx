import React from 'react';
import { mount } from 'enzyme';
import Switch from './index';

test('renders Switch input', () => {
    const wrapper = mount(<Switch onChange={jest.fn()} />);
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
    expect(wrapper).toMatchSnapshot();
});

test('adds `disabled` attribute', () => {
    const wrapper = mount(<Switch isDisabled onChange={jest.fn()} />);
    expect(wrapper.find('input').prop('disabled')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('adds `name` attribute', () => {
    const wrapper = mount(<Switch name="ohhi" onChange={jest.fn()} />);
    expect(wrapper.find('input').prop('name')).toBe('ohhi');
    expect(wrapper).toMatchSnapshot();
});

test('is not checked by default', () => {
    const wrapper = mount(<Switch onChange={jest.fn()} />);
    expect(wrapper.find('input').prop('checked')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
});

test('is checked when `isChecked` is set to true', () => {
    const wrapper = mount(<Switch isChecked onChange={jest.fn()} />);
    expect(wrapper.find('input').prop('checked')).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('calls `onChange` function when supplied', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Switch onChange={onChange} />);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(2);
});

test('adds `dataTestId` prop', () => {
    const wrapper = mount(<Switch dataTestId="Duck" onChange={jest.fn()} />);
    expect(wrapper.find('input').prop('data-testid')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});

test('`value` attribute is `"on"` in form data if prop is `undefined` and Switch is checked', () => {
    let nameInFormData;
    const name = 'foo';

    const wrapper = mount(
        <form
            onSubmit={(e): void => {
                e.preventDefault();
                // We need to assert the type because TypeScript can't infer it.
                // https://stackoverflow.com/a/43851475
                const data = new FormData(e.target as HTMLFormElement);
                nameInFormData = data.get(name);
            }}
        >
            <Switch isChecked name={name} onChange={(): void => {}} />
            <button type="submit">Submit</button>
        </form>,
    );

    wrapper.find('form').simulate('submit');
    expect(nameInFormData).toBe('on');
});

test('`value` attribute is `"on"` in form data if Switch is checked', () => {
    let nameInFormData;
    const name = 'foo';

    const wrapper = mount(
        <form
            onSubmit={(e): void => {
                e.preventDefault();
                // We need to assert the type because TypeScript can't infer it.
                // https://stackoverflow.com/a/43851475
                const data = new FormData(e.target as HTMLFormElement);
                nameInFormData = data.get(name);
            }}
        >
            <Switch isChecked name={name} onChange={(): void => {}} />
            <button type="submit">Submit</button>
        </form>,
    );

    wrapper.find('form').simulate('submit');
    expect(nameInFormData).toBe('on');
});
