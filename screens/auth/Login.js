/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, StatusBar} from 'react-native';
import {Button, Text, View} from 'native-base';

import {styles} from '../../styles';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Please login',
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#eb008b" />

        <Button primary onPress={this._signInAsync}>
          <Text>Login</Text>
        </Button>

        <Button danger onPress={() => navigation.navigate('Forgot')}>
          <Text>Forgot password</Text>
        </Button>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

export default LoginScreen;
