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
      <Container>
        {Platform.select({
          android: <StatusBar backgroundColor={color.primaryDark} barStyle="light-content" />,
          ios: <StatusBar backgroundColor={color.primary} barStyle="dark-content" />,
        })}
        <Loading visible={this.props.loading} />
        {this.props.children}
      </Container>
    );
  }
}

export default AppScreenWrapper;
