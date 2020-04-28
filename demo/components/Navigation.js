import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Navbar, Drawer } from '@moxy/react-navigation';
import Link from 'next/link';

const Navigation = ({ navigationItems }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        document.body.style.overflow = isDrawerOpen ? 'visible' : 'hidden';

        setIsDrawerOpen(!isDrawerOpen);
    }, [isDrawerOpen]);

    return (
        <>
            <Backdrop isDrawerOpen={ isDrawerOpen } toggleDrawer={ toggleDrawer } />
            <Navbar
                toggleDrawer={ toggleDrawer }
                navigationItems={ navigationItems }
                LinkComponent={ Link } />
            <Drawer
                isDrawerOpen={ isDrawerOpen }
                toggleDrawer={ toggleDrawer }
                LinkComponent={ Link }
                navigationItems={ navigationItems } />
        </>
    );
};

Navigation.propTypes = {
    navigationItems: PropTypes.arrayOf(
        PropTypes.exact({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ).isRequired,
};

export default Navigation;
