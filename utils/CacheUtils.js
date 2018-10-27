/**
 * Use as RAM data
 */

import { AsyncStorage } from 'react-native';
import config from '../config';

export const CacheUtils = {

  getUser: async () => {
    const user = await AsyncStorage.getItem(config.constants.asyncStorage.userProfile);
    return JSON.parse(user);
  },

  setUser: async (user) => {
    return await AsyncStorage.setItem(config.constants.asyncStorage.userProfile, user);
  },

  clearUser: async () => {
    return await AsyncStorage.setItem(config.constants.asyncStorage.userProfile, null);
  },

  getAuthToken: async () => {
    return await AsyncStorage.getItem(config.constants.asyncStorage.authToken);
  },

  setAuthToken: async token => {
    return await AsyncStorage.setItem(config.constants.asyncStorage.authToken, token);
  },

  clearAuthToken: async () => {
    return await AsyncStorage.setItem(config.constants.asyncStorage.authToken, null);
  },

  clearAll: async () => {
    await CacheUtils.clearUser();
    await CacheUtils.clearAuthToken();
    return;
  }

};
