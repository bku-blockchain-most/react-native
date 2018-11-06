/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
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
        <StatusBar backgroundColor={color.primary} barStyle="light-content" />
        <Loading visible={this.props.loading} />
        {this.props.children}
      </Container>
    );
  }
}

export default AppScreenWrapper;
