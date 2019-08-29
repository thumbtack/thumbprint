import React from 'react';
import { mount } from 'enzyme';
import noop from 'lodash/noop';
import ModalDefault, {
    ModalDefaultHeader,
    ModalDefaultTitle,
    ModalDefaultDescription,
    ModalDefaultContent,
    ModalDefaultFooter,
} from './index';

jest.useFakeTimers();

describe('ModalDefault', () => {
    test('renders a basic modal', () => {
        const wrapper = mount(<ModalDefault onCloseClick={noop} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a narrow modal', () => {
        const wrapper = mount(<ModalDefault width="narrow" onCloseClick={noop} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a wide modal', () => {
        const wrapper = mount(<ModalDefault width="wide" onCloseClick={noop} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('renders a medium height modal', () => {
        const wrapper = mount(
            <ModalDefault isOpen onCloseClick={noop} heightAboveSmall="medium" />,
        );
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
        const wrapper = mount(<ModalDefault isOpen onCloseClick={noop} heightAboveSmall="tall" />);
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
            <ModalDefault onCloseClick={noop}>
                <p>Hi there!</p>
                <button type="button">Submit</button>
            </ModalDefault>,
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('does not show the close button if `shouldHideCloseButton` is true', () => {
        const wrapper = mount(<ModalDefault onCloseClick={noop} shouldHideCloseButton />);
        expect(wrapper.find('NavigationCloseSmall').exists()).toBe(false);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('shows the close button if `shouldHideCloseButton` is false', () => {
        const wrapper = mount(<ModalDefault onCloseClick={noop} shouldHideCloseButton={false} />);
        expect(wrapper.find('NavigationCloseSmall').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    test('closes when clicking on the curtain if `shouldCloseOnCurtainClick`', () => {
        const onCloseClick = jest.fn();
        const wrapper = mount(
            <ModalDefault isOpen onCloseClick={onCloseClick} shouldCloseOnCurtainClick />,
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
            <ModalDefault isOpen onCloseClick={onCloseClick} shouldCloseOnCurtainClick={false} />,
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
            <ModalDefault isOpen={false} onCloseClick={noop} onOpenFinish={onOpenFinish} />,
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

        const wrapper = mount(
            <ModalDefault isOpen onCloseClick={noop} onOpenFinish={onOpenFinish} />,
        );

        jest.runAllTimers();

        expect(onOpenFinish).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });

    test('calls `onCloseFinish` when closing is finished', () => {
        const onCloseFinish = jest.fn();
        const wrapper = mount(
            <ModalDefault isOpen onCloseClick={noop} onCloseFinish={onCloseFinish} />,
        );

        expect(onCloseFinish).toHaveBeenCalledTimes(0);

        wrapper.setProps({ isOpen: false });

        jest.runAllTimers();

        expect(onCloseFinish).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });
});

describe('ModalDefaultHeader', () => {
    test('renders a basic header', () => {
        const wrapper = mount(<ModalDefaultHeader>Goose</ModalDefaultHeader>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalDefaultTitle', () => {
    test('renders a basic title', () => {
        const wrapper = mount(<ModalDefaultTitle>Goose</ModalDefaultTitle>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalDefaultDescription', () => {
    test('renders a basic description', () => {
        const wrapper = mount(<ModalDefaultDescription>Goose</ModalDefaultDescription>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalDefaultContent', () => {
    test('renders contents', () => {
        const wrapper = mount(<ModalDefaultContent>Goose</ModalDefaultContent>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('ModalDefaultFooter', () => {
    test('renders a non-sticky footer', () => {
        const wrapper = mount(<ModalDefaultFooter isSticky={false}>Goose</ModalDefaultFooter>);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders a sticky footer', () => {
        const wrapper = mount(
            <ModalDefault onCloseClick={noop}>
                <ModalDefaultFooter isSticky>Goose</ModalDefaultFooter>
            </ModalDefault>,
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });
});
