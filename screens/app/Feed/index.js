/**
 * @format
 * @flow
 */

import React from 'react';
import { createTabNavigator, createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { Icon } from 'native-base';

import ProfileScreen from './Profile';
import PollingListScreen from './PollingList';
import EventListScreen from './EventList';
import QrScannerScreen from './QrScanner';

//tan add
import Contact from './Contact';
import CreatingContact from './CreatingContact';
import Log from './Log';
import ProfileContactScreen from './ProfileContact';
import QRCodeScanerContact from './QRCodeScanerContact';
import ReportScreen from '../../../components/report';
import { color } from '../../../styles';
import OrganiserScreen from '../../../components/report/Organiser';
import ExpertScreen from '../../../components/report/Expert';
import PresenterScreen from '../../../components/report/Presenter';
const ContactStack = createStackNavigator(
  {
    Contact: { screen: Contact },
    CreatingContact: { screen: CreatingContact },
    Log: { screen: Log },
    QRCodeScanerContact: { screen: QRCodeScanerContact },
    ProfileContact: { screen: ProfileContactScreen },
  },
  {
    headerMode: 'none',
    header: null,
  },
);

const ReportNavigator = createStackNavigator(
  {
    Report: {screen: ReportScreen},
    Expert: {screen: ExpertScreen},
    Presenter: {screen: PresenterScreen},
    Organiser: {screen: OrganiserScreen},
  },
  {
    headerMode: 'none',
    header: null,
  },
);

const FeedAppNavigator = createTabNavigator(
  {
    EventList: EventListScreen,
    PollingList: PollingListScreen,
    Profile: ProfileScreen,
    Contacts: ContactStack,
    QrScanner: QrScannerScreen,
    Report: ReportNavigator,
  },
  {
    initialRouteName: 'Profile',
    tabBarPosition: 'bottom',

    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Contacts') {
          return <Icon name="contact-mail" type="MaterialCommunityIcons" style={{ color: tintColor }} />;
        }
      },
    }),

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
