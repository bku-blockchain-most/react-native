export default {
  routes: {
    login: '/login',
    forgot: '/forgot',
    logout: '/logout',
    polling: '/poll',
    vote: '/vote'
  },
  constants: {
    asyncStorage: {
      authToken: 'AUTH_TOKEN',
      userProfile: 'USER_PROFILE'
    }
  },
  apiBlockchainTicket: 'http://blockchain-ticket.herokuapp.com'
};
