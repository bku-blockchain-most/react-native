/**
 * @format
 * @flow
 */

import axios from 'axios';
import urljoin from 'url-join';
import config from '../../config';
import {RAMUtils} from '../../utils';

export const fetchTicketOfEvent = async ({eventID}) => {
  const url = urljoin(config.apiUrl, 'ticket', eventID);
  return axios
    .get(url, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(ticket => {
      // console.log(ticket);
      return ticket;
    });
};

export const bookTicketOfEvent = async ({eventID}) => {
  const url = urljoin(config.apiUrl, 'ticket', eventID);
  return axios
    .post(url, {}, {headers: {authorization: RAMUtils.getAuthToken()}})
    .then(res => res.data)
    .then(ticket => {
      // console.log(ticket);
      return ticket;
    });
};
