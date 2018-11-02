/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, View, Image} from 'react-native';

import {styles, color} from '../styles';
import {RAMUtils, CacheUtils} from '../utils';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const authToken = await CacheUtils.getAuthToken();
    const user = await CacheUtils.getUser();

    RAMUtils.updateUser(user);
    RAMUtils.setAuthToken(authToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      const connected = authToken && user && user.id && user.username && user.email;
      this.props.navigation.navigate(connected ? 'App' : 'Auth');
    }, 500);
  };

  // Render any loading content that you like here
  render() {
    const faviconSize = 160;

    return (
      <View style={{...styles.centerBox, ...styles.bgPrimaryDark}}>
        <StatusBar backgroundColor={color.primary} barStyle="light-content" />
        <Image
          source={require('../assets/icons/logo_white.png')}
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
