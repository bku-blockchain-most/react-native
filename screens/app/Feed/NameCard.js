/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../../styles';

class NameCardScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Text style={{color: tintColor}}>NC</Text>,
  };

  render() {
    return (
      <View style={styles.centerBox}>
        <Text>NameCard screen</Text>
      </View>
    );
  }
}

export default NameCardScreen;
