import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterChip from './index';

test('renders `text` passed in', () => {
    const wrapper = render(<FilterChip text="Beverages" onClick={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('Beverages');
    expect(wrapper.baseElement).toMatchSnapshot();
});

test('renders the unselected state by default', () => {
    const wrapper = render(<FilterChip text="Beverages" onClick={jest.fn()} />);
    expect(screen.getByRole('button', { pressed: false })).toBeTruthy();
    expect(wrapper.baseElement).toMatchSnapshot();
});

test('renders the selected state', () => {
    const wrapper = render(<FilterChip text="Beverages" isSelected onClick={jest.fn()} />);
    expect(screen.getByRole('button', { pressed: true })).toBeTruthy();
    expect(wrapper.baseElement).toMatchSnapshot();
});

test('renders a proper onClick callback', () => {
    let count = 0;
    const onClick = (): void => {
        count += 1;
    };
    const wrapper = render(<FilterChip text="Beverages" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(count).toEqual(1);
    expect(wrapper.baseElement).toMatchSnapshot();
});

type ExamplePropTypes = {
    text: string;
};

function ExamplePage({ text }: ExamplePropTypes): JSX.Element {
    const [isSelected, setIsSelected] = React.useState(false);
    const onClick = (): void => {
        setIsSelected(!isSelected);
    };
    return <FilterChip text={text} onClick={onClick} isSelected={isSelected} />;
}

test('renders the correct selected state when clicked', () => {
    const wrapper = render(<ExamplePage text="Beverages" />);
    expect(screen.getByRole('button', { pressed: false })).toBeTruthy();
    fireEvent.click(screen.getByRole('button'));
    const button = screen.getByRole('button', { pressed: true });
    expect(button).toBeTruthy();
    expect(button).toHaveTextContent('Beverages');
    expect(wrapper.baseElement).toMatchSnapshot();
});

test('renders the correct text when clicked', () => {
    let isSelected = false;
    const onClick = (): void => {
        isSelected = !isSelected;
    };
    const { rerender } = render(
        <FilterChip
            text={isSelected ? 'Remove Beverages' : 'Include Beverages'}
            onClick={onClick}
            isSelected={isSelected}
        />,
    );
    let button = screen.getByRole('button', { pressed: false });
    expect(button).toBeTruthy();
    expect(button).toHaveTextContent('Include Beverages');
    fireEvent.click(screen.getByRole('button'));
    rerender(
        <FilterChip
            text={isSelected ? 'Remove Beverages' : 'Include Beverages'}
            onClick={onClick}
            isSelected={isSelected}
        />,
    );
    button = screen.getByRole('button', { pressed: true });
    expect(button).toBeTruthy();
    expect(button).toHaveTextContent('Remove Beverages');
});
