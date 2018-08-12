/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './screens/login';
import ForgotScreen from './screens/forgot';
import HomeScreen from './screens/home';
import PollingScreen from './screens/polling';

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Forgot: {
      screen: ForgotScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Polling: {
      screen: PollingScreen,
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
