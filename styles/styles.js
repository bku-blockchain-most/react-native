/**
 * @format
 * @flow
 */

import {StyleSheet} from 'react-native';
import {color} from './theme';

export const styles = StyleSheet.create({
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  bgPrimary: {
    backgroundColor: color.primary,
  },
  textPrimary: {
    color: color.primary,
  },
});
