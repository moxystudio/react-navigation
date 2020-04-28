import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Navbar, Drawer, NavigationProvider } from '@moxy/react-navigation';
import Link from 'next/link';

const Navigation = ({ navigationItems }) => (
    <NavigationProvider>
        <Backdrop />
        <Navbar
            navigationItems={ navigationItems }
            LinkComponent={ Link } />
        <Drawer
            LinkComponent={ Link }
            navigationItems={ navigationItems } />
    </NavigationProvider>
);

Navigation.propTypes = {
    navigationItems: PropTypes.arrayOf(
        PropTypes.exact({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ).isRequired,
};

export default Navigation;
