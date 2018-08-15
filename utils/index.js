/**
 * @format
 * @flow
 */

import {Alert, AsyncStorage} from 'react-native';
import config from '../config';

export const handleError = err => {
  console.log(err);
  console.log(err.response);
  let message = 'Internal Server Error';
  if (err.response) {
    message = err.response.data.message;
  }
  Alert.alert(message);
};

export const getUserProfile = async () => {
  const user = await AsyncStorage.getItem(
    config.constants.asyncStorage.userProfile,
  );
  return JSON.parse(user);
};
