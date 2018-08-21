/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Root} from 'native-base';
import RootNavigator from './screens';

export default class App extends Component {
  render() {
    return (
      <Root>
        <RootNavigator />
      </Root>
    );
  }
}
