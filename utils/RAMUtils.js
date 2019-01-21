/**
 * @format
 * @flow
 */

/**
 * Use as RAM data
 */

export const RAMUtils = {
  getUser: () => user,
  updateUser: data => {
    user = {...user, ...data};
  },
  clearUser: () => {
    user = null;
  },

  getAuthToken: () => authToken,
  setAuthToken: token => {
    authToken = token;
  },
  clearAuthToken: () => {
    authToken = '';
  },

  clearAll: () => {
    RAMUtils.clearUser();
    RAMUtils.clearAuthToken();
  },

  addContacts: contacts => {
    myContacts = [...myContacts, ...contacts];
  },
  getContacts: () => myContacts,
  setContacts: contacts => {
    myContacts = contacts;
  },
};

/**
 * Private data on Preferences
 */
let authToken = '';

let user = {
  id: '',
  username: '',
  email: '',
  tel: '',
  photoUrl: '',
  firstName: '',
  lastName: '',
  company: '',
  position: '',
};

let myContacts = [];
