/**
 * @format
 * @flow
 */

import {StyleSheet} from 'react-native';
import {color, fonts} from './theme';

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
  bgPrimaryLight: {
    backgroundColor: color.primaryLight,
  },
  bgPrimaryDark: {
    backgroundColor: color.primaryDark,
  },
  textPrimary: {
    color: color.primary,
  },
  fontOpenSans: {
    fontFamily: fonts.OpenSans,
  },
});
