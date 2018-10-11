/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Card, CardItem, Text, Left, Body, Icon, Right} from 'native-base';
import moment from 'moment';
import {color, styles} from '../styles';

class ItemPolling extends Component {
  render() {
    const {poll} = this.props;
    return (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Icon type="MaterialIcons" name="event-note" active style={{color: color.primary}} />
            <Body>
              <Text
                style={{
                  ...styles.fontOpenSans,
                  fontWeight: '700',
                  ...styles.textPrimary,
                }}>
                {poll.title || 'Title Polling'}
              </Text>
              <Text style={{...styles.fontOpenSans}} note>
                {moment(poll.startDate).calendar()}
                {' - '}
                {moment(poll.endDate).calendar()}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{...styles.fontOpenSans}}>Event: {poll.eventID || ''}</Text>
            <Text style={{...styles.fontOpenSans}}>Owner: {poll.ownerID || ''}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{...styles.fontOpenSans}} numberOfLines={5}>
              {poll.description || ''}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default ItemPolling;
