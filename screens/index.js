/**
 * @format
 * @flow
 */

import {createSwitchNavigator} from 'react-navigation';

import AuthLoadingScreen from './AuthLoading';
import AuthScreen from './auth';
import AppScreen from './app';

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    App: AppScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default RootNavigator;
