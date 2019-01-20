/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, Footer, Content, H3, Spinner} from 'native-base';
import {Linking, RefreshControl} from 'react-native';
import moment from 'moment';

import DetailScreenWrapper from './_wrapper';
import {refreshControlColors, color} from '../../../styles';
import {UrlUtils} from '../../../utils';
import {appApi} from '../../../api';

class PollingDetailScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.polling = navigation.getParam('polling');
    this.eth = this.polling.eth || {};
    // console.log(this.polling, this.eth);

    this.state = {
      loading: false,
      refreshing: false,
      loadingVote: false,
      voting: null,
    };
  }

  getVoting = () => {
    // In the future, not retrieve voting
    if (moment(this.polling.startDate).isSameOrAfter(moment())) {
      this.setState({refreshing: false, loadingVote: false});
      return;
    }
    appApi
      .getVoting(this.polling.id)
      .then(voting => {
        this.setState({loading: false, refreshing: false, loadingVote: false, voting});
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false, loadingVote: false});
        console.log(err);
      });
  };

  componentWillMount() {
    this.setState({loadingVote: true});
    this.getVoting();
  }

  handleRefreshing() {
    this.setState({refreshing: true});
    this.getVoting();
  }

  render() {
    const {navigation} = this.props;
    const polling = this.polling;
    const eth = this.eth;
    return (
      <DetailScreenWrapper titleHeader="Polling" navigation={navigation} loading={this.state.loading}>
        <Content padder refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefreshing()} colors={refreshControlColors} />}>
          {this.state.voting && (
            <Text style={{marginBottom: 10, marginTop: 5}}>
              <Text style={{fontWeight: '700'}}>You had voted. Your Transaction Hash: </Text>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(this.state.voting.eth.txHash || ''))}>
                {this.state.voting.eth.txHash || ''}
              </Text>
            </Text>
          )}
          {this.state.loadingVote && <Spinner color="red" />}
          <H3 style={{color: color.primary, fontWeight: '700', marginTop: 12}}>{polling.title || 'Title Polling'}</H3>

          <Text style={{marginTop: 8}} note>
            {moment(polling.startDate).calendar()}
            {' - '}
            {moment(polling.endDate).calendar()}
          </Text>

          <Text style={{marginTop: 20, fontWeight: '700'}}>Event: {polling.eventID || ''}</Text>
          <Text style={{marginTop: 5, fontWeight: '700'}}>Organizer: {polling.ownerID || ''}</Text>

          <Text style={{marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Contract Address: </Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanAddressURL(eth.contractAddress || ''))}>
              {eth.contractAddress || ''}
            </Text>
          </Text>
          <Text style={{marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(eth.txHash || ''))}>
              {eth.txHash || ''}
            </Text>
          </Text>

          <Text style={{marginTop: 20}}>
            <Text style={{fontWeight: '700'}}>Description: </Text>
            {polling.description || ''}
          </Text>
        </Content>

        <Footer>
          {moment(polling.endDate).isSameOrBefore(moment()) ? (
            // past
            <Button full style={{width: '100%', height: '100%'}} onPress={() => navigation.navigate('PollingAnswer', {polling, voting: this.state.voting, avai: false})}>
              <Text style={{textTransform: 'uppercase'}}>{this.state.voting ? 'View your vote' : 'View candidates'}</Text>
            </Button>
          ) : moment(polling.startDate).isSameOrAfter(moment()) ? (
            // future
            <Button full style={{width: '100%', height: '100%'}} disabled>
              <Text style={{textTransform: 'uppercase'}}>In Coming Soon</Text>
            </Button>
          ) : this.state.voting == null ? (
            // current, not vote
            <Button
              full
              style={{width: '100%', height: '100%', backgroundColor: color.primary}}
              onPress={() => navigation.navigate('PollingAnswer', {polling, voting: this.state.voting, avai: true})}>
              <Text style={{textTransform: 'uppercase'}}>Start Voting</Text>
            </Button>
          ) : (
            // current, voted
            <Button full style={{width: '100%', height: '100%'}} onPress={() => navigation.navigate('PollingAnswer', {polling, voting: this.state.voting, avai: true})}>
              <Text style={{textTransform: 'uppercase'}}>View your vote</Text>
            </Button>
          )}
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingDetailScreen;
