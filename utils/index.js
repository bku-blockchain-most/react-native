/**
 * @format
 * @flow
 */

import * as UrlUtils from './UrlUtils';
export {UrlUtils};

export * from './CacheUtils';
export * from './RAMUtils';

import {Alert} from 'react-native';

export const handleError = err => {
  console.log(err);
  console.log(err.response);
  let message = 'Internal Server Error';
  if (err.response) {
    message = err.response.data.message;
  }
  Alert.alert(message);
};

export const testMatch = (pattern, object, fields) => {
  for (let i of fields) {
    if (object[i] && object[i].search(pattern) !== -1) {
      return true;
    }
  }
  return false;
};
