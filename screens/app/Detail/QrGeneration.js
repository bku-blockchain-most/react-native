/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import Card from '../../../components/common/Card';
import CardSection from '../../../components/common/CardSection';
import axios from 'axios';
import QRCode from 'react-native-qrcode';
import urlJoin from 'url-join';
import config from '../../../config';

class QrGeneration extends Component {
  state = {uid: '', events1: '', qrtext: ''};
  static navigationOptions = {
    title: 'QR Generation',
  };
  GetTid2(text) {
    this.setState({uid: text});
    axios({
      method: 'post',
      url: urlJoin(config.apiBlockchainTicket, 'tickets'),
      data: {
        uid: text,
      },
    }).then(response =>
      this.setState({
        events1: response.data,
        qrtext: 'User ID : ' + text + '\n' + 'Ticket ID : ' + response.data.tid + '\n' + 'Link Etherscan : ' + response.data.etherscan_url,
      }),
    );
  }
  componentWillMount() {
    const {params} = this.props.navigation.state;
    this.GetTid2(params.text);
  }
  render() {
    return (
      <Card>
        <CardSection>
          <View style={styles.qrStyle}>
            <QRCode value={this.state.qrtext} size={200} bgColor="black" fgColor="white" />
          </View>
        </CardSection>

        <CardSection>
          <View style={styles.headerContentStyle}>
            <Text style={styles.headerTextStyle}>UID : {this.state.uid} </Text>
            <Text style={styles.headerTextStyle}>TID : {this.state.events1.tid}</Text>
          </View>
        </CardSection>

        <CardSection>
          <View style={styles.LinkContentStyle}>
            <Text style={styles.LinkTextStyle} onPress={() => Linking.openURL(this.state.events1.etherscan_url)}>
              Check your transaction here
            </Text>
          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  LinkContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
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
  LinkTextStyle: {
    fontSize: 18,
    color: '#00BFFF',
  },
  qrStyle: {
    alignItems: 'center',
    height: 200,
    flex: 1,
    width: null,
  },
};

export default QrGeneration;
