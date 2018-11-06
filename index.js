/**
 * @format
 * @flow
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;
console.ignoredYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
