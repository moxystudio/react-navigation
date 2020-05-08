import React from 'react';
import { render } from '@testing-library/react';
import stringifyObject from '../utils/stringify-object';
import { NavigationProvider, withNavigation } from '../../src';

const MyTestComponent = withNavigation()(({ navigation }) => (
    JSON.stringify(stringifyObject(navigation))
));

const renderWithProps = (props = {}) => render(
    <NavigationProvider>
        <MyTestComponent { ...props } />
    </NavigationProvider>,
);

describe('withNavigation HOC', () => {
    it('should provide navigation', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });
});
