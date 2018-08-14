/**
 * @format
 * @flow
 */

import {Alert} from 'react-native';

export const handleError = err => {
  console.log(err.response);
  let message = 'Internal Server Error';
  if (err.response) {
    message = err.response.data.message;
  }
  Alert.alert(message);
};
