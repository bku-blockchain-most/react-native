/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const EventDetail = ({event, text, navigate}) => {
  const {event_name, organizer, starting_date, photo_url} = event;

  const {headerContentStyle, headerTextStyle, imageStyle} = styles;

  console.log(event);

  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{event_name}</Text>
          <Text>{organizer}</Text>
          <Text>{starting_date}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{uri: photo_url}} />
      </CardSection>

      <CardSection>
        <Button
          buttonPress={() => {
            navigate('QrGeneration', {text});
          }}>
          Get Ticket
        </Button>
        <Button
          buttonPress={() => {
            navigate('Village');
          }}>
          See more
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerTextStyle: {
    fontSize: 18,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
};

export default EventDetail;
