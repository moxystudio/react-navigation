import React, { forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useNavigation } from '../hooks';

const withNavigation = () => (WrappedComponent) => {
    const WithNavigation = forwardRef((props, ref) => {
        const navigation = useNavigation();

        return (
            <WrappedComponent ref={ ref } { ...props } navigation={ navigation } />
        );
    });

    WithNavigation.displayName = `withNavigation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    hoistNonReactStatics(WithNavigation, WrappedComponent);

    return WithNavigation;
};

export default withNavigation;
