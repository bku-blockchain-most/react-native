/**
 * Use as RAM data
 */

export const RAMUtils = {

  getUser: () => user,
  updateUser: (data) => { user = { ...user, ...data }; },
  clearUser: () => { user = null; },

  getAuthToken: () => authToken,
  setAuthToken: token => { authToken = token; },
  clearAuthToken: () => { authToken = ''; },

  clearAll: () => {
    RAMUtils.clearUser();
    RAMUtils.clearAuthToken();
  }

};

/**
 * Private data on Preferences
 */

let user = {
  id: '',
  email: '',
  role: '',
  eth: ''
};

let authToken = '';
