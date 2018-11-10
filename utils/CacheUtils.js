/**
 * Use as RAM data
 */

import { AsyncStorage } from 'react-native';
import config from '../config';

export const CacheUtils = {

  getUser: async () => {
    const user = await AsyncStorage.getItem(config.constants.currentUser);
    return JSON.parse(user || {});
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

  clearAll: async () => {
    await CacheUtils.clearUser();
    return await CacheUtils.clearAuthToken();
  }

};
