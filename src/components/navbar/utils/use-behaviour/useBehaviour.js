import { useState } from 'react';

import useScroll from '../use-scroll';
import behaviours from './behaviours';

const noop = () => ({});

export const useBehaviour = (props) => {
    const [{ behaviour, placement, navbarRef }, setBehaviourProps] = useState(props);
    const scroll = useScroll();
    const operation = behaviours[behaviour] || noop;

    const { className, attributes } = operation({
        navbarRef,
        placement,
        scroll,
    });

    return [{ className, attributes }, setBehaviourProps];
};

export default useBehaviour;
