/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';

import FeedScreenWrapper from './_wrapper';
import {appApi} from '../../../api';

class SettingScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="format-list-bulleted"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
  };

  _onClickSignOut = async () => {
    appApi
      .logout()
      .then(() => this.props.navigation.navigate('Auth'))
      .catch(async err => {
        console.log(err);
        /** When user click logout, should be navigate user */
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      });
  };

  render() {
    return (
      <FeedScreenWrapper>
        <Text style={{marginVertical: 20}}>Setting screen</Text>
        <View style={{width: '90%'}}>
          <Button full rounded danger onPress={this._onClickSignOut}>
            <Text>Sign me out</Text>
          </Button>
        </View>
      </FeedScreenWrapper>
    );
  }
}

export default SettingScreen;
