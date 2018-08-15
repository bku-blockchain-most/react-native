/**
 * @format
 * @flow
 */

import React, {Component} from 'react';

import AppScreenWrapper from '../_wrapper';

class FeedScreenWrapper extends Component {
  render() {
    return <AppScreenWrapper>{this.props.children}</AppScreenWrapper>;
  }
}

export default FeedScreenWrapper;
