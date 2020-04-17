// https://github.com/mattphillips/deep-object-diff

import isEmpty from '../lodash/is_empty';
import isObject from '../lodash/is_object';
import properObject from './proper_object';

const addedDiff = (lhs, rhs) => {
  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  const l = properObject(lhs);
  const r = properObject(rhs);

  return Object.keys(r).reduce((acc, key) => {
    if (l.hasOwnProperty(key)) {
      const difference = addedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    }

    return { ...acc, [key]: r[key] };
  }, {});
};

export default addedDiff;
