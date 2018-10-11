/**
 * @format
 * @flow
 */

import React from 'react';
import {Text} from 'react-native';
import {styles} from '../../styles';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.fontOpenSans]} />;
  }
}

export class OpenSansText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.fontOpenSans]} />;
  }
}

export class OpenSansBoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.fontOpenSansBold]} />;
  }
}
