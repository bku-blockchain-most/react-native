/**
 * @format
 * @flow
 * 1
 */

import React, {Component} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text} from 'native-base';
import Profile from './Profile';
import Contact from './Contact'


class NameCardScreen extends Component {
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
        <Text>Contacts</Text>
      </FeedScreenWrapper>

    );
  }
}

export default NameCardScreen;
