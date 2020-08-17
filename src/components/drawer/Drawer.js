import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { useNavigation } from '../../hooks';

const drawerClassName = 'react-navigation_drawer';

const Drawer = ({
    placement,
    withOverlay,
    lockBodyScroll,
    children,
    className,
    overlayClassName,
}) => {
    const drawerRef = useRef();
    const { drawer } = useNavigation();

    const drawerClassNames = classNames(drawerClassName, `${drawerClassName}-${placement}`, className);
    const overlayClassNames = classNames(`${drawerClassName}-overlay`, overlayClassName);

    useEffect(() => {
        if (!lockBodyScroll) { return; }

        if (drawer.isOpen) {
            disableBodyScroll(drawerRef.current);
        } else {
            enableBodyScroll(drawerRef.current);
        }
    }, [drawer.isOpen, lockBodyScroll]);

    useEffect(() => {
        const drawer = drawerRef.current;

        return () => {
            enableBodyScroll(drawer);
        };
    }, []);

    const handleOverlayClick = useCallback(() => {
        drawer.close();
    }, [drawer]);

    return (
        <>
            { withOverlay &&
                <div
                    className={ overlayClassNames }
                    data-open={ drawer.isOpen }
                    data-placement={ placement }
                    onClick={ handleOverlayClick } />
            }
            <div
                ref={ drawerRef }
                className={ drawerClassNames }
                data-open={ drawer.isOpen }
                data-placement={ placement }>
                { children }
            </div>
        </>
    );
};

Drawer.propTypes = {
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    withOverlay: PropTypes.bool,
    lockBodyScroll: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
};

Drawer.defaultProps = {
    placement: 'left',
    withOverlay: true,
    lockBodyScroll: true,
};

export default Drawer;
