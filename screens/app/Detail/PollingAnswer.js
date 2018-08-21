/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Button, Tab, Tabs, ScrollableTab, Footer} from 'native-base';
import randomize from 'randomatic';

import DetailScreenWrapper from './_wrapper';
import ItemQuestion from '../../../components/ItemQuestion';
import {styles} from '../../../styles';

class PollingAnswerScreen extends Component {
  _onClickSubmit = () => {};

  render() {
    const {navigation} = this.props;
    const polling = navigation.getParam('polling');
    console.log(polling);

    return (
      <DetailScreenWrapper
        titleHeader="Make a voting"
        navigation={navigation}
        hasTabs>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          {polling.questions.map(q => (
            <Tab
              heading={'Q.' + q.ordinal}
              key={q.ordinal + randomize('Aa0', 8)}>
              <ItemQuestion question={q} />
            </Tab>
          ))}
        </Tabs>

        <Footer>
          <Button
            full
            style={{...styles.fullWidth, height: '100%', ...styles.bgPrimary}}
            onPress={this._onClickSubmit}>
            <Text style={{...styles.fontOpenSans, textTransform: 'uppercase'}}>
              Submit
            </Text>
          </Button>
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default PollingAnswerScreen;
