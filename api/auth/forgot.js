/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';

export const forgotPassword = email => {
  const url = urljoin(config.apiUrl, config.routes.forgot);
  return axios.post(url, {email}).then(res => res.data);
};
