import React from 'react';
import { mount } from 'enzyme';
import { Grid, GridColumn } from './index';

test('grid renders content that is passed in', () => {
    const wrapper = mount(<Grid>goose</Grid>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

test('grid renders with wide gutter', () => {
    const wrapper = mount(<Grid gutter="wide">goose</Grid>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

test('grid renders with flush gutter', () => {
    const wrapper = mount(<Grid gutter="flush">goose</Grid>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

describe('GridColumn', () => {
    test('column renders content that is passed in', () => {
        const wrapper = mount(
            <Grid>
                <GridColumn>goose</GridColumn>
            </Grid>,
        );
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('column renders content with custom widths', () => {
        const wrapper = mount(
            <Grid>
                <GridColumn base={1} aboveSmall={2} aboveMedium={3} aboveLarge={4}>
                    goose
                </GridColumn>
            </Grid>,
        );
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('adds `dataTest` prop', () => {
        const wrapper = mount(
            <Grid dataTest="Duck">
                <GridColumn base={1} dataTest="Goose">
                    goose
                </GridColumn>
            </Grid>,
        );
        expect(wrapper.find('div[data-test="Duck"]')).toHaveLength(1);
        expect(wrapper.find('div[data-test="Goose"]')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});
