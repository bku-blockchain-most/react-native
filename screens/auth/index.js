/**
 * @format
 * @flow
 */

import {createStackNavigator} from 'react-navigation';

import LoginScreen from './Login';
import ForgotScreen from './Forgot';
import SignUpScreen from './SignUp';

const AuthScreen = createStackNavigator(
  {
    Login: LoginScreen,
    Forgot: ForgotScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default AuthScreen;
