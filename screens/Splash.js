/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, StatusBar, View, Image} from 'react-native';

import {styles, color} from '../styles';
import config from '../config';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const authToken = await AsyncStorage.getItem(
      config.constants.asyncStorage.authToken,
    );

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(authToken ? 'App' : 'Auth');
    }, 1000);
  };

  // Render any loading content that you like here
  render() {
    const faviconSize = 160;

    return (
      <View style={{...styles.centerBox, ...styles.bgPrimaryLight}}>
        <StatusBar backgroundColor={color.primary} barStyle="light-content" />
        <Image
          source={require('../assets/icons/favicon-transparent.png')}
          style={{
            height: faviconSize,
            width: faviconSize,
          }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default SplashScreen;
