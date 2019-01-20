/**
 * @format
 * @flow
 */

import {StyleSheet} from 'react-native';
import {color, fonts} from './theme';

export const styles = StyleSheet.create({
  /** Container */
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  /** Size */
  fullWidth: {
    width: '100%',
  },

  /** Background Color */
  bgPrimary: {
    backgroundColor: color.primary,
  },
  bgPrimaryLight: {
    backgroundColor: color.primaryLight,
  },
  bgPrimaryDark: {
    backgroundColor: color.primaryDark,
  },

  /** Text Color */
  textPrimary: {
    color: color.primary,
  },

  /** Font Family */
  fontOpenSans: {
    fontFamily: fonts.OpenSans,
  },

  fontOpenSansBold: {
    fontFamily: fonts.OpenSansBold,
  },

  fontRoboto: {
    fontFamily: fonts.Roboto,
  },
});

export const dynamicStyles = {
  changePadding: padding => ({
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: padding,
    paddingBottom: padding,
    paddingHorizontal: padding,
    paddingVertical: padding,
    padding,
  }),
  changeMargin: margin => ({
    marginLeft: margin,
    marginRight: margin,
    marginTop: margin,
    marginBottom: margin,
    marginHorizontal: margin,
    marginVertical: margin,
    margin,
  }),
};
