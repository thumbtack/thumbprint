import React from 'react';
import { mount, render } from 'enzyme';
import noop from 'lodash/noop';
import TextInput, { TextInputClearButton, TextInputIcon } from './index';

describe('TextInput', () => {
    test('renders text input by default', () => {
        const wrapper = mount(<TextInput onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('text');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders email input when requested', () => {
        const wrapper = mount(<TextInput type="email" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('email');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders search input when requested', () => {
        const wrapper = mount(<TextInput type="search" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('search');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders telephone input when requested', () => {
        const wrapper = mount(<TextInput type="tel" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('tel');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders number input when requested', () => {
        const wrapper = mount(<TextInput type="number" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('number');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `id` attribute', () => {
        const wrapper = mount(<TextInput id="Goose" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('id')).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds placeholder', () => {
        const wrapper = mount(<TextInput placeholder="Name" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('placeholder')).toBe('Name');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `autocomplete` attribute', () => {
        const wrapper = mount(<TextInput autoComplete="given-name" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('autoComplete')).toBe('given-name');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds name', () => {
        const wrapper = mount(<TextInput name="my-input" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('name')).toBe('my-input');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `disabled` attribute', () => {
        const wrapper = mount(<TextInput isDisabled onChange={jest.fn} />);
        expect(wrapper.find('input').prop('disabled')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `required` attribute', () => {
        const wrapper = mount(<TextInput isRequired onChange={jest.fn} />);
        expect(wrapper.find('input').prop('required')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `readonly` attribute', () => {
        const wrapper = mount(<TextInput isReadOnly onChange={jest.fn} />);
        expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `autofocus` attribute', () => {
        const wrapper = mount(<TextInput shouldFocusOnPageLoad onChange={jest.fn} />);
        expect(wrapper.find('input').prop('autoFocus')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('renders `value` as the input value', () => {
        const wrapper = render(<TextInput value="Goose" onChange={jest.fn} />);
        expect(wrapper.find('input').attr('value')).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders small input', () => {
        const wrapper = mount(<TextInput size="small" onChange={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders large input', () => {
        const wrapper = mount(<TextInput size="large" onChange={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    describe('innerLeft', () => {
        test('renders `innerLeft` node when text is provided', () => {
            const wrapper = mount(<TextInput innerLeft="Goose" onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `innerLeft` node when HTML element is provided', () => {
            const wrapper = mount(<TextInput innerLeft={<div>Goose</div>} onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('innerRight', () => {
        test('renders `innerRight` node when text is provided', () => {
            const wrapper = mount(<TextInput innerRight="Goose" onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `innerRight` node when HTML element is provided', () => {
            const wrapper = mount(<TextInput innerRight={<div>Goose</div>} onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });
    });

    test('calls `onChange` function when text changes and supplies new value as the first argument and the whole event as the second', () => {
        const onChange = jest.fn();

        const wrapper = mount(<TextInput onChange={onChange} />);

        const firstEvent = { target: { value: 'He' } };
        const secondEvent = { target: { value: 'Hello' } };

        wrapper.find('input').simulate('change', firstEvent);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(
            firstEvent.target.value,
            expect.objectContaining({
                target: expect.any(Object),
            }),
        );

        wrapper.find('input').simulate('change', secondEvent);
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith(
            secondEvent.target.value,
            expect.objectContaining({
                target: expect.any(Object),
            }),
        );
    });

    test('calls `onClick` function when clicked on', () => {
        const onClick = jest.fn();

        const wrapper = mount(<TextInput onClick={onClick} onChange={jest.fn} />);

        wrapper.find('input').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);

        wrapper.find('input').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    test('calls `onBlur` function when blur event occurs', () => {
        const onBlur = jest.fn();

        const wrapper = mount(<TextInput onBlur={onBlur} onChange={jest.fn} />);

        wrapper.find('input').simulate('blur');
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    test('calls `onKeyDown` when a keydown event occurs', () => {
        const onKeyDown = jest.fn();

        const wrapper = mount(<TextInput onKeyDown={onKeyDown} onChange={jest.fn} />);

        wrapper.find('input').simulate('keydown');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    test('calls `onKeyUp` when a keydown event occurs', () => {
        const onKeyUp = jest.fn();

        const wrapper = mount(<TextInput onKeyUp={onKeyUp} onChange={jest.fn} />);

        wrapper.find('input').simulate('keyup');
        expect(onKeyUp).toHaveBeenCalledTimes(1);
    });

    test('calls `onKeyPress` when a keypress event occurs', () => {
        const onKeyPress = jest.fn();

        const wrapper = mount(<TextInput onKeyPress={onKeyPress} onChange={jest.fn} />);

        wrapper.find('input').simulate('keypress');
        expect(onKeyPress).toHaveBeenCalledTimes(1);
    });

    test('focuses the input when `innerLeft` icon is clicked', () => {
        const component = mount(
            <TextInput
                onChange={jest.fn}
                innerLeft={<div data-test="Duck">Duck</div>}
                id="Goose"
            />,
        );

        const innerLeft = component.find('[data-test="Duck"]');
        innerLeft.simulate('click');

        expect(document.activeElement ? document.activeElement.id : '').toBe('Goose');
    });

    test('focuses the input when `innerRight` icon is clicked', () => {
        const component = mount(
            <TextInput
                onChange={jest.fn}
                innerRight={<div data-test="Duck">Duck</div>}
                id="Goose"
            />,
        );

        const innerRight = component.find('[data-test="Duck"]');
        innerRight.simulate('click');

        expect(document.activeElement ? document.activeElement.id : '').toBe('Goose');
    });

    test('adds `dataTest` prop', () => {
        const wrapper = mount(<TextInput dataTest="Duck" onChange={noop} />);
        expect(wrapper.find('input').prop('data-test')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `inputMode` prop', () => {
        const wrapper = mount(<TextInput inputMode="numeric" onChange={noop} />);
        expect(wrapper.find('input').prop('inputMode')).toEqual('numeric');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `pattern` prop', () => {
        const wrapper = mount(<TextInput pattern="[0-9]{5}" onChange={noop} />);
        expect(wrapper.find('input').prop('pattern')).toEqual('[0-9]{5}');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `maxLength` prop', () => {
        const wrapper = mount(<TextInput maxLength={5} onChange={noop} />);
        expect(wrapper.find('input').prop('maxLength')).toEqual(5);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('TextInputClearButton', () => {
    test('calls `onClick` function when clicked on', () => {
        const onClick = jest.fn();

        const wrapper = mount(<TextInputClearButton onClick={onClick} />);

        wrapper.find('button').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);

        wrapper.find('button').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    test('includes `aria-label` on button to describe the SVG icon', () => {
        const wrapper = mount(<TextInputClearButton onClick={jest.fn} />);
        expect(wrapper.find('button[aria-label]')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders an SVG icon', () => {
        const wrapper = mount(<TextInputClearButton onClick={jest.fn} />);
        expect(wrapper.find('svg')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('TextInputIcon', () => {
    test('renders children', () => {
        const wrapper = mount(
            <TextInputIcon>
                <svg>
                    <title>Goose</title>
                </svg>
            </TextInputIcon>,
        );
        expect(wrapper.text()).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('applies color prop', () => {
        const wrapper = mount(<TextInputIcon color="LightGoldenRodYellow">Goose</TextInputIcon>);
        expect(wrapper).toMatchSnapshot();
    });
});
