import { useEffect, useState } from 'react';

const useScroll = () => {
    const [scroll, setScroll] = useState({
        previous: { x: null, y: null },
        current: { x: null, y: null },
        direction: { x: null, y: null },
    });

    const handleScroll = () => setScroll((scroll) => {
        const current = { x: window.scrollX, y: window.scrollY };
        const previous = scroll.current.x != null ? scroll.current : current;

        const direction = {
            x: current.x > previous.x ? 'right' : 'left',
            y: current.y > previous.y ? 'down' : 'up',
        };

        return {
            current,
            previous,
            direction,
        };
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll, { passive: true });
    }, []);

    return scroll;
};

export default useScroll;
