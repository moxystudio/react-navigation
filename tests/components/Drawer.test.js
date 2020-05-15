import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NavigationProvider, Drawer } from '../../src';

const defaultProps = {
    children: <p>Custom Drawer.</p>,
};

const renderWithProps = (props = {}) => render(
    <NavigationProvider>
        <Drawer { ...defaultProps } { ...props } />
    </NavigationProvider>,
);

describe('Drawer Component', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly when overlay is clicked', () => {
        const { asFragment, container } = renderWithProps();

        const overlay = container.querySelector('.react-navigation_drawer-overlay');

        fireEvent.click(overlay);

        expect(asFragment()).toMatchSnapshot();
    });
});
