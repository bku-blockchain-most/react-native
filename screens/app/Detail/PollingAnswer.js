/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, List, ListItem, Content, Footer, CheckBox, Body, Toast} from 'native-base';
import {Alert, Linking} from 'react-native';

import DetailScreenWrapper from './_wrapper';
import {styles, color} from '../../../styles';
import {appApi} from '../../../api';
import {handleError, UrlUtils} from '../../../utils';

class PollingAnswerScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    this.polling = navigation.getParam('polling') || {};
    this.avai = navigation.getParam('avai') || false;
    this.voting = navigation.getParam('voting') || null;

    this.state = {
      candidates: this.polling.candidates || [],
      loading: false,
      voting: this.voting,
    };

    console.log(this.polling);
    console.log(this.avai);
    console.log(this.voting);
  }

  _onClickSubmit = () => {
    const ballots = this.state.candidates.filter(_ => _.checked).map(_ => ({id: _.id}));
    if (ballots.length === 0) {
      return Toast.show({
        text: 'You should choose at least a candidate',
        buttonText: 'Close',
      });
    }
    console.log(ballots);
    Alert.alert('Confirmation', 'Do you want to submit your voting?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          this.setState({loading: true});
          try {
            const vote = await appApi.votePollings(this.polling.id, ballots);
            console.log(vote);
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

  render() {
    const {navigation} = this.props;
    const {candidates} = this.state;

    console.log('Polling Answer');
    console.log(candidates);

    return (
      <DetailScreenWrapper titleHeader="Make a voting" navigation={navigation} hasTabs loading={this.state.loading}>
        <Content>
          {this.state.voting && (
            <Text style={{...styles.fontOpenSans, padding: 20}}>
              <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(this.state.voting.eth.txHash || ''))}>
                {this.state.voting.eth.txHash || ''}
              </Text>
            </Text>
          )}
          <List>
            {candidates.map((o, idx) => (
              <ListItem noBorder key={o.id}>
                {this.avai ? (
                  <CheckBox
                    color={color.primary}
                    checked={o.checked || false}
                    onPress={() => {
                      o.checked = !(o.checked || false);
                      this.setState({
                        candidates: this.state.candidates.map(_ => (_.id === o.id ? o : _)),
                      });
                    }}
                  />
                ) : (
                  <Text>{idx}</Text>
                )}
                <Body>
                  <Text>{o.name}</Text>
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>

        <Footer>
          {this.avai && this.state.voting == null ? (
            <Button full style={{...styles.fullWidth, height: '100%', ...styles.bgPrimary}} onPress={() => this._onClickSubmit()}>
              <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>Submit</Text>
            </Button>
          ) : (
            <Button full style={{...styles.fullWidth, height: '100%'}} disabled>
              <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>Submit</Text>
            </Button>
          )}
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingAnswerScreen;
