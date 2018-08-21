/**
 * @format
 * @flow
 */

import axios from 'axios';
import {AsyncStorage} from 'react-native';
import urljoin from 'url-join';
import config from '../../config';
import {getUserProfile, getAuthToken} from '../../utils';

let authToken = '';
let user = {};

export const changePassword = () => {
  return new Promise(resolve => {
    resolve('OK');
  });
};

export const logout = async () => {
  const url = urljoin(config.apiUrl, config.routes.logout);

  if (!authToken) {
    authToken = await getAuthToken();
  }
  if (!user.id) {
    user = await getUserProfile();
  }

  return axios
    .post(
      url,
      {userId: user.id},
      {
        headers: {
          'x-access-token': authToken,
        },
        data: {
          userId: user.id,
        },
      },
    )
    .then(async () => {
      await AsyncStorage.clear();
    });
};
