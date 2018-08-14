/**
 * @format
 * @flow
 */

import {createStackNavigator} from 'react-navigation';

import LoginScreen from './Login';
import ForgotScreen from './Forgot';

const AuthScreen = createStackNavigator(
  {
    Login: LoginScreen,
    Forgot: ForgotScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default AuthScreen;
