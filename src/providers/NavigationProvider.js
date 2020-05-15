import React from 'react';
import PropTypes from 'prop-types';

import { NavigationContext } from '../contexts';
import useDrawer from './utils/use-drawer';

const NavigationProvider = ({ children }) => {
    const drawer = useDrawer();
    const value = { drawer };

    return (
        <NavigationContext.Provider value={ value }>
            { children }
        </NavigationContext.Provider>
    );
};

NavigationProvider.propTypes = {
    children: PropTypes.node,
};

export default NavigationProvider;
