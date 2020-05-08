import isPlainObject from 'lodash/isPlainObject';

const stringifyObject = (object) => Object.entries(object).reduce((acc, [key, value]) => {
    if (isPlainObject(value)) {
        acc[key] = stringifyObject(value);
    } else if (typeof value === 'function') {
        acc[key] = 'function';
    } else {
        acc[key] = value.toString();
    }

    return acc;
}, {});

export default stringifyObject;
