/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {getAuthToken, getUserProfile} from '../../utils';

let authToken = '';
let user = {};

export const fetchPollings = async () => {
  const url = urljoin(config.apiUrl, config.routes.polling);

  if (!authToken) {
    authToken = await getAuthToken();
  }

  return axios
    .get(url, {
      headers: {
        'x-access-token': authToken,
      },
    })
    .then(res => res.data)
    .then(pollings => {
      console.log(pollings);
      return pollings;
    });
};

export const votePollings = async (pollID, questions) => {
  const url = urljoin(config.apiUrl, config.routes.vote);

  if (!authToken) {
    authToken = await getAuthToken();
  }
  if (!user.id) {
    user = await getUserProfile();
  }

  return axios
    .post(
      url,
      {
        userID: user.id,
        pollID,
        questions: JSON.stringify(questions),
      },
      {
        headers: {
          'x-access-token': authToken,
        },
      },
    )
    .then(res => res.data)
    .then(vote => {
      console.log(vote);
      return vote;
    });
};

export const fetchVotings = async () => {
  const url = urljoin(config.apiUrl, config.routes.vote);

  if (!authToken) {
    authToken = await getAuthToken();
  }

  return axios
    .get(url, {
      headers: {
        'x-access-token': authToken,
      },
    })
    .then(res => res.data)
    .then(vote => {
      console.log(vote);
      return vote;
    });
};
