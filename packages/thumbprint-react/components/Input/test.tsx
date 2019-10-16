import React from 'react';
import { mount, render } from 'enzyme';
import noop from 'lodash/noop';
import Input, { InputClearButton, InputIcon } from './index';

describe('Input', () => {
    test('renders text input by default', () => {
        const wrapper = mount(<Input onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('text');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders email input when requested', () => {
        const wrapper = mount(<Input type="email" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('email');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders search input when requested', () => {
        const wrapper = mount(<Input type="search" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('search');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders telephone input when requested', () => {
        const wrapper = mount(<Input type="tel" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('tel');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders number input when requested', () => {
        const wrapper = mount(<Input type="number" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('type')).toBe('number');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `id` attribute', () => {
        const wrapper = mount(<Input id="Goose" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('id')).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds placeholder', () => {
        const wrapper = mount(<Input placeholder="Name" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('placeholder')).toBe('Name');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `autocomplete` attribute', () => {
        const wrapper = mount(<Input autoComplete="given-name" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('autoComplete')).toBe('given-name');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds name', () => {
        const wrapper = mount(<Input name="my-input" onChange={jest.fn} />);
        expect(wrapper.find('input').prop('name')).toBe('my-input');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `disabled` attribute', () => {
        const wrapper = mount(<Input isDisabled onChange={jest.fn} />);
        expect(wrapper.find('input').prop('disabled')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `required` attribute', () => {
        const wrapper = mount(<Input isRequired onChange={jest.fn} />);
        expect(wrapper.find('input').prop('required')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `readonly` attribute', () => {
        const wrapper = mount(<Input isReadOnly onChange={jest.fn} />);
        expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `autofocus` attribute', () => {
        const wrapper = mount(<Input shouldFocusOnPageLoad onChange={jest.fn} />);
        expect(wrapper.find('input').prop('autoFocus')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('renders `value` as the input value', () => {
        const wrapper = render(<Input value="Goose" onChange={jest.fn} />);
        expect(wrapper.find('input').attr('value')).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders small input', () => {
        const wrapper = mount(<Input size="small" onChange={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders large input', () => {
        const wrapper = mount(<Input size="large" onChange={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    describe('innerLeft', () => {
        test('renders `innerLeft` node when text is provided', () => {
            const wrapper = mount(<Input innerLeft="Goose" onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `innerLeft` node when HTML element is provided', () => {
            const wrapper = mount(<Input innerLeft={<div>Goose</div>} onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('innerRight', () => {
        test('renders `innerRight` node when text is provided', () => {
            const wrapper = mount(<Input innerRight="Goose" onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `innerRight` node when HTML element is provided', () => {
            const wrapper = mount(<Input innerRight={<div>Goose</div>} onChange={jest.fn} />);
            expect(wrapper.find('.inputInnerElement').text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });
    });

    test('calls `onChange` function when text changes and supplies new value as the first argument and the whole event as the second', () => {
        const onChange = jest.fn();

        const wrapper = mount(<Input onChange={onChange} />);

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

        const wrapper = mount(<Input onClick={onClick} onChange={jest.fn} />);

        wrapper.find('input').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);

        wrapper.find('input').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    test('calls `onBlur` function when blur event occurs', () => {
        const onBlur = jest.fn();

        const wrapper = mount(<Input onBlur={onBlur} onChange={jest.fn} />);

        wrapper.find('input').simulate('blur');
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    test('calls `onKeyDown` when a keydown event occurs', () => {
        const onKeyDown = jest.fn();

        const wrapper = mount(<Input onKeyDown={onKeyDown} onChange={jest.fn} />);

        wrapper.find('input').simulate('keydown');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    test('calls `onKeyUp` when a keydown event occurs', () => {
        const onKeyUp = jest.fn();

        const wrapper = mount(<Input onKeyUp={onKeyUp} onChange={jest.fn} />);

        wrapper.find('input').simulate('keyup');
        expect(onKeyUp).toHaveBeenCalledTimes(1);
    });

    test('calls `onKeyPress` when a keypress event occurs', () => {
        const onKeyPress = jest.fn();

        const wrapper = mount(<Input onKeyPress={onKeyPress} onChange={jest.fn} />);

        wrapper.find('input').simulate('keypress');
        expect(onKeyPress).toHaveBeenCalledTimes(1);
    });

    test('focuses the input when `innerLeft` icon is clicked', () => {
        const component = mount(
            <Input onChange={jest.fn} innerLeft={<div data-test="Duck">Duck</div>} id="Goose" />,
        );

        const innerLeft = component.find('[data-test="Duck"]');
        innerLeft.simulate('click');

        expect(document.activeElement ? document.activeElement.id : '').toBe('Goose');
    });

    test('focuses the input when `innerRight` icon is clicked', () => {
        const component = mount(
            <Input onChange={jest.fn} innerRight={<div data-test="Duck">Duck</div>} id="Goose" />,
        );

        const innerRight = component.find('[data-test="Duck"]');
        innerRight.simulate('click');

        expect(document.activeElement ? document.activeElement.id : '').toBe('Goose');
    });

    test('adds `dataTest` prop', () => {
        const wrapper = mount(<Input dataTest="Duck" onChange={noop} />);
        expect(wrapper.find('input').prop('data-test')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `inputMode` prop', () => {
        const wrapper = mount(<Input inputMode="numeric" onChange={noop} />);
        expect(wrapper.find('input').prop('inputMode')).toEqual('numeric');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `pattern` prop', () => {
        const wrapper = mount(<Input pattern="[0-9]{5}" onChange={noop} />);
        expect(wrapper.find('input').prop('pattern')).toEqual('[0-9]{5}');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `maxLength` prop', () => {
        const wrapper = mount(<Input maxLength={5} onChange={noop} />);
        expect(wrapper.find('input').prop('maxLength')).toEqual(5);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('InputClearButton', () => {
    test('calls `onClick` function when clicked on', () => {
        const onClick = jest.fn();

        const wrapper = mount(<InputClearButton onClick={onClick} />);

        wrapper.find('button').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);

        wrapper.find('button').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    test('includes `aria-label` on button to describe the SVG icon', () => {
        const wrapper = mount(<InputClearButton onClick={jest.fn} />);
        expect(wrapper.find('button[aria-label]')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders an SVG icon', () => {
        const wrapper = mount(<InputClearButton onClick={jest.fn} />);
        expect(wrapper.find('svg')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('InputIcon', () => {
    test('renders children', () => {
        const wrapper = mount(
            <InputIcon>
                <svg>
                    <title>Goose</title>
                </svg>
            </InputIcon>,
        );
        expect(wrapper.text()).toBe('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('applies color prop', () => {
        const wrapper = mount(<InputIcon color="LightGoldenRodYellow">Goose</InputIcon>);
        expect(wrapper).toMatchSnapshot();
    });
});
