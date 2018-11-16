/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button3 from './Button3';
import VillageList from '../../screens/app/Detail/VillageList';
import QRCode from 'react-native-qrcode';
import {RAMUtils} from '../../utils/RAMUtils';

const EventDetail = ({eventX, text1, naviga}) => {
  const {event_name, organizer, _id, starting_date, photo_url} = eventX;
  const {thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle} = styles;
  return (
    <Card>
      {RAMUtils.getGotTicket() && (
        <CardSection>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              height: 220,
              flex: 1,
              width: null,
            }}>
            <View style={styles.qrStyle}>
              <QRCode
                value={'User ID : ' + RAMUtils.getUser().id + '\n' + 'Ticket ID : ' + RAMUtils.getTid() + '\n' + 'Link Etherscan : ' + RAMUtils.getLink()}
                size={200}
                bgColor="#00B2EE"
                fgColor="white"
              />
            </View>
            <View style={styles.LinkContentStyle}>
              <Text style={styles.LinkTextStyle} onPress={() => Linking.openURL(RAMUtils.getLink())}>
                Check your transaction here
              </Text>
            </View>
          </View>
        </CardSection>
      )}

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
      <View style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
        <VillageList text={text1} />
      </View>
      <View
        style={{
          padding: 5,
          backgroundColor: '#fff',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          position: 'relative',
        }}>
        {!RAMUtils.getGotTicket() && (
          <Button3
            buttonPress={() => {
              console.log('===================');
              naviga('QrGeneration', {text: text1});
            }}>
            Get Ticket
          </Button3>
        )}
      </View>
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
