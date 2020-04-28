import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useNavigation } from '../hooks';

const Backdrop = ({ className }) => {
    const { isDrawerOpen, toggleDrawer } = useNavigation();

    const backdropClassName = useMemo(() => classNames(
        'react-navigation__backdrop',
        { show: isDrawerOpen },
        className,
    ), [className, isDrawerOpen]);

    const handleKeyDown = useCallback((event) => {
        const ESC_KEYCODE = 27;

        if (isDrawerOpen && event.keyCode === ESC_KEYCODE) {
            toggleDrawer();
        }
    }, [isDrawerOpen, toggleDrawer]);

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            role="none"
            className={ backdropClassName }
            onClick={ toggleDrawer } />
    );
};

Backdrop.propTypes = {
    className: PropTypes.string,
};

export default Backdrop;
