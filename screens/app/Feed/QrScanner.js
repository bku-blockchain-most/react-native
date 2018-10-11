/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, Image} from 'react-native';
import Button from '../../../components/common/Button';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import urlJoin from 'url-join';
import config from '../../../config';

class QrScanner extends Component {
  static navigationOptions = {
    title: 'Scanner',
    headerBackTitle: null,
    tabBarLabel: 'Scanner',
    tabBarIcon: ({tintColor}) => (
      <Image source={require('../../../assets/images/qr3.png')} style={[{height: 40, width: 40}, {tintColor}]} />
    ),
  };
  state = {entry: '', uid: '', bid: ''};
  GetEntry() {
    axios({
      method: 'post',
      url: urlJoin(config.apiBlockchainTicket, 'entries'),
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
    if (this.state.uid == '') {
      Alert.alert('Please scan Booth first');
    } else if (this.state.bid == '') {
      Alert.alert('Please Scan Booth Qr Code before click Check-in');
    } else {
      this.GetEntry();
      Alert.alert('Check-in Booth: ' + this.state.bid);
    }
  }

  onSuccess(e) {
    this.setState({bid: e.data});
    Alert.alert('This is Booth: ' + e.data);
    const {params} = this.props.navigation.state;
    this.setState({uid: params.text});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={<Text style={styles.centerText}>Scan Booth Qr Code and Click Check-in</Text>}
          bottomContent={
            <View style={styles.buttonview}>
              <Button
                buttonPress={() => {
                  this.onButtonPress();
                }}>
                Check-in
              </Button>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginHorizontal: 50,
  },
});

export default QrScanner;
