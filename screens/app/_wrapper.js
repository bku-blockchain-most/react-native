/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {View} from 'native-base';
import {color} from '../../styles';

class AppScreenWrapper extends Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor={color.primary} barStyle="light-content" />
        {this.props.children}
      </View>
    );
  }
}

export default AppScreenWrapper;
