/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, Footer, Content} from 'native-base';
import {Linking, RefreshControl} from 'react-native';
import moment from 'moment';

import DetailScreenWrapper from './_wrapper';
import {styles} from '../../../styles';
import {RAMUtils, UrlUtils} from '../../../utils';
import {appApi} from '../../../api';

class PollingDetailScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    console.log('PollingDetailScreen');

    this.polling = navigation.getParam('polling');
    this.eth = this.polling.eth || {};
    console.log(this.polling, this.eth);

    this.state = {
      loading: false,
      voting: null,
      refreshing: false,
    };
  }

  getVoting = () => {
    // In the future, not retrieve voting
    if (moment(this.polling.startDate).isSameOrAfter(moment())) {
      this.setState({refreshing: false});
      return;
    }
    this.setState({loading: true});
    appApi
      .getVoting(this.polling.id)
      .then(voting => {
        this.setState({loading: false, refreshing: false, voting});
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
        console.log(err);
      });
  };

  componentWillMount() {
    this.getVoting();
  }

  render() {
    const {navigation} = this.props;
    const polling = this.polling;
    const eth = this.eth;

    const user = RAMUtils.getUser();
    console.log(user);

    return (
      <DetailScreenWrapper titleHeader="Polling" navigation={navigation} loading={this.state.loading}>
        <Content
          padder
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.getVoting();
              }}
              colors={['#eb0025', '#f96e00', '#f4a21a', '#3c40cb', '#337ab7', '#176075']}
            />
          }>
          {this.state.voting && (
            <Text style={{...styles.fontOpenSans, marginBottom: 10, marginTop: 5}}>
              <Text style={{fontWeight: '700'}}>You had voted. Your Transaction Hash: </Text>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(this.state.voting.eth.txHash || ''))}>
                {this.state.voting.eth.txHash || ''}
              </Text>
            </Text>
          )}
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
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanAddressURL(eth.contractAddress || ''))}>
              {eth.contractAddress || ''}
            </Text>
          </Text>
          <Text style={{...styles.fontOpenSans, marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(eth.txHash || ''))}>
              {eth.txHash || ''}
            </Text>
          </Text>

          <Text style={{...styles.fontOpenSans, marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Description: </Text>
            {polling.description || ''}
          </Text>
        </Content>

        <Footer>
          {moment(polling.endDate).isSameOrBefore(moment()) ? (
            // past
            <Button full style={{...styles.fullWidth, height: '100%'}} onPress={() => navigation.navigate('PollingAnswer', {polling, voting: this.state.voting, avai: false})}>
              <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>View your vote</Text>
            </Button>
          ) : moment(polling.startDate).isSameOrAfter(moment()) ? (
            // future
            <Button full style={{...styles.fullWidth, height: '100%'}} disabled>
              <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>In Coming Soon</Text>
            </Button>
          ) : this.state.voting == null ? (
            // current, not vote
            <Button
              full
              style={{...styles.fullWidth, height: '100%', ...styles.bgPrimary}}
              onPress={() => navigation.navigate('PollingAnswer', {polling, voting: this.state.voting, avai: true})}>
              <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>Start Voting</Text>
            </Button>
          ) : (
            // current, voted
            <Button full style={{...styles.fullWidth, height: '100%'}} onPress={() => navigation.navigate('PollingAnswer', {polling, voting: this.state.voting, avai: true})}>
              <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>View your vote</Text>
            </Button>
          )}
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingDetailScreen;
