/**
 * @format
 * @flow
 */

import {createTabNavigator} from 'react-navigation';
import {Platform} from 'react-native';

import NameCardScreen from './NameCard';
import SettingScreen from './Setting';
import ProfileScreen from './Profile';
import PollingListScreen from './PollingList';
import VotingListScreen from './VotingList';
import EventListScreen from './EventList';
// import QrScannerScreen from './QrScanner';
import {color} from '../../../styles';

const FeedAppNavigator = createTabNavigator(
  {
    PollingList: PollingListScreen,
    VotingList: VotingListScreen,
    Profile: ProfileScreen,
    NameCard: NameCardScreen,
    Setting: SettingScreen,
    EventList: EventListScreen,
    // QrScanner: QrScannerScreen,
  },
  {
    initialRouteName: 'EventList',
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
        marginTop: Platform.select({
          ios: 20,
          android: 0,
        }),
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
