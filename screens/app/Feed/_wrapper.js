/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Content} from 'native-base';

import AppScreenWrapper from '../_wrapper';

class FeedScreenWrapper extends Component {
  /**
   * props:
   * loading: !boolean
   */
  render() {
    return (
      <AppScreenWrapper loading={this.props.loading}>
        <Content padder>{this.props.children}</Content>
      </AppScreenWrapper>
    );
  }
}

export default FeedScreenWrapper;
