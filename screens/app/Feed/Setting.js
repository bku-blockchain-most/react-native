/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Button, Icon} from 'native-base';

import FeedScreenWrapper from './_wrapper';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';

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
      .catch(err => handleError(err));
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
