import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { NavigationProvider, Drawer, useNavigation } from '../../src';

jest.mock('body-scroll-lock', () => ({
    disableBodyScroll: jest.fn(),
    enableBodyScroll: jest.fn(),
    clearAllBodyScrollLocks: jest.fn(),
}));

const TriggerButton = () => {
    const { drawer } = useNavigation();

    return (
        <button onClick={ drawer.toggle }>Toggle</button> // eslint-disable-line
    );
};

const defaultProps = {
    children: <p>Custom Drawer.</p>,
};

const renderWithProps = (props = {}) => render(
    <NavigationProvider>
        <TriggerButton />
        <Drawer { ...defaultProps } { ...props } />
    </NavigationProvider>,
);

beforeEach(() => {
    jest.clearAllMocks();
});

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

    it('should disable/enable body scroll when drawer is toggled', () => {
        const { getByRole } = renderWithProps();
        const triggerButton = getByRole('button');

        expect(enableBodyScroll).toHaveBeenCalled();

        fireEvent.click(triggerButton);

        expect(disableBodyScroll).toHaveBeenCalled();

        fireEvent.click(triggerButton);

        expect(enableBodyScroll).toHaveBeenCalled();
    });

    it('should not disable body scroll when lockBodyScroll prop is false', () => {
        const { getByRole } = renderWithProps({ lockBodyScroll: false });
        const triggerButton = getByRole('button');

        fireEvent.click(triggerButton);

        expect(disableBodyScroll).toHaveBeenCalledTimes(0);
        expect(enableBodyScroll).toHaveBeenCalledTimes(0);
    });
});
