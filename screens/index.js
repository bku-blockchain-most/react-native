/**
 * @format
 * @flow
 */

import {createSwitchNavigator} from 'react-navigation';

import SplashScreen from './Splash';
import AuthScreen from './auth';
import AppScreen from './app';

const RootNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthScreen,
    App: AppScreen,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default RootNavigator;
