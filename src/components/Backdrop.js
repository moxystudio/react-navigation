import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Backdrop = ({ className, isDrawerOpen, toggleDrawer }) => {
    const backdropClassName = useMemo(() => classNames(
        'react-navigation_backdrop',
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
    isDrawerOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
};

export default Backdrop;
