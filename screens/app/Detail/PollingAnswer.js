/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, List, ListItem, Footer, CheckBox, Body, Toast} from 'native-base';
import {Alert} from 'react-native';

import DetailScreenWrapper from './_wrapper';
import {styles, color} from '../../../styles';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';

class PollingAnswerScreen extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    this.polling = navigation.getParam('polling') || {};

    this.state = {
      candidates: this.polling.candidates || [],
      isLoading: false,
    };
  }

  _onClickSubmit = () => {
    const ballots = this.state.candidates.filter(_ => _.checked).map(_ => ({id: _.id}));
    if (ballots.length === 0) {
      return Toast.show({
        text: 'You should choose at least a candidate',
        buttonText: 'Close',
      });
    }
    Alert.alert('Confirmation', 'Do you want to submit your voting?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          this.setState({isLoading: true});
          try {
            const vote = await appApi.votePollings(this.polling.id, ballots);
            console.log(vote);

            this.setState({isLoading: false});

            Alert.alert('Notification', 'Your voting is commited to smart contract', [{text: 'OK', onPress: () => this.props.navigation.goBack()}]);
          } catch (err) {
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
      <DetailScreenWrapper titleHeader="Make a voting" navigation={navigation} hasTabs isLoadingVisible={this.state.isLoading}>
        <List>
          {candidates.map(o => (
            <ListItem noBorder key={o.id}>
              <CheckBox
                color={color.primary}
                checked={o.checked || false}
                onPress={() => {
                  o.checked = true;
                  this.setState({
                    candidates: this.state.candidates.map(_ => (_.id === o.id ? o : _)),
                  });
                }}
              />
              <Body>
                <Text>{o.name}</Text>
              </Body>
            </ListItem>
          ))}
        </List>

        <Footer>
          <Button full style={{...styles.fullWidth, height: '100%', ...styles.bgPrimary}} onPress={() => this._onClickSubmit()}>
            <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>Submit</Text>
          </Button>
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingAnswerScreen;
