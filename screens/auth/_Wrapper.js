/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ImageBackground, View, Image, StatusBar, Text} from 'react-native';

import {styles, color} from '../../styles';

class AuthScreenWrapper extends Component {
  render() {
    const faviconSize = 120;
    return (
      <View style={styles.centerBox}>
        <StatusBar backgroundColor={color.primary} barStyle="light-content" />
        <ImageBackground
          source={require('../../assets/images/background.jpg')}
          style={{width: '100%', height: '100%', ...styles.centerBox}}>
          <Image
            source={require('../../assets/icons/favicon.png')}
            style={{
              height: faviconSize,
              width: faviconSize,
              borderRadius: faviconSize / 2,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              width: '90%',
              paddingTop: 30,
              paddingBottom: 10,
              marginTop: 15,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
            }}>
            <Text
              style={{
                ...styles.fontOpenSans,
                textTransform: 'uppercase',
                fontWeight: '700',
                fontSize: 24,
                color: color.primary,
              }}>
              {this.props.title}
            </Text>
            {this.props.children}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default AuthScreenWrapper;
