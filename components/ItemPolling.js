/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Card, CardItem, Text, Left, Body, Icon} from 'native-base';
import moment from 'moment';
import {color, dynamicStyles} from '../styles';

class ItemPolling extends Component {
  render() {
    const {poll} = this.props;
    return (
      <Card style={{flex: 1, ...dynamicStyles.changePadding(4), ...dynamicStyles.changeMargin(0)}}>
        <CardItem style={{backgroundColor: 'white', ...dynamicStyles.changePadding(5)}}>
          <Left style={{justifyContent: 'flex-start', ...dynamicStyles.changePadding(0)}}>
            <Icon type="MaterialCommunityIcons" name="calendar-clock" active style={{color: color.primary}} />
            <Body>
              <Text style={{fontWeight: '700', color: color.primary}}>{poll.title || 'Title Polling'}</Text>
              <Text note>
                {moment(poll.startDate).calendar()}
                {' - '}
                {moment(poll.endDate).calendar()}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{...dynamicStyles.changePadding(5)}}>
          <Body style={{...dynamicStyles.changePadding(0)}}>
            <Text note>
              {poll.eventID || ''} - {poll.ownerID || ''}
            </Text>
            <Text numberOfLines={2}>{poll.description || ''}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default ItemPolling;
