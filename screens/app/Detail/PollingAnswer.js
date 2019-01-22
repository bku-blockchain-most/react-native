/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, List, ListItem, Content, Footer, CheckBox, Body, Toast, H3} from 'native-base';
import {Alert, Linking, RefreshControl} from 'react-native';

import DetailScreenWrapper from './_wrapper';
import {color, refreshControlColors} from '../../../styles';
import {appApi} from '../../../api';
import {handleError, UrlUtils} from '../../../utils';

class PollingAnswerScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.polling = navigation.getParam('polling') || {};
    this.avai = navigation.getParam('avai') || false;
    this.voting = navigation.getParam('voting') || null;

    this.candidates = this.polling.candidates || [];

    // console.log(this.polling);
    // console.log(this.avai);
    // console.log(this.voting);

    if (this.voting !== null) {
      const {ballots} = this.voting;
      this.candidates = this.candidates.map(o => {
        if (ballots.find(x => x.id === o.id)) {
          o.checked = true;
        }
        return o;
      });
    }

    this.state = {
      candidates: this.candidates,
      voting: this.voting,
      loading: false,
      refreshing: false,
      loadingVote: false,
    };
  }

  getVoting = () => {
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

  _onClickSubmit = () => {
    const ballots = this.state.candidates.filter(_ => _.checked).map(_ => ({id: _.id}));
    if (ballots.length === 0) {
      return Toast.show({
        text: 'You should choose at least a candidate',
        buttonText: 'Close',
      });
    }
    // console.log(ballots);
    Alert.alert('Confirmation', 'Do you want to submit your voting? A transaction will be created on Ethereum.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: async () => {
          this.setState({loading: true});
          try {
            const vote = await appApi.votePollings(this.polling.id, ballots);
            // console.log(vote);
            this.setState({loading: false, voting: vote});
            Alert.alert('Notification', 'Your voting is commited to smart contract', [{text: 'OK', onPress: () => {}}]);
          } catch (err) {
            this.setState({loading: false});
            handleError(err);
          }
        },
      },
    ]);
  };

  handleRefresh() {
    this.setState({refreshing: true});
    this.getVoting();
  }

  render() {
    const {navigation} = this.props;
    const {candidates} = this.state;
    const {polling} = this;

    // console.log('Polling Answer');
    // console.log(candidates);

    return (
      <DetailScreenWrapper titleHeader="Make a Vote" navigation={navigation} hasTabs loading={this.state.loading}>
        <Content padder refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={refreshControlColors} />}>
          {this.state.voting && (
            <Text style={{marginBottom: 10, marginTop: 5}}>
              <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(this.state.voting.eth.txHash || ''))}>
                {this.state.voting.eth.txHash || ''}
              </Text>
            </Text>
          )}
          <H3 style={{color: color.primary, fontWeight: '700', marginTop: 12}}>{polling.title || 'Title Polling'}</H3>
          <Text style={{fontSize: 18, fontWeight: '700', marginTop: 10}}>Candidates:</Text>
          <List>
            {candidates.map(o => (
              <ListItem noBorder key={o.id}>
                <CheckBox
                  color={this.state.voting !== null || !this.avai ? color.inactive : color.primary}
                  checked={o.checked || false}
                  onPress={() => {
                    o.checked = !(o.checked || false);
                    this.setState({
                      candidates: this.state.candidates.map(_ => (_.id === o.id ? o : _)),
                    });
                  }}
                  disabled={this.state.voting !== null || !this.avai}
                />
                <Body>
                  <Text>{o.name}</Text>
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>

        <Footer>
          {this.avai && this.state.voting == null ? (
            <Button full style={{width: '100%', height: '100%', backgroundColor: color.primary}} onPress={() => this._onClickSubmit()}>
              <Text style={{textTransform: 'uppercase'}}>Submit</Text>
            </Button>
          ) : (
            <Button full style={{width: '100%', height: '100%'}} disabled>
              <Text style={{textTransform: 'uppercase'}}>Submit</Text>
            </Button>
          )}
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingAnswerScreen;
