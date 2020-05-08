import React from 'react';
import PropTypes from 'prop-types';
import { NavigationProvider, Navbar, Drawer } from '@moxy/react-navigation';

import MyDrawerToggle from '../react-my-drawer-toggle';

import styles from './Layout.module.css';

const Layout = ({ children }) => (
    <NavigationProvider>
        <Navbar className={ styles.navbar } behaviour="hideOnScrollDown">
            <p>This is a custom navbar.</p>
            <MyDrawerToggle />
        </Navbar>
        <Drawer className={ styles.drawer }>
            <p>This is a custom drawer.</p>
        </Drawer>
        { children }
    </NavigationProvider>
);

Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;
