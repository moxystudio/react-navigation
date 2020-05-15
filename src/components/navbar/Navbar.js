import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useBehaviour, { behaviours } from './utils/use-behaviour';

const navbarClassName = 'react-navigation_navbar';

const Navbar = ({ placement, behaviour, children, className }) => {
    const navbarRef = useRef(null);
    const [behaviourData, setBehaviourProps] = useBehaviour({ navbarRef, behaviour, placement });

    useEffect(() => {
        setBehaviourProps({ navbarRef, behaviour, placement });
    }, [setBehaviourProps, navbarRef, behaviour, placement]);

    const navbarClassNames = classNames(
        navbarClassName,
        `${navbarClassName}-${placement}`,
        behaviourData.className,
        className,
    );

    return (
        <nav
            { ...behaviourData.attributes }
            ref={ navbarRef }
            className={ navbarClassNames }>
            { children }
        </nav>
    );
};

Navbar.propTypes = {
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    behaviour: PropTypes.oneOf(Object.keys(behaviours)),
    children: PropTypes.any,
    className: PropTypes.string,
};

Navbar.defaultProps = {
    placement: 'top',
};

export default Navbar;
