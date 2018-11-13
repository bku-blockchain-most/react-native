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


  getId: () => id,
  updateId: data => { id = data; },
  clearId: () => { id = ''; },

  getLink: () => link,
  updateLink: data => { link = data; },
  clearLink: () => { link = ''; },

  getTid: () => tid,
  updateTid: data => { tid = data; },
  clearTid: () => { tid = ''; },
 
  getGotTicket: () => GotTicket,
  updateGotTicket: data => { GotTicket = data; },
  clearGotTicket: () => { GotTicket = ''; },


  clearAll: () => {
    RAMUtils.clearUser();
    RAMUtils.clearAuthToken();
  }

};
  let id = '';
  let tid = '';
  let link = '';
  let GotTicket = false;
  let authToken = '';

/**
 * Private data on Preferences
 */

let user = {
  id: '',
  username: '',
  email: '',
  tel: '',
  photoUrl: '',
  firstName: '',
  lastName: '',
  company: '',
  position: ''
};
