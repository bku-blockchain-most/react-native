/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils} from '../../utils';

export const fetchContacts = async () => {
  console.log('GET /user/contacts');
  console.log(RAMUtils.getAuthToken());
  const url = urljoin(config.apiUrl, '/user/contacts');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      console.log(data);
      return data.contacts;
    });
};

export const fetchRecords = async () => {
  console.log('GET /user/records');
  console.log(RAMUtils.getAuthToken());
  const url = urljoin(config.apiUrl, '/user/records');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      console.log(data);
      return data.records;
    });
};
