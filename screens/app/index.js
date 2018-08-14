/**
 * @format
 * @flow
 */

import {createStackNavigator} from 'react-navigation';

import FeedAppNavigator from './Feed';
import PollingDetailScreen from './PollingDetail';

const AppNavigator = createStackNavigator(
  {
    FeedApp: FeedAppNavigator,
    PollingDetail: PollingDetailScreen,
  },
  {
    initialRouteName: 'FeedApp',
    headerMode: 'none',
  },
);

export default AppNavigator;
