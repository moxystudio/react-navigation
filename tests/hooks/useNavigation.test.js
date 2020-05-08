import React from 'react';
import { render } from '@testing-library/react';
import stringifyObject from '../utils/stringify-object';
import { NavigationProvider, useNavigation } from '../../src';

const MyTestComponent = () => {
    const navigation = useNavigation();

    return JSON.stringify(stringifyObject(navigation));
};

describe('useNavigation Hook', () => {
    it('should provide navigation', () => {
        const { asFragment } = render(
            <NavigationProvider>
                <MyTestComponent />
            </NavigationProvider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should throw error if no NavigationProvider', () => {
        jest.spyOn(console, 'error');
        console.error.mockImplementation(() => {});

        expect(() => {
            render(<MyTestComponent />);
        }).toThrow();

        console.error.mockRestore();
    });
});
