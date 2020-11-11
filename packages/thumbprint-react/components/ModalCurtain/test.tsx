import React, { useState } from 'react';
import { mount } from 'enzyme';
import ModalCurtain from './index';

const ESC_KEY = 27;
const ENTER_KEY = 13;
const BACKSPACE_KEY = 8;
const SPACE_KEY = 32;
const LOWERCASE_A_KEY = 65;

describe('ModalCurtain', () => {
    test('renders a basic curtain', () => {
        const wrapper = mount(<ModalCurtain onCloseClick={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders modal in `exited` stage', () => {
        const wrapper = mount(<ModalCurtain stage="exited" onCloseClick={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders modal in `entering` stage', () => {
        const wrapper = mount(<ModalCurtain stage="entering" onCloseClick={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders modal in `entered` stage', () => {
        const wrapper = mount(<ModalCurtain stage="entered" onCloseClick={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders modal in `exiting` stage', () => {
        const wrapper = mount(<ModalCurtain stage="exiting" onCloseClick={jest.fn} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders `accessibilityLabel`', () => {
        const wrapper = mount(
            <ModalCurtain accessibilityLabel="goosegoosegoose" onCloseClick={jest.fn} />,
        );
        expect(wrapper.html()).toContain('goosegoosegoose');
        expect(wrapper).toMatchSnapshot();
    });

    test('`children` receives `curtainOnClick` and `curtainClassName`', () => {
        let obj: {
            curtainOnClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
            curtainClassName?: string;
        } = {};

        mount(
            <ModalCurtain onCloseClick={jest.fn}>
                {(args): JSX.Element => {
                    obj = args;
                    return <div />;
                }}
            </ModalCurtain>,
        );

        expect(obj.curtainOnClick).toBeTruthy();
        expect(obj.curtainClassName).toBeTruthy();
    });

    test("`children`'s `curtainOnClick` render prop calls `onCloseClick` prop when executed", () => {
        const onClick = jest.fn();

        const wrapper = mount(
            <ModalCurtain onCloseClick={onClick}>
                {({ curtainOnClick }): JSX.Element => (
                    <button data-test-id="goose" onClick={curtainOnClick} type="button" />
                )}
            </ModalCurtain>,
        );

        expect(onClick).toHaveBeenCalledTimes(0);

        wrapper.find('button[data-test-id="goose"]').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('renders text that is passed in', () => {
        const wrapper = mount(
            <div>
                <button type="button" />
                <ModalCurtain onCloseClick={jest.fn}>
                    {(): JSX.Element => <div>Goose</div>}
                </ModalCurtain>
            </div>,
        );

        expect(wrapper.find('ModalCurtain').text()).toEqual('Goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('initially traps focus to the root dialog node', () => {
        jest.useFakeTimers();

        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalCurtain stage="entered" onCloseClick={onCloseClick}>
                {(): JSX.Element => (
                    <>
                        <button type="button" />
                    </>
                )}
            </ModalCurtain>,
        );

        // Run setTimeouts() in focus-trap to completion
        jest.runAllTimers();

        const modalWrapper = wrapper.find('[role="dialog"]');
        expect(modalWrapper.is(':focus')).toBe(true);

        jest.useRealTimers();
    });

    test('initially focuses `initialFocus` element if provided', () => {
        jest.useFakeTimers();
        const onCloseClick = jest.fn();

        const Example = (): React.ReactElement => {
            const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

            return (
                <ModalCurtain stage="entered" onCloseClick={onCloseClick} initialFocus={inputRef}>
                    {(): JSX.Element => (
                        <div>
                            <button type="button" data-testid="button" />
                            <input
                                ref={(r): void => {
                                    setInputRef(r);
                                }}
                                data-testid="input"
                            />
                        </div>
                    )}
                </ModalCurtain>
            );
        };

        const wrapper = mount(<Example />);

        // Run setTimeouts() in focus-trap to completion
        jest.runAllTimers();

        // We don't want focus to be on the outside wrapper.
        const modalWrapper = wrapper.find('[role="dialog"]');
        expect(modalWrapper.is(':focus')).toBe(false);

        const button = wrapper.find('[data-testid="button"]');
        const input = wrapper.find('[data-testid="input"]');

        expect(button.is(':focus')).toBe(false);
        expect(input.is(':focus')).toBe(true);

        jest.useRealTimers();
    });

    test('`onCloseClick` is not called when non-ESC keys are pressed', () => {
        const onCloseClick = jest.fn();
        mount(<ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />);

        expect(onCloseClick).toHaveBeenCalledTimes(0);

        // NOTE: it seems that Enzyme does not respond to the standard properties on
        // `KeyboardEventInit`, either `code: 'Escape'` or `key: 'Escape'`. It only responds to
        // the deprecated property `keyCode`, which is not in the type defintion. As such we
        // have to cast the type here to prevent an error.
        document.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'Enter',
                code: 'Enter',
                keyCode: ENTER_KEY,
            } as KeyboardEventInit),
        );
        document.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'Backspace',
                code: 'Backspace',
                keyCode: BACKSPACE_KEY,
            } as KeyboardEventInit),
        );
        document.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'Space',
                code: 'Space',
                keyCode: SPACE_KEY,
            } as KeyboardEventInit),
        );
        document.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'a',
                code: 'a',
                keyCode: LOWERCASE_A_KEY,
            } as KeyboardEventInit),
        );

        expect(onCloseClick).toHaveBeenCalledTimes(0);
    });

    describe('closes modal on `ESC`', () => {
        test('when modal is open and `shouldCloseOnEscape` is `true`', () => {
            const onCloseClick = jest.fn();
            mount(<ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />);

            expect(onCloseClick).toHaveBeenCalledTimes(0);

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);
        });

        test('when modal is open and `shouldCloseOnEscape` are `true`, become closed and `false`, then become open and `true` again', () => {
            const onCloseClick = jest.fn();
            const wrapper = mount(
                <ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />,
            );

            expect(onCloseClick).toHaveBeenCalledTimes(0);

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.setProps({ shouldCloseOnEscape: false, stage: 'exited' });
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.setProps({ shouldCloseOnEscape: true, stage: 'exited' });
            document.dispatchEvent(event);
            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.setProps({ shouldCloseOnEscape: false, stage: 'entered' });
            document.dispatchEvent(event);
            expect(onCloseClick).toHaveBeenCalledTimes(1);

            // Both are now true, so the event listener should be reactiviated.
            wrapper.setProps({ shouldCloseOnEscape: true, stage: 'entered' });
            document.dispatchEvent(event);
            expect(onCloseClick).toHaveBeenCalledTimes(2);
        });
    });

    describe('does not close modal on `ESC`', () => {
        test('when modal is closed and `shouldCloseOnEscape` is `true`', () => {
            const onCloseClick = jest.fn();
            mount(<ModalCurtain stage="exited" onCloseClick={onCloseClick} shouldCloseOnEscape />);

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(0);
        });

        test('when modal is closed and `shouldCloseOnEscape` is `false`', () => {
            const onCloseClick = jest.fn();
            mount(
                <ModalCurtain
                    stage="exited"
                    onCloseClick={onCloseClick}
                    shouldCloseOnEscape={false}
                />,
            );

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(0);
        });

        test('when modal is open and `shouldCloseOnEscape` is `false`', () => {
            const onCloseClick = jest.fn();
            mount(
                <ModalCurtain
                    stage="entered"
                    onCloseClick={onCloseClick}
                    shouldCloseOnEscape={false}
                />,
            );

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(0);
        });

        test('when modal is open then changes to closed', () => {
            const onCloseClick = jest.fn();
            const wrapper = mount(
                <ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />,
            );

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.setProps({ stage: 'exited' });

            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);
        });

        test('when `shouldCloseOnEscape` changes to `false` while mounted', () => {
            const onCloseClick = jest.fn();
            const wrapper = mount(
                <ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />,
            );

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.setProps({ shouldCloseOnEscape: false });

            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);
        });

        test('when `shouldCloseOnEscape` changes to `false` and the modal close while mounted', () => {
            const onCloseClick = jest.fn();
            const wrapper = mount(
                <ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />,
            );

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.setProps({ shouldCloseOnEscape: false, stage: 'exited' });

            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);
        });

        test('when component is unmounted', () => {
            const onCloseClick = jest.fn();
            const wrapper = mount(
                <ModalCurtain stage="entered" onCloseClick={onCloseClick} shouldCloseOnEscape />,
            );

            const event = new KeyboardEvent('keyup', {
                key: 'Escape',
                code: 'Escape',
                keyCode: ESC_KEY,
            } as KeyboardEventInit);
            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);

            wrapper.unmount();

            document.dispatchEvent(event);

            expect(onCloseClick).toHaveBeenCalledTimes(1);
        });
    });
});
