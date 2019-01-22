/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils} from '../../utils';

export const fetchEvents = async () => {
  const url = urljoin(config.apiUrl, 'event');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(events => {
      // console.log(events);
      return events;
    });
};

export const fetchVillages = async () => {
  const url = urljoin(config.apiUrl, 'event', 'villages');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(villages => {
      // console.log(villages);
      return villages;
    });
};

export const checkInterestedVilalgeOfEvent = async ({eventID, villageID}) => {
  const url = urljoin(config.apiUrl, 'event', eventID, villageID, 'interest');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(({interested}) => {
      return interested;
    });
};

export const updateInterestedVilalgeOfEvent = async ({eventID, villageID, interested}) => {
  const url = urljoin(config.apiUrl, 'event', eventID, villageID, 'interest');
  return axios
    .post(url, {interested: interested ? 'true' : 'false'}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(({message}) => {
      return message;
    });
};
