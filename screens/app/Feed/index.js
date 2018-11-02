/**
 * @format
 * @flow
 */

import {createTabNavigator,createStackNavigator} from 'react-navigation';
import {Platform} from 'react-native';

import NameCardScreen from './NameCard';
import SettingScreen from './Setting';
import ProfileScreen from './Profile';
import PollingListScreen from './PollingList';
import VotingListScreen from './VotingList';
import EventListScreen from './EventList';
import QrScannerScreen from './QrScanner';

//tan add
import Contact from './Contact'
import CreatingContact from './CreatingContact'
import Log from './Log'
import QRCodeScanerContact from './QRCodeScanerContact'

import {color} from '../../../styles';

const ContactStack = createStackNavigator({
    Contact: {screen: Contact},
    CreatingContact: {screen: CreatingContact},
    Log: {screen: Log},
    QRCodeScanerContact: {screen: QRCodeScanerContact},
},{
  headerMode : 'none',
  header: null,
})


const FeedAppNavigator = createTabNavigator(
  {
    //PollingList: PollingListScreen,
    //VotingList: VotingListScreen,
    Profile: ProfileScreen,
    Contacts: ContactStack,
    //Setting: SettingScreen,
    //EventList: EventListScreen,
    //QrScanner: QrScannerScreen,
  },
  {
    //initialRouteName: 'EventList',
    tabBarPosition: 'bottom',

    tabBarOptions: {
      showLabel: true,
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
