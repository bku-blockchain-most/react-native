/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import {AsyncStorage} from 'react-native';
import config from '../../config';

export const login = (email, password) => {
  const url = urljoin(config.apiUrl, config.routes.login);
  return axios
    .post(url, {email, password})
    .then(res => res.data)
    .then(async ({user, token}) => {
      console.log(user);
      console.log(token);
      /** store auth token */
      await AsyncStorage.setItem(config.constants.asyncStorage.authToken, token);
      /** store user profile */
      await AsyncStorage.setItem(config.constants.asyncStorage.userProfile, JSON.stringify(user));
      return user;
    });
};
