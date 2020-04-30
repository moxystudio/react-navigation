import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useDocumentScrollThrottled, useNavigation } from '../hooks';

const MINIMUM_SCROLL = 120;
const TIMEOUT_DELAY = 400;

const Navbar = ({ className, LinkComponent, navigationItems, placement }) => {
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShrinkHeader, setShouldShrinkHeader] = useState(false);

    const { toggleDrawer } = useNavigation();

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setShouldShrinkHeader(isScrolledDown);

        setTimeout(() => {
            setShouldHideHeader(isScrolledDown && isMinimumScrolled);
        }, TIMEOUT_DELAY);
    });

    const containerClassName = useMemo(
        () =>
            classNames(
                'react-navigation__container',
                placement,
                {
                    hide: shouldHideHeader,
                    shrink: shouldShrinkHeader,
                },
                className,
            ),
        [placement, shouldHideHeader, shouldShrinkHeader, className],
    );

    const navbarClassName = useMemo(() => classNames('react-navigation__navbar', [placement]), [placement]);

    return (
        <div className={ containerClassName }>
            <nav className={ navbarClassName }>
                <div>
                    <LinkComponent href="/">
                        <a>next-with-moxy</a>
                    </LinkComponent>
                </div>
                <ul>
                    {navigationItems.map(({ href, text }, idx) => (
                        <li key={ idx }>
                            <LinkComponent href={ href }>
                                <a>{text}</a>
                            </LinkComponent>
                        </li>
                    ))}
                </ul>
            </nav>
            <button onClick={ toggleDrawer }>boom</button>
        </div>
    );
};

Navbar.propTypes = {
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

Navbar.defaultProps = {
    placement: 'top',
};

export default Navbar;
