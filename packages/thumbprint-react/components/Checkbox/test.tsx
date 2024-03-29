import React from 'react';
import { mount } from 'enzyme';
import Checkbox from './index';

test('renders checkbox input', () => {
    const wrapper = mount(<Checkbox onChange={jest.fn()}>Goose</Checkbox>);
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
    expect(wrapper).toMatchSnapshot();
});

test('renders `children` passed in', () => {
    const wrapper = mount(<Checkbox onChange={jest.fn()}>Goose</Checkbox>);
    expect(wrapper.text()).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('if no `children` are passed in', () => {
    const wrapper = mount(<Checkbox onChange={jest.fn()} id="no-children" />);
    expect(wrapper).toMatchSnapshot();
});

test('renders `input` within `label`', () => {
    const wrapper = mount(<Checkbox onChange={jest.fn()}>Goose</Checkbox>);
    expect(wrapper.find('label input').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('adds `disabled` attribute', () => {
    const wrapper = mount(
        <Checkbox isDisabled onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('input').prop('disabled')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
});

test('adds `name` attribute', () => {
    const wrapper = mount(
        <Checkbox name="ohhi" onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('input').prop('name')).toBe('ohhi');
    expect(wrapper).toMatchSnapshot();
});

test('is not checked by default', () => {
    const wrapper = mount(<Checkbox onChange={jest.fn()}>Goose</Checkbox>);
    expect(wrapper.find('input').prop('checked')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
});

test('is checked when `isChecked` is set to true', () => {
    const wrapper = mount(
        <Checkbox isChecked onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('input').prop('checked')).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('applies `labelPadding` as padding on the label', () => {
    const wrapper = mount(
        <Checkbox labelPadding="10px 20px" onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );

    expect((wrapper.find('label').prop('style') || {}).padding).toBe('10px 20px');
    expect(wrapper).toMatchSnapshot();
});

test('applies className corresponding to `checkboxVerticalAlign` on the label', () => {
    const wrapper = mount(
        <Checkbox checkboxVerticalAlign="top" onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );

    expect(wrapper.find('label').hasClass('rootCheckboxVerticalAlignTop'));
    expect(wrapper).toMatchSnapshot();
});

test('renders `hasError` state', () => {
    const wrapperA = mount(
        <Checkbox isChecked hasError onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    const wrapperB = mount(
        <Checkbox hasError onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );

    expect(wrapperA).toMatchSnapshot();
    expect(wrapperB).toMatchSnapshot();
});

test('calls `onChange` function when supplied', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Checkbox onChange={onChange}>Goose</Checkbox>);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(2);
});

test('passes correct new value and `id` to `onChange` function', () => {
    const onChange = jest.fn();

    const wrapper = mount(
        <Checkbox onChange={onChange} id="goose" isChecked>
            Goose
        </Checkbox>,
    );

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toHaveBeenCalledWith(
        false,
        'goose',
        expect.objectContaining({ type: 'change' }),
    );

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledWith(
        true,
        'goose',
        expect.objectContaining({ type: 'change' }),
    );
});

test('calls `onChange` with correct values when `isIndeterminate` is true ', () => {
    const onChange = jest.fn();
    const wrapper = mount(
        <Checkbox onChange={onChange} isIndeterminate isChecked>
            Goose
        </Checkbox>,
    );

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toHaveBeenCalledWith(
        false,
        undefined,
        expect.objectContaining({ type: 'change' }),
    );

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledWith(
        true,
        undefined,
        expect.objectContaining({ type: 'change' }),
    );
});

test('renders indeterminate SVG when both `isIndeterminate` and `isChecked` are true ', () => {
    const wrapper = mount(
        <Checkbox isIndeterminate isChecked onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('svg')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(
        <Checkbox dataTest="Duck" onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('input').prop('data-test')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});

test('adds `dataTestId` prop', () => {
    const wrapper = mount(
        <Checkbox dataTestId="Duck" onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('input').prop('data-testid')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});

test('adds `value` prop', () => {
    const wrapper = mount(
        <Checkbox value="Duck" onChange={jest.fn()}>
            Goose
        </Checkbox>,
    );
    expect(wrapper.find('input').prop('value')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});

test('`value` attribute is `"on"` in form data if prop is `undefined` and checkbox is checked', () => {
    // This test exists to prevent a regression caused by this bug:
    // https://github.com/thumbtack/thumbprint/issues/589
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
            <Checkbox isChecked value={undefined} name={name} onChange={(): void => {}}>
                Goose
            </Checkbox>
            <button type="submit">Submit</button>
        </form>,
    );

    wrapper.find('form').simulate('submit');
    expect(nameInFormData).toBe('on');
});

test('`value` attribute is `"on"` in form data if prop is not supplied and checkbox is checked', () => {
    // This test exists to prevent a regression caused by this bug:
    // https://github.com/thumbtack/thumbprint/issues/589
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
            <Checkbox isChecked name={name} onChange={(): void => {}}>
                Goose
            </Checkbox>
            <button type="submit">Submit</button>
        </form>,
    );

    wrapper.find('form').simulate('submit');
    expect(nameInFormData).toBe('on');
});
