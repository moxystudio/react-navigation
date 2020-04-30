import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Backdrop from '../src/components/Backdrop';
import AppTree from './AppTree';

const renderWithProps = (props = {}, Component = Backdrop) => render(
    <AppTree>
        <Component { ...props } />
    </AppTree>,
);

describe('Backdrop', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with className', () => {
        renderWithProps({ className: 'foo' });

        expect(screen.getByTestId('backdrop')).toHaveClass('foo');
    });

    it('should be invisible when the Drawer is closed', () => {
        renderWithProps();

        expect(screen.getByTestId('backdrop')).not.toHaveClass('show');
    });

    it('should be visible when the Drawer is open', () => {
        const mockNavigationContextValue = {
            isDrawerOpen: true,
            toggleDrawer: jest.fn(),
        };

        render(
            <AppTree navigationContextValue={ mockNavigationContextValue }>
                <Backdrop />
            </AppTree>,
        );

        expect(screen.getByTestId('backdrop')).toHaveClass('show');
    });

    it('should not toggle the Drawer if the ESC key is pressed and it is closed', () => {
        const mockToggleDrawer = jest.fn();

        const mockNavigationContextValue = {
            isDrawerOpen: false,
            toggleDrawer: mockToggleDrawer,
        };

        render(
            <AppTree navigationContextValue={ mockNavigationContextValue }>
                <Backdrop />
            </AppTree>,
        );

        fireEvent.keyDown(document.body, { keyCode: 27 });

        expect(mockToggleDrawer).not.toHaveBeenCalled();
    });

    it('should close the Drawer when the ESC key is pressed and it is opened', () => {
        const mockToggleDrawer = jest.fn();

        const mockNavigationContextValue = {
            isDrawerOpen: true,
            toggleDrawer: mockToggleDrawer,
        };

        render(
            <AppTree navigationContextValue={ mockNavigationContextValue }>
                <Backdrop />
            </AppTree>,
        );

        fireEvent.keyDown(document.body, { keyCode: 27 });

        expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
    });
});
