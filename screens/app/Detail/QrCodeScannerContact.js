/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button, Text, Icon, Header, Left, View, Body, Title, Toast} from 'native-base';

import AppScreenWrapper from '../_wrapper';
import {color} from '../../../styles';
import * as jws from '../../../utils/jws';

class QrCodeScannerContact extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  onSuccess(e) {
    const signature = e.data;
    jws.verify(signature, (err, data) => {
      if (err) {
        return Toast.show({
          text: err.message,
          buttonText: 'OK',
          duration: 5000,
        });
      }
      const {id} = data;
      this.props.navigation.navigate('LogsContact', {profileID: id});
    });
  }

  render() {
    return (
      <AppScreenWrapper>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Scan Contact</Title>
          </Body>
        </Header>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            fadeIn
            reactivate
            reactivateTimeout={2000}
            showMarker
            topContent={<Text style={customStyles.title}>Scan QR Code to add contact</Text>}
            bottomContent={<View style={customStyles.button} />}
          />
        </View>
      </AppScreenWrapper>
    );
  }
}

const customStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: color.dark,
    marginVertical: 15,
  },
  button: {
    borderWidth: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default QrCodeScannerContact;
