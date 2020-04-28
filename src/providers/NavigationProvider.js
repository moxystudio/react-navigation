import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { NavigationContext } from '../contexts';

const NavigationProvider = ({ children, value }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        document.body.style.overflow = isDrawerOpen ? 'visible' : 'hidden';

        setIsDrawerOpen(!isDrawerOpen);
    }, [isDrawerOpen]);

    const defaultValue = useMemo(() => ({ isDrawerOpen, toggleDrawer }), [isDrawerOpen, toggleDrawer]);

    return (
        <NavigationContext.Provider value={ value ?? defaultValue }>
            {children}
        </NavigationContext.Provider>
    );
};

NavigationProvider.propTypes = {
    children: PropTypes.node,
    value: PropTypes.exact({
        isDrawerOpen: PropTypes.bool,
        setIsDrawerOpen: PropTypes.func,
    }),
};

export default NavigationProvider;
