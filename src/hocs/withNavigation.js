import React, { forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { useNavigation } from '../hooks';

const withNavigation = (WrappedComponent) => {
    const WithNavigation = forwardRef((props, ref) => {
        const context = useNavigation();

        if (!context) {
            throw new Error('withNavigation must be used within a NavigationProvider');
        }

        const { isDrawerOpen, toggleDrawer } = context;

        return (
            <WrappedComponent
                ref={ ref }
                { ...props }
                isDrawerOpen={ isDrawerOpen }
                toggleDrawer={ toggleDrawer } />
        );
    });

    WithNavigation.displayName = `withNavigation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    hoistNonReactStatics(WithNavigation, WrappedComponent);

    return WithNavigation;
};

export default withNavigation;
