/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import List from './ListComponent';
import {RAMUtils} from '../../utils';
import axios from 'axios';
import {View} from 'react-native';
import urljoin from 'url-join';
import config from '../../config';
import {AUTH} from '../../api/auth';
import Expert from './Expert';
import Presenter from './Presenter';
import Organiser from './Organiser';

export default class Report extends Component {
  render() {
    console.log('Logndaf', RAMUtils.getUser());
    const user = RAMUtils.getUser();
    if (user.role === 'Expert' || user.role === 'Investor' || user.role === 'Participant') {
      return <Expert />;
    }
    if (user.role === 'Speaker') {
      return <Presenter />;
    }
    if (user.role === 'Organize') {
      return <Organiser />;
    }
    return <View />;
  }
}
