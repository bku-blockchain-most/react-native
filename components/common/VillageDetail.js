/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const VillageDetail = ({villageX, text1}) => {
  state = {uid: '', cmnd: '', loggedIn: false, check: false};

  const {village_name, vid, village_head, location, photo_url} = villageX;
  const {thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle} = styles;

  return (
    <Card>
      <CardSection>
        <View style={{flexDirection: 'row', flex: 4}}>
          <View style={headerContentStyle}>
            <Text>{village_head}</Text>
            <Text>{location}</Text>
          </View>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{uri: photo_url}} />
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flex: 7,
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
    height: 100,
    flex: 1,
    width: null,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};

export default VillageDetail;
