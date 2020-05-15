import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@moxy/react-navigation';

const MyDrawerToggle = ({ onClick }) => {
    const { drawer } = useNavigation();

    const handleClick = useCallback(() => {
        drawer.toggle();

        onClick && onClick();
    }, [onClick, drawer]);

    return (
        <button onClick={ handleClick }>
            Click to toggle Drawer.
        </button>
    );
};

MyDrawerToggle.propTypes = {
    onClick: PropTypes.func,
};

export default MyDrawerToggle;
