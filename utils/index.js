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
  let message = 'Something is error. Please try again.';
  if (err.response) {
    message = err.response.data.message;
  }
  Alert.alert('Error', message);
};

export const testMatch = (pattern, object, fields) => {
  for (let i of fields) {
    if (object[i] && object[i].search(pattern) !== -1) {
      return true;
    }
  }
  return false;
};
