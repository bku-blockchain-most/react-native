/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Icon, Button, Text} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import urlJoin from 'url-join';

import config from '../../../config';
import {styles} from '../../../styles';
import {RAMUtils} from '../../../utils';

class QrScanner extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  state = {entry: '', uid: '', bid: ''};

  GetEntry() {
    axios({
      method: 'post',
      url: urlJoin(config.apiUrl, 'ticket', 'entries'),
      data: {
        uid: this.state.uid,
        bid: this.state.bid,
      },
    }).then(response =>
      this.setState({
        entry: response.data,
      }),
    );
  }

  onButtonPress() {
    if (this.state.uid === '') {
      Alert.alert('Please scan Booth first');
    } else if (this.state.bid === '') {
      Alert.alert('Please Scan Booth Qr Code before click Check-in');
    } else {
      this.GetEntry();
      Alert.alert('Check-in Booth: ' + this.state.bid);
    }
  }

  onSuccess(e) {
    this.setState({bid: e.data});
    Alert.alert('This is Booth: ' + e.data);
    this.setState({uid: RAMUtils.getUser().id});
  }

  render() {
    let space = '          ';
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={<Text style={{...customStyles.centerText, ...styles.textPrimary}}>Scan Booth Qr Code and Click Check-in</Text>}
          bottomContent={
            <View style={customStyles.buttonview}>
              <Button
                rounded
                danger
                onPress={() => {
                  this.onButtonPress();
                }}>
                <Text>{space + 'Check-in' + space}</Text>
              </Button>
            </View>
          }
        />
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  centerText: {
    flexDirection: 'row',
    fontSize: 16,
    padding: 25,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonview: {
    borderWidth: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

export default QrScanner;
