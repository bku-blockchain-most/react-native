/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Content} from 'native-base';
import {StatusBar, Platform} from 'react-native';

import AppScreenWrapper from '../_wrapper';
import {color} from '../../../styles';

class FeedScreenWrapper extends Component {
  /**
   * props:
   * loading: !boolean
   */
  render() {
    return (
      <AppScreenWrapper loading={this.props.loading}>
        {Platform.select({
          android: <StatusBar backgroundColor={color.primary} barStyle="light-content" />,
          ios: <StatusBar backgroundColor={color.primary} barStyle="dark-content" />,
        })}
        <Content padder>{this.props.children}</Content>
      </AppScreenWrapper>
    );
  }
}

export default FeedScreenWrapper;
