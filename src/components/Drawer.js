/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useNavigation } from '../hooks';

const Drawer = ({ className, navigationItems, LinkComponent }) => {
    const { isDrawerOpen, toggleDrawer } = useNavigation();

    const drawerClassName = useMemo(() => classNames(
        'react-navigation__drawer',
        { show: isDrawerOpen },
        className,
    ), [className, isDrawerOpen]);

    return (
        <div className={ drawerClassName }>
            <ul>
                {navigationItems.map(({ href, text }, idx) => (
                    <li key={ idx } onClick={ toggleDrawer }>
                        <LinkComponent href={ href }>
                            <a>{text}</a>
                        </LinkComponent>
                    </li>
                ))}
            </ul>
        </div>
    );
};

Drawer.propTypes = {
    className: PropTypes.string,
    navigationItems: PropTypes.arrayOf(
        PropTypes.exact({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ).isRequired,
    LinkComponent: PropTypes.func.isRequired,
};

export default Drawer;
