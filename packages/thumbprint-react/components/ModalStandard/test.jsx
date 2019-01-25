import React from 'react';
import { mount } from 'enzyme';
import noop from 'lodash/noop';
import ModalStandard from './index';

test('renders a basic modal', () => {
    const wrapper = mount(<ModalStandard onCloseClick={noop} />);
    expect(wrapper).toMatchSnapshot();
});

test('renders a basic modal with content', () => {
    const wrapper = mount(
        <ModalStandard onCloseClick={noop}>
            <p>Hi there!</p>
            <button type="button">Submit</button>
        </ModalStandard>,
    );
    expect(wrapper).toMatchSnapshot();
});

test('does not show the close button if `shouldHideCloseButton` is true', () => {
    const wrapper = mount(<ModalStandard onCloseClick={noop} shouldHideCloseButton />);
    expect(wrapper.find('.closeButton').exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
});

test('shows the close button if `shouldHideCloseButton` is false', () => {
    const wrapper = mount(<ModalStandard onCloseClick={noop} shouldHideCloseButton={false} />);
    expect(wrapper.find('.closeButton').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
});
