/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Content} from 'native-base';
import {StatusBar} from 'react-native';

import AppScreenWrapper from '../_wrapper';
import {color} from '../../../styles';

class FeedScreenWrapper extends Component {
  render() {
    return (
      <AppScreenWrapper>
        <StatusBar backgroundColor={color.primary} barStyle="dark-content" />
        <Content padder>{this.props.children}</Content>
      </AppScreenWrapper>
    );
  }
}

export default FeedScreenWrapper;
