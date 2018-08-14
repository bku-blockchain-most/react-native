/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';

import styles from '../styles';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }, 200);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
