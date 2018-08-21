/**
 * @format
 * @flow
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox;
console.ignoredYellowBox;

AppRegistry.registerComponent(appName, () => App);
