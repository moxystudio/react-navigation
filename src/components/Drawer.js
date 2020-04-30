/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useNavigation } from '../hooks';

const Drawer = ({ className, navigationItems, LinkComponent, placement }) => {
    const { isDrawerOpen, toggleDrawer } = useNavigation();

    const drawerClassName = useMemo(
        () => classNames(
            'react-navigation__drawer',
            placement,
            { show: isDrawerOpen },
            className,
        ),
        [className, isDrawerOpen, placement],
    );

    return (
        <div data-testid="drawer" className={ drawerClassName }>
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
    LinkComponent: PropTypes.func.isRequired,
    navigationItems: PropTypes.arrayOf(
        PropTypes.exact({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ).isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

Drawer.defaultProps = {
    placement: 'left',
};

export default Drawer;
