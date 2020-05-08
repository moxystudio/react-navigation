import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NavigationProvider, Navbar } from '../../src';

const defaultProps = {
    children: <p>Custom Navbar.</p>,
};

const renderWithProps = (props = {}) => render(
    <NavigationProvider>
        <Navbar { ...defaultProps } { ...props } />
    </NavigationProvider>,
);

describe('Navbar Component', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with hideOnScrollDown behaviour', () => {
        const { asFragment } = renderWithProps({ behaviour: 'hideOnScrollDown' });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with hideOnScrollDown behaviour and scrolled down', () => {
        const { asFragment } = renderWithProps({ behaviour: 'hideOnScrollDown' });

        fireEvent.scroll(window, { target: { scrollY: 100 } });

        expect(asFragment()).toMatchSnapshot();
    });
});
