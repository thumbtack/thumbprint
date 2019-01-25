import React from 'react';
import { mount } from 'enzyme';
import ModalBase from './index';

const ESC_KEY = 27;

test('renders a basic modal', () => {
    const wrapper = mount(<ModalBase onCloseClick={jest.fn} />);
    expect(wrapper).toMatchSnapshot();
});

test('renders a modal without animation', () => {
    const wrapper = mount(<ModalBase shouldAnimate={false} onCloseClick={jest.fn} />);
    expect(wrapper).toMatchSnapshot();
});

test('renders text that is passed in', () => {
    const wrapper = mount(
        <div>
            <button type="button" />
            <ModalBase onCloseClick={jest.fn}>Goose</ModalBase>
        </div>,
    );

    expect(wrapper.find('ModalBase').text()).toEqual('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('supports disabling the transitions', () => {
    const wrapper = mount(<ModalBase onCloseClick={jest.fn} shouldAnimate={false} />);
    expect(wrapper).toMatchSnapshot();
});

test('`onCloseClick` is not called when non-ESC keys are pressed', () => {
    const onCloseClick = jest.fn();
    mount(
        <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
            <button type="button" />
            Goose
        </ModalBase>,
    );

    expect(onCloseClick).toHaveBeenCalledTimes(0);

    // https://css-tricks.com/snippets/javascript/javascript-keycodes/
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 8 }));
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 }));
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 65 }));

    expect(onCloseClick).toHaveBeenCalledTimes(0);
});

test('`onCloseFinish` is called after close finishes', () => {
    jest.useFakeTimers();

    const onCloseFinish = jest.fn();
    const onCloseClick = jest.fn();

    const wrapper = mount(
        <ModalBase
            isOpen
            onCloseFinish={onCloseFinish}
            onCloseClick={onCloseClick}
            shouldCloseOnEscape
        >
            <button type="button" />
            Goose
        </ModalBase>,
    );

    expect(onCloseFinish).toHaveBeenCalledTimes(0);
    wrapper.setProps({ isOpen: false });
    jest.runAllTimers();
    expect(onCloseFinish).toHaveBeenCalledTimes(1);
});

test('`onOpenFinish` is called after open finishes', () => {
    jest.useFakeTimers();

    const onOpenFinish = jest.fn();
    const onCloseClick = jest.fn();

    const wrapper = mount(
        <ModalBase
            isOpen={false}
            onOpenFinish={onOpenFinish}
            onCloseClick={onCloseClick}
            shouldCloseOnEscape
        >
            <button type="button" />
            Goose
        </ModalBase>,
    );

    expect(onOpenFinish).toHaveBeenCalledTimes(0);
    wrapper.setProps({ isOpen: true });
    jest.runAllTimers();
    expect(onOpenFinish).toHaveBeenCalledTimes(1);
});

describe('closes modal on `ESC`', () => {
    test('when `isOpen` is `true` and `shouldCloseOnEscape` is `true`', () => {
        const onCloseClick = jest.fn();
        mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        expect(onCloseClick).toHaveBeenCalledTimes(0);

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);
    });

    test('when `isOpen` and `shouldCloseOnEscape` are `true`, become `false`, then become `true` again', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        expect(onCloseClick).toHaveBeenCalledTimes(0);

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ shouldCloseOnEscape: false, isOpen: false });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ shouldCloseOnEscape: true, isOpen: false });
        document.dispatchEvent(event);
        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ shouldCloseOnEscape: false, isOpen: true });
        document.dispatchEvent(event);
        expect(onCloseClick).toHaveBeenCalledTimes(1);

        // Both are now true, so the event listener should be reactiviated.
        wrapper.setProps({ shouldCloseOnEscape: true, isOpen: true });
        document.dispatchEvent(event);
        expect(onCloseClick).toHaveBeenCalledTimes(2);
    });
});

describe('does not close modal on `ESC`', () => {
    test('when `isOpen` is `false` and `shouldCloseOnEscape` is `true`', () => {
        const onCloseClick = jest.fn();
        mount(
            <ModalBase isOpen={false} onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(0);
    });

    test('when `isOpen` is `false` and `shouldCloseOnEscape` is `false`', () => {
        const onCloseClick = jest.fn();
        mount(
            <ModalBase isOpen={false} onCloseClick={onCloseClick} shouldCloseOnEscape={false}>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(0);
    });

    test('when `isOpen` is `true` and `shouldCloseOnEscape` is `false`', () => {
        const onCloseClick = jest.fn();
        mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape={false}>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(0);
    });

    test('when `isOpen` is `true` then changes to `false`', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ isOpen: false });

        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);
    });

    test('when `shouldCloseOnEscape` changes to `false` while mounted', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ shouldCloseOnEscape: false });

        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);
    });

    test('when `shouldCloseOnEscape` and `isOpen` change to `false` while mounted', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ shouldCloseOnEscape: false, isOpen: false });

        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);
    });

    test('when component is unmounted', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalBase isOpen onCloseClick={onCloseClick} shouldCloseOnEscape>
                <button type="button" />
                Goose
            </ModalBase>,
        );

        const event = new KeyboardEvent('keydown', { keyCode: ESC_KEY });
        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);

        wrapper.unmount();

        document.dispatchEvent(event);

        expect(onCloseClick).toHaveBeenCalledTimes(1);
    });
});
