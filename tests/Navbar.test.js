import React from 'react';
import { render, screen } from '@testing-library/react';

import Navbar from '../src/components/Navbar';
import AppTree from './AppTree';

const defaultProps = {
    placement: 'top',
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

const renderWithProps = (props = {}, Component = Navbar) => render(
    <AppTree>
        <Component { ...defaultProps } { ...props } />
    </AppTree>,
);

describe('Navbar', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with className', () => {
        renderWithProps({ className: 'foo' });

        expect(screen.getByTestId('navbar')).toHaveClass('foo');
    });
});

