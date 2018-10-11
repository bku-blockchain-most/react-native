/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, Footer, Content} from 'native-base';
import {Linking} from 'react-native';
import moment from 'moment';

import DetailScreenWrapper from './_wrapper';
import {styles} from '../../../styles';
import {getEtherscanAddressURL, getEtherscanTransactionURL} from '../../../utils';

class PollingDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }
  render() {
    const {navigation} = this.props;
    const polling = navigation.getParam('polling');
    console.log(polling);

    const eth = polling.eth || {};

    return (
      <DetailScreenWrapper titleHeader="Polling" navigation={navigation} isLoadingVisible={this.state.isLoading}>
        <Content padder>
          <Text
            style={{
              ...styles.fontOpenSans,
              fontWeight: '700',
              ...styles.textPrimary,
            }}>
            {polling.title || 'Title Polling'}
          </Text>

          <Text style={{...styles.fontOpenSans, marginTop: 15}} note>
            {moment(polling.startDate).calendar()}
            {' - '}
            {moment(polling.endDate).calendar()}
          </Text>

          <Text style={{...styles.fontOpenSans, marginTop: 25}}>Event: {polling.eventID || ''}</Text>
          <Text style={{...styles.fontOpenSans}}>Owner: {polling.ownerID || ''}</Text>

          <Text style={{...styles.fontOpenSans, marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Contract Address: </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL(getEtherscanAddressURL(eth.contractAddress || ''))}>
              {eth.contractAddress || ''}
            </Text>
          </Text>
          <Text style={{...styles.fontOpenSans, marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(getEtherscanTransactionURL(eth.txHash || ''))}>
              {eth.txHash || ''}
            </Text>
          </Text>

          <Text style={{...styles.fontOpenSans, marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Description: </Text>
            {polling.description || ''}
          </Text>
        </Content>

        <Footer>
          <Button
            full
            style={{...styles.fullWidth, height: '100%', ...styles.bgPrimary}}
            onPress={() => navigation.navigate('PollingAnswer', {polling})}>
            <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>Start Voting</Text>
          </Button>
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingDetailScreen;
