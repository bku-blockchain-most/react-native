/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import {Container} from 'native-base';
import {color} from '../../styles';
import Loading from '../../components/Loading';

class AppScreenWrapper extends Component {
  /**
   * props:
   * loading: !boolean
   */
  render() {
    return (
      <Container
        style={
          Platform.OS === 'ios'
            ? {
                paddingTop: 20, // offset for status bar
              }
            : {}
        }>
        {Platform.select({
          android: <StatusBar backgroundColor={color.primaryDark} barStyle="light-content" />,
          ios: <StatusBar barStyle="light-content" />,
        })}
        <Loading visible={this.props.loading} />
        {this.props.children}
      </Container>
    );
  }
}

export default AppScreenWrapper;
