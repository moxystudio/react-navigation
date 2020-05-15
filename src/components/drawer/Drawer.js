import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigation } from '../../hooks';

const drawerClassName = 'react-navigation_drawer';

const Drawer = ({ placement, withOverlay, children, className, overlayClassName }) => {
    const { drawer } = useNavigation();

    const drawerClassNames = classNames(drawerClassName, `${drawerClassName}-${placement}`, className);
    const overlayClassNames = classNames(`${drawerClassName}-overlay`, overlayClassName);

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
    children: PropTypes.any,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
};

Drawer.defaultProps = {
    placement: 'left',
    withOverlay: true,
};

export default Drawer;
