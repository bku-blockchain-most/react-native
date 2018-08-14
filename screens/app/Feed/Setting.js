/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';
import {styles} from '../../../styles';

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

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.centerBox}>
        <Text style={{marginVertical: 20}}>Setting screen</Text>
        <View style={{width: '90%'}}>
          <Button full rounded danger onPress={this._signOutAsync}>
            <Text>Sign me out</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default SettingScreen;
