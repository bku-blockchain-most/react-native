/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils} from '../../utils';

export const fetchEvents = async () => {
  const url = urljoin(config.apiUrl, 'ticket', 'events');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(events => {
      console.log(events);
      return events;
    });
};

export const fetchVillages = async () => {
  const url = urljoin(config.apiUrl, 'ticket', 'villages');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(villages => {
      console.log(villages);
      return villages;
    });
};
