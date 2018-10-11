/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon, List} from 'native-base';
import {Linking, RefreshControl} from 'react-native';

import FeedScreenWrapper from './_wrapper';
import {fetchVotings} from '../../../api/app';
import {handleError, getEtherscanTransactionURL} from '../../../utils';

class VotingListScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="history" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      refreshing: false,
      votings: [],
    };

    this._fetchVotings();
  }

  _fetchVotings = () => {
    this.setState({isLoading: true});
    fetchVotings()
      .then(votings => {
        this.setState({votings, refreshing: false, isLoading: false});
      })
      .catch(err => handleError(err));
  };

  render() {
    return (
      <FeedScreenWrapper isLoadingVisible={this.state.isLoading}>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>List of Votings</Text>
        <List
          // TODO: pull to refresh is not working
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this._fetchVotings();
              }}
            />
          }
          dataArray={this.state.votings}
          renderRow={o => {
            const eth = o.eth || {};
            return (
              <Text style={{marginTop: 15}}>
                <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
                <Text
                  style={{color: eth.txHash ? 'blue' : 'gray'}}
                  onPress={() => (eth.txHash ? Linking.openURL(getEtherscanTransactionURL(eth.txHash)) : {})}>
                  {eth.txHash || 'in processing...'}
                </Text>
              </Text>
            );
          }}
        />
      </FeedScreenWrapper>
    );
  }
}

export default VotingListScreen;
