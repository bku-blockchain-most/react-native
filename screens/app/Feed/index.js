/**
 * @format
 * @flow
 */

import {createTabNavigator} from 'react-navigation';

import NameCardScreen from './NameCard';
import SettingScreen from './Setting';
import ProfileScreen from './Profile';
import PollingListScreen from './PollingList';
import {color} from '../../../styles';

const FeedAppNavigator = createTabNavigator(
  {
    PollingList: PollingListScreen,
    Profile: ProfileScreen,
    NameCard: NameCardScreen,
    Setting: SettingScreen,
  },
  {
    initialRouteName: 'PollingList',
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: color.primary,
      showLabel: false,
    },
  },
);

export default FeedAppNavigator;
