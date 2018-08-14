/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Icon} from 'native-base';
import {styles} from '../../../styles';

class NameCardScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="vcard-o" type="FontAwesome" style={{color: tintColor}} />
    ),
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
