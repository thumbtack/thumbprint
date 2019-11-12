import React from 'react';
import { mount } from 'enzyme';
import InputRow from '../InputRow/index.jsx';
import { Themed, Plain } from './index';

describe('Plain', (): void => {
    describe('<a>', (): void => {
        test('renders `children` passed in', (): void => {
            const wrapper = mount(<Plain to="https://example.com/">Goose</Plain>);
            expect(wrapper.text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders a anchor tag when a `to` is provided', (): void => {
            const wrapper = mount(<Plain to="https://example.com/">Goose</Plain>);
            expect(wrapper.find('button')).toHaveLength(0);
            expect(wrapper.find('a')).toHaveLength(1);
            expect(wrapper).toMatchSnapshot();
        });

        test('renders a anchor tag when both `to` and `onClick` are provided', (): void => {
            const wrapper = mount(
                <Plain to="https://example.com/" onClick={jest.fn}>
                    Goose
                </Plain>,
            );
            expect(wrapper.find('button')).toHaveLength(0);
            expect(wrapper.find('a')).toHaveLength(1);
            expect(wrapper).toMatchSnapshot();
        });

        test('adds `rel="noopener noreferrer"` attribute for external links to handle security vulnerability', (): void => {
            const wrapper = mount(
                <Plain shouldOpenInNewTab to="https://example.com/">
                    Goose
                </Plain>,
            );
            expect(wrapper.find('a').prop('rel')).toEqual('noopener noreferrer');
            expect(wrapper).toMatchSnapshot();
        });

        test('adds `rel="noopener"` attribute for internal links that open new tab', (): void => {
            const wrapperDomain = mount(
                <Plain shouldOpenInNewTab to="https://www.thumbtack.com/foo">
                    Goose
                </Plain>,
            );
            const wrapperRootRelative = mount(
                <Plain shouldOpenInNewTab to="/foo">
                    Goose
                </Plain>,
            );
            const wrapperHash = mount(
                <Plain shouldOpenInNewTab to="#foo">
                    Goose
                </Plain>,
            );
            expect(wrapperDomain.find('a').prop('rel')).toEqual('noopener');
            expect(wrapperDomain).toMatchSnapshot();

            expect(wrapperRootRelative.find('a').prop('rel')).toEqual('noopener');
            expect(wrapperRootRelative).toMatchSnapshot();

            expect(wrapperHash.find('a').prop('rel')).toEqual('noopener');
            expect(wrapperHash).toMatchSnapshot();
        });

        test('omits `rel` attribute for links that open in the same tab', (): void => {
            const wrapperDomain = mount(<Plain to="https://www.thumbtack.com/foo">Goose</Plain>);
            const wrapperRootRelative = mount(<Plain to="/foo">Goose</Plain>);
            const wrapperHash = mount(<Plain to="#foo">Goose</Plain>);
            const wrapperExternal = mount(<Plain to="https://example.com/">Goose</Plain>);
            expect(wrapperDomain.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperDomain).toMatchSnapshot();

            expect(wrapperRootRelative.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperRootRelative).toMatchSnapshot();

            expect(wrapperHash.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperHash).toMatchSnapshot();

            expect(wrapperExternal.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperExternal).toMatchSnapshot();
        });

        test('adds attribute to open link in new tab', (): void => {
            const wrapper = mount(
                <Plain shouldOpenInNewTab to="https://example.com/">
                    Goose
                </Plain>,
            );
            expect(wrapper.find('a').prop('target')).toEqual('_blank');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `to` prop as `href`', (): void => {
            const wrapper = mount(<Plain to="https://example.com/">Goose</Plain>);
            expect(wrapper.find('a').prop('href')).toBe('https://example.com/');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `onClick`', (): void => {
            const onClick = jest.fn();
            const wrapper = mount(
                <Plain to="https://example.com/" onClick={onClick}>
                    Goose
                </Plain>,
            );
            expect(onClick).toHaveBeenCalledTimes(0);
            wrapper.simulate('click');
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        test('removes `href` if link is disabled', (): void => {
            const wrapper = mount(
                <Plain isDisabled to="https://example.com/">
                    Goose
                </Plain>,
            );
            expect(wrapper.find('a').prop('href')).toBeFalsy();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('<button>', (): void => {
        test('renders children passed in', (): void => {
            const wrapper = mount(<Plain>Goose</Plain>);
            expect(wrapper.text()).toEqual('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders button of type `button`', (): void => {
            const wrapper = mount(<Plain onClick={jest.fn}>Goose</Plain>);
            expect(wrapper.find('button').prop('type')).toEqual('button');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders a button when an `onClick` is provided', (): void => {
            const wrapper = mount(<Plain onClick={jest.fn}>Goose</Plain>);
            expect(wrapper.find('button')).toHaveLength(1);
            expect(wrapper.find('a')).toHaveLength(0);
            expect(wrapper).toMatchSnapshot();
        });

        test('`onClick` runs when button is clicked on', (): void => {
            const onClick = jest.fn();
            const wrapper = mount(<Plain onClick={onClick}>Goose</Plain>);

            expect(onClick).toHaveBeenCalledTimes(0);
            wrapper.simulate('click');
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        test('`onMouseEnter` runs when button is clicked on', (): void => {
            const onMouseEnter = jest.fn();
            const wrapper = mount(<Plain onMouseEnter={onMouseEnter}>Goose</Plain>);

            expect(onMouseEnter).toHaveBeenCalledTimes(0);
            wrapper.simulate('mouseenter');
            expect(onMouseEnter).toHaveBeenCalledTimes(1);
        });

        test('`onMouseOver` runs when button is clicked on', (): void => {
            const onMouseOver = jest.fn();
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            const wrapper = mount(<Plain onMouseOver={onMouseOver}>Goose</Plain>);

            expect(onMouseOver).toHaveBeenCalledTimes(0);
            wrapper.simulate('mouseover');
            expect(onMouseOver).toHaveBeenCalledTimes(1);
        });

        test('`onMouseLeave` runs when button is clicked on', (): void => {
            const onMouseLeave = jest.fn();
            const wrapper = mount(<Plain onMouseLeave={onMouseLeave}>Goose</Plain>);

            expect(onMouseLeave).toHaveBeenCalledTimes(0);
            wrapper.simulate('mouseleave');
            expect(onMouseLeave).toHaveBeenCalledTimes(1);
        });

        test('`onFocus` runs when button is clicked on', (): void => {
            const onFocus = jest.fn();
            const wrapper = mount(<Plain onFocus={onFocus}>Goose</Plain>);

            expect(onFocus).toHaveBeenCalledTimes(0);
            wrapper.simulate('focus');
            expect(onFocus).toHaveBeenCalledTimes(1);
        });

        test('`onBlur` runs when button is clicked on', (): void => {
            const onBlur = jest.fn();
            const wrapper = mount(<Plain onBlur={onBlur}>Goose</Plain>);

            expect(onBlur).toHaveBeenCalledTimes(0);
            wrapper.simulate('blur');
            expect(onBlur).toHaveBeenCalledTimes(1);
        });
    });

    test('renders primary theme', (): void => {
        const wrapperA = mount(<Plain theme="primary">Goose</Plain>);
        const wrapperB = mount(
            <Plain theme="primary" isDisabled>
                Goose
            </Plain>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders secondary theme', (): void => {
        const wrapperA = mount(<Plain theme="secondary">Goose</Plain>);
        const wrapperB = mount(
            <Plain theme="secondary" isDisabled>
                Goose
            </Plain>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders tertiary theme', (): void => {
        const wrapperA = mount(<Plain theme="tertiary">Goose</Plain>);
        const wrapperB = mount(
            <Plain theme="tertiary" isDisabled>
                Goose
            </Plain>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders inherit theme', (): void => {
        const wrapperA = mount(<Plain theme="inherit">Goose</Plain>);
        const wrapperB = mount(
            <Plain theme="inherit" isDisabled>
                Goose
            </Plain>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders icon that is passed in', (): void => {
        const wrapper = mount(<Plain iconLeft={<svg>Duck</svg>}>Goose</Plain>);
        expect(wrapper.find('svg')).toHaveLength(1);
        expect(wrapper.text()).toBe('DuckGoose');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders right icon that is passed in', (): void => {
        const wrapper = mount(<Plain iconRight={<svg>Duck</svg>}>Goose</Plain>);
        expect(wrapper.find('svg')).toHaveLength(1);
        expect(wrapper.text()).toBe('GooseDuck');
        expect(wrapper).toMatchSnapshot();
    });

    test('left and right icons can be used together', (): void => {
        const wrapper = mount(
            <Plain iconLeft={<svg>Swan</svg>} iconRight={<svg>Duck</svg>}>
                Goose
            </Plain>,
        );
        expect(wrapper.find('svg')).toHaveLength(2);
        expect(wrapper.text()).toBe('SwanGooseDuck');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds proper accessibility attribute', (): void => {
        const wrapper = mount(<Plain accessibilityLabel="Duck">Goose</Plain>);
        expect(wrapper.find('button').prop('aria-label')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `dataTest` prop', (): void => {
        const wrapperA = mount(<Plain dataTest="Duck">Goose</Plain>);
        expect(wrapperA.find('button').prop('data-test')).toEqual('Duck');
        expect(wrapperA).toMatchSnapshot();

        const wrapperB = mount(
            <Plain to="#" dataTest="Duck">
                Goose
            </Plain>,
        );
        expect(wrapperB.find('a').prop('data-test')).toEqual('Duck');
        expect(wrapperB).toMatchSnapshot();
    });
});

describe('Themed', (): void => {
    describe('<a>', (): void => {
        test('renders `children` passed in', (): void => {
            const wrapper = mount(<Themed to="https://example.com/">Goose</Themed>);
            expect(wrapper.text()).toBe('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders a anchor tag when a `to` is provided', (): void => {
            const wrapper = mount(<Themed to="https://example.com/">Goose</Themed>);
            expect(wrapper.find('button')).toHaveLength(0);
            expect(wrapper.find('a')).toHaveLength(1);
            expect(wrapper).toMatchSnapshot();
        });

        test('renders an anchor tag when both `to` and `onClick` are provided', (): void => {
            const wrapper = mount(
                <Themed to="https://example.com/" onClick={jest.fn}>
                    Goose
                </Themed>,
            );
            expect(wrapper.find('button')).toHaveLength(0);
            expect(wrapper.find('a')).toHaveLength(1);
            expect(wrapper).toMatchSnapshot();
        });

        test('adds `rel` attribute to handle security vulnerability', (): void => {
            const wrapper = mount(
                <Themed shouldOpenInNewTab to="https://example.com/">
                    Goose
                </Themed>,
            );
            expect(wrapper.find('a').prop('rel')).toEqual('noopener noreferrer');
            expect(wrapper).toMatchSnapshot();
        });

        test('adds `rel="noopener"` attribute for internal links that open new tab', (): void => {
            const wrapperDomain = mount(
                <Themed shouldOpenInNewTab to="https://www.thumbtack.com/foo">
                    Goose
                </Themed>,
            );
            const wrapperRootRelative = mount(
                <Themed shouldOpenInNewTab to="/foo">
                    Goose
                </Themed>,
            );
            const wrapperHash = mount(
                <Themed shouldOpenInNewTab to="#foo">
                    Goose
                </Themed>,
            );
            expect(wrapperDomain.find('a').prop('rel')).toEqual('noopener');
            expect(wrapperDomain).toMatchSnapshot();

            expect(wrapperRootRelative.find('a').prop('rel')).toEqual('noopener');
            expect(wrapperRootRelative).toMatchSnapshot();

            expect(wrapperHash.find('a').prop('rel')).toEqual('noopener');
            expect(wrapperHash).toMatchSnapshot();
        });

        test('omits `rel` attribute for links that open in the same tab', (): void => {
            const wrapperDomain = mount(<Plain to="https://www.thumbtack.com/foo">Goose</Plain>);
            const wrapperRootRelative = mount(<Plain to="/foo">Goose</Plain>);
            const wrapperHash = mount(<Plain to="#foo">Goose</Plain>);
            const wrapperExternal = mount(<Plain to="https://example.com/">Goose</Plain>);
            expect(wrapperDomain.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperDomain).toMatchSnapshot();

            expect(wrapperRootRelative.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperRootRelative).toMatchSnapshot();

            expect(wrapperHash.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperHash).toMatchSnapshot();

            expect(wrapperExternal.find('a').prop('rel')).toEqual(undefined);
            expect(wrapperExternal).toMatchSnapshot();
        });

        test('adds attribute to open link in new tab', (): void => {
            const wrapper = mount(
                <Themed shouldOpenInNewTab to="https://example.com/">
                    Goose
                </Themed>,
            );
            expect(wrapper.find('a').prop('target')).toEqual('_blank');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders `to` prop as `href`', (): void => {
            const wrapper = mount(<Themed to="https://example.com/">Goose</Themed>);
            expect(wrapper.find('a').prop('href')).toBe('https://example.com/');
            expect(wrapper).toMatchSnapshot();
        });

        test('removes `href` if link is disabled', (): void => {
            const wrapper = mount(
                <Themed isDisabled to="https://example.com/">
                    Goose
                </Themed>,
            );
            expect(wrapper.find('a').prop('href')).toBeFalsy();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('<button>', (): void => {
        test('renders children passed in', (): void => {
            const wrapper = mount(<Themed>Goose</Themed>);
            expect(wrapper.text()).toEqual('Goose');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders button of type `button`', (): void => {
            const wrapper = mount(<Plain onClick={jest.fn}>Goose</Plain>);
            expect(wrapper.find('button').prop('type')).toEqual('button');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders button of type `submit` if provided', (): void => {
            const wrapper = mount(
                <Plain onClick={jest.fn} type="submit">
                    Goose
                </Plain>,
            );
            expect(wrapper.find('button').prop('type')).toEqual('submit');
            expect(wrapper).toMatchSnapshot();
        });

        test('renders a button when an `onClick` is provided', (): void => {
            const wrapper = mount(<Themed onClick={jest.fn}>Goose</Themed>);
            expect(wrapper.find('button')).toHaveLength(1);
            expect(wrapper.find('a')).toHaveLength(0);
            expect(wrapper).toMatchSnapshot();
        });

        test('`onClick` runs when button is clicked on', (): void => {
            const onClick = jest.fn();
            const wrapper = mount(<Themed onClick={onClick}>Goose</Themed>);

            expect(onClick).toHaveBeenCalledTimes(0);
            wrapper.simulate('click');
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        test('`onMouseEnter` runs when button receives `mouseenter` event', (): void => {
            const onMouseEnter = jest.fn();
            const wrapper = mount(<Themed onMouseEnter={onMouseEnter}>Goose</Themed>);

            expect(onMouseEnter).toHaveBeenCalledTimes(0);
            wrapper.simulate('mouseenter');
            expect(onMouseEnter).toHaveBeenCalledTimes(1);
        });

        test('`onMouseOver` runs when button receives `mouseover` event', (): void => {
            const onMouseOver = jest.fn();
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            const wrapper = mount(<Themed onMouseOver={onMouseOver}>Goose</Themed>);

            expect(onMouseOver).toHaveBeenCalledTimes(0);
            wrapper.simulate('mouseover');
            expect(onMouseOver).toHaveBeenCalledTimes(1);
        });

        test('`onMouseLeave` runs when button is clicked on', (): void => {
            const onMouseLeave = jest.fn();
            const wrapper = mount(<Themed onMouseLeave={onMouseLeave}>Goose</Themed>);

            expect(onMouseLeave).toHaveBeenCalledTimes(0);
            wrapper.simulate('mouseleave');
            expect(onMouseLeave).toHaveBeenCalledTimes(1);
        });

        test('`onFocus` runs when button is clicked on', (): void => {
            const onFocus = jest.fn();
            const wrapper = mount(<Themed onFocus={onFocus}>Goose</Themed>);

            expect(onFocus).toHaveBeenCalledTimes(0);
            wrapper.simulate('focus');
            expect(onFocus).toHaveBeenCalledTimes(1);
        });

        test('`onBlur` runs when button is clicked on', (): void => {
            const onBlur = jest.fn();
            const wrapper = mount(<Themed onBlur={onBlur}>Goose</Themed>);

            expect(onBlur).toHaveBeenCalledTimes(0);
            wrapper.simulate('blur');
            expect(onBlur).toHaveBeenCalledTimes(1);
        });
    });

    test('renders primary theme', (): void => {
        const wrapperA = mount(<Themed theme="primary">Goose</Themed>);
        const wrapperB = mount(
            <Themed theme="primary" isDisabled>
                Goose
            </Themed>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders secondary theme', (): void => {
        const wrapperA = mount(<Themed theme="secondary">Goose</Themed>);
        const wrapperB = mount(
            <Themed theme="secondary" isDisabled>
                Goose
            </Themed>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders tertiary theme', (): void => {
        const wrapperA = mount(<Themed theme="tertiary">Goose</Themed>);
        const wrapperB = mount(
            <Themed theme="tertiary" isDisabled>
                Goose
            </Themed>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders caution theme', (): void => {
        const wrapperA = mount(<Themed theme="caution">Goose</Themed>);
        const wrapperB = mount(
            <Themed theme="caution" isDisabled>
                Goose
            </Themed>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders solid theme', (): void => {
        const wrapperA = mount(<Themed theme="solid">Goose</Themed>);
        const wrapperB = mount(
            <Themed theme="solid" isDisabled>
                Goose
            </Themed>,
        );
        expect(wrapperA).toMatchSnapshot();
        expect(wrapperB).toMatchSnapshot();
    });

    test('renders large button', (): void => {
        const wrapper = mount(<Themed>Goose</Themed>);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders small button', (): void => {
        const wrapper = mount(<Themed size="small">Goose</Themed>);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders full width button', (): void => {
        const wrapper = mount(<Themed width="full">Goose</Themed>);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders full width button on small screens', (): void => {
        const wrapper = mount(<Themed width="full-below-small">Goose</Themed>);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders full width button when used within `InputRow`', (): void => {
        const wrapper = mount(
            <InputRow>
                <Themed>Duck</Themed>
                <Themed>Goose</Themed>
            </InputRow>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('renders loading indicator', (): void => {
        const wrapper = mount(<Themed isLoading>Duck</Themed>);
        expect(wrapper).toMatchSnapshot();
    });

    test('disables button while it is loading', (): void => {
        const wrapper = mount(<Themed isLoading>Duck</Themed>);
        expect(wrapper.find('button').prop('disabled')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('adds proper accessibility attribute', (): void => {
        const wrapper = mount(<Themed accessibilityLabel="Duck">Goose</Themed>);
        expect(wrapper.find('button').prop('aria-label')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders themed `UIAction` with an icon and no text', (): void => {
        const wrapper = mount(<Themed icon={<svg>Duck</svg>} accessibilityLabel="Duck" />);
        expect(wrapper).toMatchSnapshot();
    });

    test('disables button when it is disabled', (): void => {
        const wrapper = mount(<Themed isDisabled>Duck</Themed>);
        expect(wrapper.find('button').prop('disabled')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('disables button when it is disabled and loading', (): void => {
        const wrapper = mount(
            <Themed isDisabled isLoading>
                Duck
            </Themed>,
        );
        expect(wrapper.find('button').prop('disabled')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test('renders icon that is passed in', (): void => {
        const wrapper = mount(<Themed icon={<svg>Duck</svg>}>Goose</Themed>);
        expect(wrapper.find('svg')).toHaveLength(1);
        expect(wrapper.text()).toBe('DuckGoose');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `dataTest` prop', (): void => {
        const wrapperA = mount(<Themed dataTest="Duck">Goose</Themed>);
        expect(wrapperA.find('button').prop('data-test')).toEqual('Duck');
        expect(wrapperA).toMatchSnapshot();

        const wrapperB = mount(
            <Themed to="#" dataTest="Duck">
                Goose
            </Themed>,
        );
        expect(wrapperB.find('a').prop('data-test')).toEqual('Duck');
        expect(wrapperB).toMatchSnapshot();
    });
});
