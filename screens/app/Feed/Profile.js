/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../../styles';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Text style={{color: tintColor}}>Profile</Text>
    ),
  };

  render() {
    return (
      <View style={styles.centerBox}>
        <Text>Profile screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;
