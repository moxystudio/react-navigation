import React from 'react';
import { render, screen } from '@testing-library/react';

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
});

