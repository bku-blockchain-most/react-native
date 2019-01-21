/**
 * @format
 * @flow
 */

import React from 'react';
import {createTabNavigator} from 'react-navigation';
import {Platform} from 'react-native';
import {Icon} from 'native-base';

import {color} from '../../../styles';

import ProfileScreen from './Profile';
import PollingListScreen from './PollingList';
import EventListScreen from './EventList';
// import QrScannerScreen from './QrScanner';

import ContactScreen from './Contact';

// import ReportScreen from '../../../components/report';
// import OrganiserScreen from '../../../components/report/Organiser';
// import ExpertScreen from '../../../components/report/Expert';
// import PresenterScreen from '../../../components/report/Presenter';

// const ReportNavigator = createStackNavigator(
//   {
//     Report: {screen: ReportScreen},
//     Expert: {screen: ExpertScreen},
//     Presenter: {screen: PresenterScreen},
//     Organiser: {screen: OrganiserScreen},
//   },
//   {
//     headerMode: 'none',
//     header: null,
//   },
// );

const FeedAppNavigator = createTabNavigator(
  {
    EventList: EventListScreen,
    PollingList: PollingListScreen,
    Profile: ProfileScreen,
    Contacts: ContactScreen,
    // QrScanner: QrScannerScreen,
    // Report: ReportNavigator,
  },
  {
    initialRouteName: 'Profile',
    tabBarPosition: 'bottom',

    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Report') {
          return <Icon name="chart-areaspline" type="MaterialCommunityIcons" style={{color: tintColor}} />;
        }
      },
    }),

    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: color.white,
      activeBackgroundColor: color.primaryDark,
      inactiveBackgroundColor: color.primary,
      inactiveTintColor: color.white,
      style: {
        backgroundColor: color.primary,
        marginTop: Platform.select({
          ios: 20,
          android: 0,
        }),
      },
      tabStyle: {},
      indicatorStyle: {
        backgroundColor: '#fff500',
        height: 2,
      },
    },
  },
);

export default FeedAppNavigator;
