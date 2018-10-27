/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, Tab, Tabs, ScrollableTab, Footer} from 'native-base';
import {Alert} from 'react-native';
import randomize from 'randomatic';

import DetailScreenWrapper from './_wrapper';
import ItemQuestion from '../../../components/ItemQuestion';
import {styles} from '../../../styles';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';

class PollingAnswerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      isLoading: false,
    };
  }

  _onClickSubmit = polling => {
    console.log(polling);
    console.log(this.state.answers);
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
            const vote = await appApi.votePollings(polling.id, this.state.answers);
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

  _isAnsweredQuestion = q => (this.state.answers.filter(y => y.ordinal === q.ordinal)[0] ? true : false);

  _retreiveAnswer = (question, answer) => {
    console.log(question);
    let isAnswered = this._isAnsweredQuestion(question);
    this.setState({
      answers: isAnswered
        ? this.state.answers.map(y => (y.ordinal !== question.ordinal ? y : {...y, options: answer}))
        : [
            ...this.state.answers,
            {
              ordinal: question.ordinal,
              type: question.type,
              options: answer,
            },
          ],
    });
  };

  render() {
    const {navigation} = this.props;
    const polling = navigation.getParam('polling');
    console.log(polling);

    return (
      <DetailScreenWrapper titleHeader="Make a voting" navigation={navigation} hasTabs isLoadingVisible={this.state.isLoading}>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          {polling.questions.map(q => (
            <Tab heading={'Q.' + q.ordinal} key={q.ordinal}>
              <ItemQuestion
                question={q}
                answer={(this.state.answers.filter(y => y.ordinal === q.ordinal)[0] || {}).options || []}
                retreiveAnswer={this._retreiveAnswer}
              />
            </Tab>
          ))}
        </Tabs>

        <Footer>
          <Button full style={{...styles.fullWidth, height: '100%', ...styles.bgPrimary}} onPress={() => this._onClickSubmit(polling)}>
            <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>Submit</Text>
          </Button>
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingAnswerScreen;
