const visibleClassName = 'react-navigation_navbar-hideOnScrollDown-visible';
const hiddenClassName = 'react-navigation_navbar-hideOnScrollDown-hidden';

const hideOnScrollDown = ({ navbarRef, scroll }) => {
    const { clientHeight } = navbarRef.current || {};
    const { current, previous } = scroll;

    const isVisible = previous.y >= current.y || current.y <= clientHeight;

    return {
        className: isVisible ? visibleClassName : hiddenClassName,
    };
};

export default hideOnScrollDown;
