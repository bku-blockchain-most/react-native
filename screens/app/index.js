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
// import ReportScreen from '../../components/report';

const AppNavigator = createStackNavigator(
  {
    // Tab Bar Navigator
    FeedApp: FeedAppNavigator,

    // Full Screen
    PollingDetail: PollingDetailScreen,
    PollingAnswer: PollingAnswerScreen,
    QrGeneration: QrGenerationScreen,
    Village: VillageListScreen,
    // Report: ReportScreen,
  },
  {
    initialRouteName: 'FeedApp',
    headerMode: 'none',
  },
);

export default AppNavigator;
