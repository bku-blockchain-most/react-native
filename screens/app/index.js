/**
 * @format
 * @flow
 */

import {createStackNavigator} from 'react-navigation';

import HomeScreen from './Home';
import PollingScreen from './Polling';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Polling: PollingScreen,
});

export default AppNavigator;
