import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useDocumentScrollThrottled } from '../hooks';

const MINIMUM_SCROLL = 120;
const TIMEOUT_DELAY = 400;

const Navbar = ({ className, navigationItems, toggleDrawer, LinkComponent }) => {
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShrinkHeader, setShouldShrinkHeader] = useState(false);

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setShouldShrinkHeader(isScrolledDown);

        setTimeout(() => {
            setShouldHideHeader(isScrolledDown && isMinimumScrolled);
        }, TIMEOUT_DELAY);
    });

    const containerClassName = useMemo(() => classNames(
        'react-navigation__container',
        {
            hide: shouldHideHeader,
            shrink: shouldShrinkHeader,
        },
        className,
    ), [shouldHideHeader, shouldShrinkHeader, className]);

    return (
        <header className={ containerClassName }>
            <nav className="react-navigation__navbar">
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
        </header>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
    navigationItems: PropTypes.arrayOf(
        PropTypes.exact({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ).isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    LinkComponent: PropTypes.func.isRequired,
};

export default Navbar;
