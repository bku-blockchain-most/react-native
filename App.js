/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Root, StyleProvider} from 'native-base';
import RootNavigator from './screens';
import getTheme from './native-base-theme/components';
import customVariables from './native-base-theme/variables/platform';


export default class App extends Component {
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme(customVariables)}>
          <RootNavigator />
        </StyleProvider>
      </Root>
    );
  }
}
