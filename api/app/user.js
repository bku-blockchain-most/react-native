/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils, CacheUtils} from '../../utils';

export const fetchProfile = async username => {
  console.log('GET /user/:username');
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

export const fetchUserProfileByID = async id => {
  console.log('GET /user/id/:id');
  const url = urljoin(config.apiUrl, 'user/id', id);
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      console.log(data);
      return data;
    });
};

export const fetchContacts = async () => {
  console.log('GET /contact');
  const url = urljoin(config.apiUrl, '/contact');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(data => {
      console.log(data); // [ {user1}, {user2} ]
      RAMUtils.setContacts(data);
      return data;
    });
};

export const fetchRecords = async partnerID => {
  console.log('GET /record/:partnerID');
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
  console.log('POST /contact');
  const url = urljoin(config.apiUrl, '/contact');
  return axios
    .post(url, {partnerID}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(({message}) => {
      RAMUtils.addContacts([{id: partnerID}]);
      console.log(message);
      return message;
    });
};

export const addRecord = async (partnerID, note) => {
  console.log('POST /record');
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
  console.log('PUT /user');
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
