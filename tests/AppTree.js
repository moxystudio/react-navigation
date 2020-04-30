import React from 'react';
import PropTypes from 'prop-types';

import { NavigationProvider } from '../src/providers';

const AppTree = ({ navigationContextValue, children }) => (
    <NavigationProvider value={ navigationContextValue }>
        { children }
    </NavigationProvider>
);

AppTree.propTypes = {
    children: PropTypes.node.isRequired,
    navigationContextValue: PropTypes.exact({
        isDrawerOpen: PropTypes.bool,
        toggleDrawer: PropTypes.func,
    }),
};

export default AppTree;
