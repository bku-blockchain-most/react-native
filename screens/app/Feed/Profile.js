/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Icon} from 'native-base';
import {styles} from '../../../styles';

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
      <View style={styles.centerBox}>
        <Text>Profile screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;
