/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon} from 'native-base';

import FeedScreenWrapper from './_wrapper';

class NameCardScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="vcard-o" type="FontAwesome" style={{color: tintColor}} />,
  };

  render() {
    return (
      <FeedScreenWrapper>
        <Text>NameCard screen</Text>
      </FeedScreenWrapper>
    );
  }
}

export default NameCardScreen;
