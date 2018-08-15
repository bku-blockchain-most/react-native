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
      showLabel: false,
      showIcon: true,
      activeTintColor: color.primary,
      activeBackgroundColor: color.inactiveLight,
      inactiveBackgroundColor: color.white,
      inactiveTintColor: color.inactive,
      style: {
        backgroundColor: color.white,
      },
      tabStyle: {
        backgroundColor: color.white,
      },
      indicatorStyle: {
        backgroundColor: color.white,
      },
    },
  },
);

export default FeedAppNavigator;
