/**
 * Use as RAM data
 */

import { AsyncStorage } from 'react-native';
import config from '../config';

export const CacheUtils = {

  getUser: async () => {
    const user = await AsyncStorage.getItem(config.constants.currentUser);
    return JSON.parse(user);
  },

  setUser: async (user) => {
    return await AsyncStorage.setItem(config.constants.currentUser, JSON.stringify(user));
  },

  clearUser: async () => {
    return await AsyncStorage.removeItem(config.constants.currentUser);
  },

  getAuthToken: async () => {
    return await AsyncStorage.getItem(config.constants.authToken);
  },

  setAuthToken: async token => {
    return await AsyncStorage.setItem(config.constants.authToken, token);
  },

  clearAuthToken: async () => {
    return await AsyncStorage.removeItem(config.constants.authToken);
  },

  getTokenExpire: async () => {
    return parseInt(await AsyncStorage.getItem(config.constants.tokenExpire), 10);
  },

  setTokenExpire: async (tokenExpire) => {
    return await AsyncStorage.setItem(config.constants.tokenExpire, tokenExpire);
  },

  clearTokenExpire: async () => {
    return await AsyncStorage.removeItem(config.constants.tokenExpire);
  },

  clearAll: async () => {
    await CacheUtils.clearAuthToken();
    await CacheUtils.clearTokenExpire();
    return await CacheUtils.clearUser();
  },

};
