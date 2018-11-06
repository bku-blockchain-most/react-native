/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../config';
import {RAMUtils, CacheUtils} from '../utils';

export const login = (username, password) => {
  const url = urljoin(config.apiUrl, '/login');
  return axios
    .post(url, {username, password})
    .then(res => res.data)
    .then(async ({user, token}) => {
      console.log('User', user);
      console.log('Token', token);

      // update data to cache
      await CacheUtils.setAuthToken(token);
      await CacheUtils.setUser(user);

      // update data to ram
      RAMUtils.setAuthToken(token);
      RAMUtils.updateUser(user);

      return user;
    });
};

export const signup = (username, email, tel, password) => {
  const url = urljoin(config.apiUrl, '/create');
  return axios
    .post(url, {username, email, tel, password})
    .then(res => res.data)
    .then(async user => {
      console.log(user);
      return user;
    });
};

export const logout = async () => {
  const url = urljoin(config.apiUrl, '/logout');
  return axios.get(url, {headers: {authorization: RAMUtils.getAuthToken()}}).then(async () => {
    await CacheUtils.clearAll();
    RAMUtils.clearAll();
    return;
  });
};
