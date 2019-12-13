import React from 'react';
import { mount } from 'enzyme';
import noop from 'lodash/noop';
import Modal, {
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
} from './index';

jest.useFakeTimers();

describe('Modal', () => {
    test('renders a basic modal', () => {
        const wrapper = mount(<Modal onCloseClick={noop} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a narrow modal', () => {
        const wrapper = mount(<Modal width="narrow" onCloseClick={noop} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a wide modal', () => {
        const wrapper = mount(<Modal width="wide" onCloseClick={noop} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a medium height modal', () => {
        const wrapper = mount(<Modal isOpen onCloseClick={noop} heightAboveSmall="medium" />);
        expect(
            wrapper.find('[data-test="thumbprint-modal-wrapper"]').hasClass('wrapperHeightMedium'),
        );
        expect(
            wrapper
                .find('[data-test="thumbprint-modal-container"]')
                .hasClass('containerFixedHeight'),
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a tall height modal', () => {
        const wrapper = mount(<Modal isOpen onCloseClick={noop} heightAboveSmall="tall" />);
        expect(
            wrapper.find('[data-test="thumbprint-modal-wrapper"]').hasClass('wrapperHeightTall'),
        );
        expect(
            wrapper
                .find('[data-test="thumbprint-modal-container"]')
                .hasClass('containerFixedHeight'),
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a basic modal with content', () => {
        const wrapper = mount(
            <Modal onCloseClick={noop}>
                <p>Hi there!</p>
                <button type="button">Submit</button>
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('does not show the close button if `shouldHideCloseButton` is true', () => {
        const wrapper = mount(<Modal onCloseClick={noop} shouldHideCloseButton />);
        expect(wrapper.find('NavigationCloseSmall').exists()).toBe(false);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('shows the close button if `shouldHideCloseButton` is false', () => {
        const wrapper = mount(<Modal onCloseClick={noop} shouldHideCloseButton={false} />);
        expect(wrapper.find('NavigationCloseSmall').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('closes when clicking on the curtain if `shouldCloseOnCurtainClick`', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <Modal isOpen onCloseClick={onCloseClick} shouldCloseOnCurtainClick />,
        );

        jest.runAllTimers();

        expect(onCloseClick).toHaveBeenCalledTimes(0);

        wrapper.find('[data-test="thumbprint-modal-curtain"]').simulate('click');

        expect(onCloseClick).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });

    test('does not close when clicking on the curtain if `shouldCloseOnCurtainClick` is false', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <Modal isOpen onCloseClick={onCloseClick} shouldCloseOnCurtainClick={false} />,
        );

        jest.runAllTimers();

        expect(onCloseClick).toHaveBeenCalledTimes(0);

        wrapper.find('[data-test="thumbprint-modal-curtain"]').simulate('click');

        expect(onCloseClick).toHaveBeenCalledTimes(0);
        wrapper.unmount();
    });

    test('calls `onOpenFinish` when opening is finished', () => {
        const onOpenFinish = jest.fn();
        const wrapper = mount(
            <Modal isOpen={false} onCloseClick={noop} onOpenFinish={onOpenFinish} />,
        );

        expect(onOpenFinish).toHaveBeenCalledTimes(0);

        wrapper.setProps({ isOpen: true });

        jest.runAllTimers();

        expect(onOpenFinish).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });

    test('calls `onOpenFinish` when opened on mount', () => {
        const onOpenFinish = jest.fn();

        expect(onOpenFinish).toHaveBeenCalledTimes(0);

        const wrapper = mount(<Modal isOpen onCloseClick={noop} onOpenFinish={onOpenFinish} />);

        jest.runAllTimers();

        expect(onOpenFinish).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });

    test('calls `onCloseFinish` when closing is finished', () => {
        const onCloseFinish = jest.fn();
        const wrapper = mount(<Modal isOpen onCloseClick={noop} onCloseFinish={onCloseFinish} />);

        expect(onCloseFinish).toHaveBeenCalledTimes(0);

        wrapper.setProps({ isOpen: false });

        jest.runAllTimers();

        expect(onCloseFinish).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });
});

describe('ModalHeader', () => {
    test('renders a basic header', () => {
        const wrapper = mount(<ModalHeader>Goose</ModalHeader>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalTitle', () => {
    test('renders a basic title', () => {
        const wrapper = mount(<ModalTitle>Goose</ModalTitle>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalDescription', () => {
    test('renders a basic description', () => {
        const wrapper = mount(<ModalDescription>Goose</ModalDescription>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalContent', () => {
    test('renders contents', () => {
        const wrapper = mount(<ModalContent>Goose</ModalContent>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalFooter', () => {
    test('renders a non-sticky footer', () => {
        const wrapper = mount(<ModalFooter isSticky={false}>Goose</ModalFooter>);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders a sticky footer', () => {
        const wrapper = mount(
            <Modal onCloseClick={noop}>
                <ModalFooter isSticky>Goose</ModalFooter>
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });
});
