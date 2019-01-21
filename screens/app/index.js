/**
 * @format
 * @flow
 */

import {createStackNavigator} from 'react-navigation';

import FeedAppNavigator from './Feed';

import PollingDetailScreen from './Detail/PollingDetail';
import PollingAnswerScreen from './Detail/PollingAnswer';
import QrGenerationScreen from './Detail/QrGeneration';
import VillageListScreen from './Detail/VillageList';
import LogsContact from './Detail/LogsContact';
import QrCodeScannerContact from './Detail/QrCodeScannerContact';
import VillageDetail from './Detail/VillageDetail';

// import ReportScreen from '../../components/report';

const AppNavigator = createStackNavigator(
  {
    /**
     * Tab Bar Navigator
     * Contains screen on bottom tab bar
     */
    FeedApp: FeedAppNavigator,

    /**
     * Full Screens
     * Contains single screen (full screen device)
     */
    PollingDetail: PollingDetailScreen,
    PollingAnswer: PollingAnswerScreen,
    QrGeneration: QrGenerationScreen,
    Village: VillageListScreen,
    LogsContact,
    QrCodeScannerContact,
    VillageDetail,

    // Report: ReportScreen,
  },
  {
    initialRouteName: 'FeedApp',
    headerMode: 'none',
  },
);

export default AppNavigator;
