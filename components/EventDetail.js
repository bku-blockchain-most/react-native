/**
 * @format
 * @flow
 */

import React from 'react';
import {Image} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right} from 'native-base';
import moment from 'moment';
import {styles} from '../styles';

const EventDetail = ({event, text, navigate}) => {
  const {event_name, organizer, starting_date, photo_url} = event;

  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{uri: photo_url}} />
          <Body>
            <Text style={{...styles.fontOpenSans}}>{event_name}</Text>
            <Text style={{...styles.fontOpenSans}}>{organizer}</Text>
            <Text note style={{...styles.fontOpenSans}}>
              {moment(starting_date).format('HH:MM DD/MM/YYYY')}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri: photo_url}} style={{height: 200, width: null, flex: 1}} />
      </CardItem>
      <CardItem>
        <Left>
          <Button
            danger
            rounded
            bordered
            onPress={() => {
              navigate('QrGeneration', {text});
            }}>
            <Icon type="MaterialCommunityIcons" name="qrcode-edit" />
            <Text style={{marginLeft: 2, paddingLeft: 2}}>Book Ticket</Text>
          </Button>
        </Left>
        <Right>
          <Button
            rounded
            danger
            onPress={() => {
              navigate('Village');
            }}>
            <Text>See more</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

export default EventDetail;
