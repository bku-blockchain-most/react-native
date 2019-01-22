/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils} from '../../utils';

export const fetchPollings = async () => {
  const url = urljoin(config.apiUrl, '/poll');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(pollings => {
      // console.log(pollings);
      return pollings;
    });
};

export const fetchPollingsInPast = async () => {
  const url = urljoin(config.apiUrl, '/poll/past');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(pollings => {
      // console.log(pollings);
      return pollings;
    });
};

export const fetchPollingsInComing = async () => {
  const url = urljoin(config.apiUrl, '/poll/future');
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(pollings => {
      // console.log(pollings);
      return pollings;
    });
};

export const votePollings = async (pollID, ballots) => {
  const url = urljoin(config.apiUrl, '/vote');
  return axios
    .post(url, {pollID, ballots}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(vote => {
      // console.log(vote);
      return vote;
    });
};

/**
 * /vote/:pollID/userID
 */
export const getVoting = async pollID => {
  const url = urljoin(config.apiUrl, '/vote', pollID, RAMUtils.getUser().id);
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(vote => {
      // console.log(vote);
      return vote;
    });
};
