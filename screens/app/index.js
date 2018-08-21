/**
 * @format
 * @flow
 */

import {createStackNavigator} from 'react-navigation';

import FeedAppNavigator from './Feed';

import PollingDetailScreen from './Detail/PollingDetail';
import PollingAnswerScreen from './Detail/PollingAnswer';

const AppNavigator = createStackNavigator(
  {
    FeedApp: FeedAppNavigator,
    PollingDetail: PollingDetailScreen,
    PollingAnswer: PollingAnswerScreen,
  },
  {
    initialRouteName: 'FeedApp',
    headerMode: 'none',
  },
);

export default AppNavigator;
