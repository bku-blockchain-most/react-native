/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils, CacheUtils} from '../../utils';

export const fetchProfile = async username => {
  console.log('GET /user/username');
  console.log(RAMUtils.getAuthToken());
  const url = urljoin(config.apiUrl, 'user', username);
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      RAMUtils.updateUser(data);
      CacheUtils.setUser(RAMUtils.getUser());
      console.log(data);
      return data;
    });
};

export const fetchContacts = async () => {
  console.log('GET /contact');
  console.log(RAMUtils.getAuthToken());
  const url = urljoin(config.apiUrl, '/contact');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      console.log(data); // [ {user1}, {user2} ]
      return data;
    });
};

export const fetchRecords = async partnerID => {
  console.log('GET /record');
  console.log(RAMUtils.getAuthToken());
  const url = urljoin(config.apiUrl, '/record/' + partnerID);
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      console.log(data); // [ {record1}, {record2} ]
      return data;
    });
};

export const addContact = async partnerID => {
  const url = urljoin(config.apiUrl, '/contact');
  return axios
    .post(url, {partnerID}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(({message}) => {
      console.log(message);
      return message;
    });
};

export const addRecord = async (partnerID, note) => {
  const url = urljoin(config.apiUrl, '/record');
  return axios
    .post(url, {partnerID, note}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(({message}) => {
      console.log(message);
      return message;
    });
};

export const updateProfile = async ({firstName, lastName, company, position}) => {
  const url = urljoin(config.apiUrl, 'user');
  return axios
    .put(url, {firstName, lastName, company, position}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(({message}) => {
      RAMUtils.updateUser({firstName, lastName, company, position});
      CacheUtils.setUser(RAMUtils.getUser());
      console.log(message);
      return message;
    });
};
