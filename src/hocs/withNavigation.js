import React, { Component } from 'react';

import { NavigationContext } from '../contexts';

const withNavigation = (WrappedComponent) => class extends Component {
    static contextType = NavigationContext;

    componentDidMount() {
        if (!this.context) {
            throw new Error('withNavigation must be used within a NavigationProvider');
        }
    }

    render() {
        const { isDrawerOpen, toggleDrawer } = this.context;

        return (
            <WrappedComponent
                isDrawerOpen={ isDrawerOpen }
                toggleDrawer={ toggleDrawer } />
        );
    }
};

export default withNavigation;
