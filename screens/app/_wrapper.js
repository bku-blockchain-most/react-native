/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Container} from 'native-base';
import {color} from '../../styles';

class AppScreenWrapper extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor={color.primary} barStyle="light-content" />
        {this.props.children}
      </Container>
    );
  }
}

export default AppScreenWrapper;
