/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Content} from 'native-base';

import AppScreenWrapper from '../_wrapper';

class FeedScreenWrapper extends Component {
  render() {
    return (
      <AppScreenWrapper>
        <Content padder>{this.props.children}</Content>
      </AppScreenWrapper>
    );
  }
}

export default FeedScreenWrapper;
