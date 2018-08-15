/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
} from 'native-base';
import moment from 'moment';

import AppScreenWrapper from './_wrapper';
import {styles, color} from '../../styles';

class PollingDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const polling = navigation.getParam('polling');
    console.log(polling);

    return (
      <AppScreenWrapper>
        <Text
          style={{
            ...styles.fontOpenSans,
            fontWeight: '700',
            ...styles.textPrimary,
          }}>
          {polling.title || 'Title Polling'}
        </Text>

        <Text style={{...styles.fontOpenSans}} note>
          {moment(polling.startDate).calendar()}
          {' - '}
          {moment(polling.endDate).calendar()}
        </Text>

        <Text style={{...styles.fontOpenSans}}>
          {polling.description || ''}
        </Text>
        {polling.options.map(o => (
          <Text key={o.id}>
            {o.id}. {o.name}
          </Text>
        ))}

        <Button rounded full danger onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </Button>
      </AppScreenWrapper>
    );
  }
}

export default PollingDetailScreen;
