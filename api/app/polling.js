/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {getAuthToken} from '../../utils';

let authToken = '';

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

export const votePollings = () => {
  return new Promise(resolve => {
    resolve('OK');
  });
};
