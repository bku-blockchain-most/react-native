/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon} from 'native-base';

import FeedScreenWrapper from './_wrapper';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="account-location"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
  };

  render() {
    return (
      <FeedScreenWrapper>
        <Text>Profile screen</Text>
      </FeedScreenWrapper>
    );
  }
}

export default ProfileScreen;
