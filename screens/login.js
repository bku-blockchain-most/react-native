/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, View} from 'native-base';

class LoginScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>Hello Login</Text>
        <Button primary onPress={() => navigation.navigate('Forgot')}>
          <Text>Forgot password</Text>
        </Button>

        <Button primary onPress={() => navigation.navigate('Home')}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

export default LoginScreen;
