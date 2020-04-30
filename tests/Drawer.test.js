import React from 'react';
import { render, screen } from '@testing-library/react';

import Drawer from '../src/components/Drawer';
import AppTree from './AppTree';

const defaultProps = {
    placement: 'left',
    navigationItems: [
        { href: '/lorem', text: 'Lorem' },
        { href: '/ipsum', text: 'Ipsum' },
    ],
    LinkComponent: jest.fn(({ children, href }) => (
        <a href={ href }>
            {children.props.children}
        </a>
    )),
};

const renderWithProps = (props = {}, Component = Drawer) => render(
    <AppTree>
        <Component { ...defaultProps } { ...props } />
    </AppTree>,
);

describe('Drawer', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with className', () => {
        renderWithProps({ className: 'foo' });

        expect(screen.getByTestId('drawer')).toHaveClass('foo');
    });

    it('should be invisible by default', () => {
        renderWithProps();

        expect(screen.getByTestId('drawer')).not.toHaveClass('show');
    });

    it('should be visible when the its state is toggled', () => {
        const mockNavigationContextValue = {
            isDrawerOpen: true,
            toggleDrawer: jest.fn(),
        };

        render(
            <AppTree navigationContextValue={ mockNavigationContextValue }>
                <Drawer { ...defaultProps } />
            </AppTree>,
        );

        expect(screen.getByTestId('drawer')).toHaveClass('show');
    });

    it('should render correctly with top placement', () => {
        renderWithProps({ placement: 'top' });

        expect(screen.getByTestId('drawer')).toHaveClass('top');
    });

    it('should render correctly with right placement', () => {
        renderWithProps({ placement: 'right' });

        expect(screen.getByTestId('drawer')).toHaveClass('right');
    });

    it('should render correctly with bottom placement', () => {
        renderWithProps({ placement: 'bottom' });

        expect(screen.getByTestId('drawer')).toHaveClass('bottom');
    });

    it('should render the navigation items', () => {
        renderWithProps();

        const { getByText } = screen;

        expect(getByText(/lorem/i)).toBeInTheDocument();
        expect(getByText(/ipsum/i)).toBeInTheDocument();
    });
});

