/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';

class ForgotScreen extends Component {
  render() {
    return (
      <View>
        <Text>Hello Forgot</Text>
        <Button primary onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

export default ForgotScreen;
